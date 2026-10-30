import api from "./axios";

// ─── Types ────────────────────────────────────────────────────

export interface ICartItem {
  product: string;  // MongoDB Product ID
  name: string;
  quantity: number;
  price: number;    // in paise (e.g. ₹499 = 49900)
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

// ─── Stripe ───────────────────────────────────────────────────

export const createStripeCheckoutSession = async (
  payload: ICheckoutPayload
): Promise<void> => {
  const response = await api.post("/orders/checkout/stripe", payload);
  const { url } = response.data;
  if (!url) throw new Error("No checkout URL received.");
  // Redirects user to Stripe-hosted payment page
  window.location.href = url;
};

// ─── COD ──────────────────────────────────────────────────────

export const createCODOrder = async (
  payload: ICheckoutPayload
): Promise<{ orderId: string }> => {
  const response = await api.post("/orders/checkout/cod", payload);
  return response.data;
};

// ─── Verify Payment ───────────────────────────────────────────

// Called on success page to verify with backend
// Never trust Stripe redirect URL alone
export const verifyStripePayment = async (
  sessionId: string
): Promise<{ success: boolean; orderId: string }> => {
  const response = await api.post("/orders/verify-payment", { sessionId });
  return response.data;
};