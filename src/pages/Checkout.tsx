import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import api from "../api/axios";

import Address from "../components/checkout/Address";
import Payment from "../components/checkout/Payment";

import { stripePromise } from "../config/stripe.config";
// import PaymentForm from "../components/payment/Form";

type AccordionSection = "address" | "payment";

interface CartItem {
  _id?: string;
  product:
    | {
        _id: string;
        name: string;
        price: number;
        image?: string;
      }
    | string;
  quantity: number;
  price?: number;
}

interface StripeFormProps {
  paymentIntentId: string;
  orderId: string;
}

const StripePaymentForm = ({ paymentIntentId, orderId }: StripeFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-success/${orderId}`,
        },
        redirect: "if_required",
      });

      if (result.error) {
        setError(result.error.message || "Payment failed.");
        return;
      }

      if (result.paymentIntent?.status !== "succeeded") {
        setError("Payment has not been completed.");
        return;
      }

      const response = await api.post("/payments/verify", {
        paymentIntentId,
      });

      if (response.data.success) {
        navigate(`/order-success/${orderId}`);
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to verify payment.",
      );
    } finally {
      setLoading(false);
    }
  };

  // return (
  //   <form onSubmit={handleSubmit} className="space-y-5">
  //     <PaymentElement />

  //     {/* <Elements stripe={stripePromise}> */}
  //       <StripePaymentForm
  //         paymentIntentId={paymentIntentId!}
  //         orderId={orderId!}
  //       />
  //     {/* </Elements> */}

  //     {error && <p className="text-red-600 text-sm">{error}</p>}

  //     <button
  //       type="submit"
  //       disabled={!stripe || !elements || loading}
  //       className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg"
  //     >
  //       {loading ? "Processing..." : "Pay Now"}
  //     </button>
  //   </form>
  // );
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <PaymentElement />

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { cart } = useLoaderData() as {
    cart: CartItem[];
  };

  const navigate = useNavigate();

  const [activeSection, setActiveSection] =
    useState<AccordionSection>("address");

  const [selectedAddressId, setSelectedAddressId] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "cod">(
    "stripe",
  );

  const [orderId, setOrderId] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cart.reduce((total, item) => {
    const price =
      item.price ?? (typeof item.product === "object" ? item.product.price : 0);

    return total + price * item.quantity;
  }, 0);

  // CREATE ORDER AND PAYMENT

  const handleContinueToPayment = async () => {
    if (!selectedAddressId) {
      setError("Please select a delivery address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      let currentOrderId = orderId;

      // CREATE ORDER ONLY ONCE

      if (!currentOrderId) {
        const orderResponse = await api.post("/orders", {
          addressId: selectedAddressId,
          paymentMethod: paymentMethod === "stripe" ? "credit_card" : "cod",
        });

        currentOrderId = orderResponse.data.order?._id;

        if (!currentOrderId) {
          throw new Error("Order ID was not received.");
        }

        setOrderId(currentOrderId);
      }

      // CASH ON DELIVERY

      if (paymentMethod === "cod") {
        await api.post("/payments/create", {
          orderId: currentOrderId,
          paymentMethod: "cod",
        });

        navigate(`/order-success/${currentOrderId}`);
        return;
      }

      // STRIPE PAYMENT INTENT

      const paymentResponse = await api.post("/payments", {
        orderId: currentOrderId,
        paymentMethod: "stripe",
      });

      const { clientSecret: secret, paymentIntentId: intentId } =
        paymentResponse.data;

      if (!secret || !intentId) {
        throw new Error("Stripe payment details were not received.");
      }

      setClientSecret(secret);
      setPaymentIntentId(intentId);
      setActiveSection("payment");
    } catch (error: any) {
      console.error("Checkout Error:", error);

      setError(
        error.response?.data?.message ||
          error.message ||
          "Unable to initialize checkout.",
      );
    } finally {
      setLoading(false);
    }
  };

  // CHANGE PAYMENT METHOD

  // {
  //   paymentMethod === "stripe" && (
  //     <div className="mt-5">
  //       {!clientSecret ? (
  //         <button
  //           type="button"
  //           disabled={!selectedAddressId || loading}
  //           onClick={handleContinueToPayment}
  //           className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg"
  //         >
  //           {loading ? "Preparing Payment..." : "Continue to Payment"}
  //         </button>
  //       ) : (
  //         <Elements stripe={stripePromise} options={{ clientSecret }}>
  //           <StripePaymentForm
  //             paymentIntentId={paymentIntentId!}
  //             orderId={orderId!}
  //           />
  //         </Elements>
  //       )}
  //     </div>
  //   );
  // }

  const handlePaymentMethodChange = (method: "stripe" | "cod") => {
    setPaymentMethod(method);
    setError("");

    // If the method changes, create the matching payment
    // for the already-created order when continuing.
    setClientSecret(null);
    setPaymentIntentId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

          <p className="text-gray-500 mt-2">
            Complete the steps below to place your order.
          </p>
        </div>

        <div className="space-y-5">
          {/* DELIVERY ADDRESS */}

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setActiveSection("address")}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-bold">
                  1
                </span>

                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    Delivery Address
                  </h2>

                  <p className="text-sm text-gray-500">
                    Select your delivery address
                  </p>
                </div>
              </div>

              <span className="text-xl text-gray-500">
                {activeSection === "address" ? "−" : "+"}
              </span>
            </button>

            {activeSection === "address" && (
              <div className="border-t border-gray-200 p-5">
                <Address
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={setSelectedAddressId}
                />

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    disabled={!selectedAddressId || loading}
                    onClick={() => {
                      setActiveSection("payment");
                      setError("");
                    }}
                    className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* PAYMENT METHOD */}

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => setActiveSection("payment")}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-bold">
                  2
                </span>

                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    Payment Method
                  </h2>

                  <p className="text-sm text-gray-500">
                    Choose how you want to pay
                  </p>
                </div>
              </div>

              <span className="text-xl text-gray-500">
                {activeSection === "payment" ? "−" : "+"}
              </span>
            </button>

            {activeSection === "payment" && (
              <div className="border-t border-gray-200 p-5">
                <Payment
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={handlePaymentMethodChange}
                />

                {paymentMethod === "stripe" && (
                  <div className="mt-5">
                    {clientSecret && paymentIntentId && orderId ? (
                      <Elements
                        stripe={stripePromise}
                        options={{ clientSecret }}
                      >
                        <StripePaymentForm
                          paymentIntentId={paymentIntentId}
                          orderId={orderId}
                        />
                      </Elements>
                    ) : (
                      <button
                        type="button"
                        disabled={!selectedAddressId || loading}
                        onClick={handleContinueToPayment}
                        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg"
                      >
                        {loading
                          ? "Preparing Payment..."
                          : "Initialize Stripe Payment"}
                      </button>
                    )}
                  </div>
                )}

                {paymentMethod === "cod" && (
                  <button
                    type="button"
                    disabled={!selectedAddressId || loading}
                    onClick={handleContinueToPayment}
                    className="w-full mt-5 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg"
                  >
                    {loading ? "Placing Order..." : "Place Order"}
                  </button>
                )}

                {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setActiveSection("address")}
                    className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Back to Address
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ORDER SUMMARY */}

          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
            <h2 className="font-semibold text-xl text-gray-900 mb-5">
              Order Summary
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, index) => {
                  const product =
                    typeof item.product === "object" ? item.product : null;

                  const price = item.price ?? product?.price ?? 0;

                  return (
                    <div
                      key={item._id || index}
                      className="flex justify-between items-center border-b border-gray-100 pb-4"
                    >
                      <div>
                        <p className="font-medium text-gray-900">
                          {product?.name || "Product"}
                        </p>

                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="font-semibold text-gray-900">
                        ₹{((price * item.quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{(subtotal / 100).toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>₹{(subtotal / 100).toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-5 text-sm text-gray-600">
              Payment Method:{" "}
              <span className="font-semibold text-gray-900">
                {paymentMethod === "stripe"
                  ? "Online Payment (Stripe)"
                  : "Cash on Delivery"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
