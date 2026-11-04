
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

// ─── Stripe Checkout Session ───────────────────────────

export const createStripeCheckoutSession = async (
  payload: ICheckoutPayload
): Promise<{ clientSecret: string }> => {
  const response = await api.post(
    "/orders/checkout/stripe",
    payload
  );

  const { clientSecret } = response.data;

  if (!clientSecret) {
    throw new Error("Stripe client secret not received.");
  }

  return { clientSecret };
};

// ─── Cash On Delivery ───────────────────────────────────

export const createCODOrder = async (
  payload: ICheckoutPayload
): Promise<{ orderId: string }> => {
  const response = await api.post(
    "/orders/checkout/cod",
    payload
  );

  return response.data;
};

// ─── Verify Payment ─────────────────────────────────────

export const verifyStripePayment = async (
  sessionId: string
): Promise<{ success: boolean; orderId: string }> => {
  const response = await api.post(
    "/orders/verify-payment",
    { sessionId }
  );

  return response.data;
};
