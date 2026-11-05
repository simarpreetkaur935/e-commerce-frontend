
import api from "./axios";

// ─── Types ─────────────────────────────────────────────

export interface ICartItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface IShippingAddress {
  fullName: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface ICheckoutPayload {
  items: ICartItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: "stripe" | "cod";
}

export interface IPriceDetails {
  originalSubtotal: number;
  subtotal: number;
  discount: number;
  tax: number;
  shippingCharge: number;
  totalAmount: number;
}

// ─── Payment Summary ───────────────────────────────────

export const getPaymentSummary = async (
  paymentMethod: "stripe" | "cod"
): Promise<IPriceDetails> => {
  const response = await api.post("/payments/summary", {
    paymentMethod,
  });

  return response.data.priceDetails;
};

// ─── Create Order ──────────────────────────────────────

export const createOrder = async (
  payload: ICheckoutPayload
): Promise<{ orderId: string }> => {
  const response = await api.post("/orders", {
    shippingAddress: payload.shippingAddress,

    // Order controller accepts credit_card for Stripe.
    paymentMethod:
      payload.paymentMethod === "stripe"
        ? "credit_card"
        : "cod",
  });

  const orderId = response.data.order?._id;

  if (!orderId) {
    throw new Error("Order ID was not received.");
  }

  return { orderId };
};

// ─── Create Stripe PaymentIntent ───────────────────────

export const createStripePaymentIntent = async (
  orderId: string
): Promise<{
  clientSecret: string;
  paymentIntentId: string;
}> => {
  const response = await api.post("/payments/create", {
    orderId,
    paymentMethod: "stripe",
  });

  const { clientSecret, paymentIntentId } = response.data;

  if (!clientSecret || !paymentIntentId) {
    throw new Error("Stripe payment details were not received.");
  }

  return {
    clientSecret,
    paymentIntentId,
  };
};

// ─── Cash On Delivery ───────────────────────────────────

export const createCODOrder = async (
  payload: ICheckoutPayload
): Promise<{ orderId: string }> => {
  // First create the order.

  const { orderId } = await createOrder({
    ...payload,
    paymentMethod: "cod",
  });

  // Then create the COD payment record.

  await api.post("/payments/create", {
    orderId,
    paymentMethod: "cod",
  });

  return { orderId };
};

// ─── Verify Stripe Payment ─────────────────────────────

export const verifyStripePayment = async (
  paymentIntentId: string
): Promise<{
  success: boolean;
  orderId: string;
}> => {
  const response = await api.post("/payments/verify", {
    paymentIntentId,
  });

  return {
    success: response.data.success,
    orderId: response.data.order?._id,
  };
};
