
import { useState } from "react";
import type { FormEvent } from "react";

import {
  PaymentElement,
  useCheckoutElements,
} from "@stripe/react-stripe-js/checkout";

// ─── Payment Props ─────────────────────────────────────

interface PaymentProps {
  paymentMethod: "stripe" | "cod";
  onPaymentMethodChange: (method: "stripe" | "cod") => void;
}

// ─── Payment Selection ─────────────────────────────────

const Payment = ({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentProps) => {
  return (
    <div className="space-y-4">

      {/* STRIPE OPTION */}
      <label className={`flex items-center gap-4 border rounded-xl p-5 cursor-pointer ${
        paymentMethod === "stripe"
          ? "border-yellow-400 bg-yellow-50"
          : "border-gray-200"
      }`}>
        <input
          type="radio"
          name="paymentMethod"
          value="stripe"
          checked={paymentMethod === "stripe"}
          onChange={() => onPaymentMethodChange("stripe")}
        />

        <div className="flex-1">
          <p className="font-semibold text-gray-900">
            Online Payment
          </p>
          <p className="text-sm text-gray-500">
            Pay securely using Stripe.
          </p>
        </div>

        <span className="text-sm font-semibold text-blue-600">
          Stripe
        </span>
      </label>

      {/* COD OPTION */}
      <label className={`flex items-center gap-4 border rounded-xl p-5 cursor-pointer ${
        paymentMethod === "cod"
          ? "border-yellow-400 bg-yellow-50"
          : "border-gray-200"
      }`}>
        <input
          type="radio"
          name="paymentMethod"
          value="cod"
          checked={paymentMethod === "cod"}
          onChange={() => onPaymentMethodChange("cod")}
        />

        <div className="flex-1">
          <p className="font-semibold text-gray-900">
            Cash on Delivery
          </p>
          <p className="text-sm text-gray-500">
            Pay when your order arrives.
          </p>
        </div>

        <span className="text-sm font-semibold text-green-600">
          COD
        </span>
      </label>

    </div>
  );
};

// ─── Stripe Checkout Form ──────────────────────────────

export const StripeCheckoutForm = () => {
  const checkoutState = useCheckoutElements();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (checkoutState.type === "loading" || loading) {
      return;
    }

    if (checkoutState.type === "error") {
      setErrorMessage(checkoutState.error.message);
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const { checkout } = checkoutState;

      const result = await checkout.confirm();

      if (result.type === "error") {
        setErrorMessage(result.error.message);
      }

      // On success Stripe handles the configured return_url.
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (checkoutState.type === "loading") {
    return (
      <p className="text-gray-500">
        Loading Stripe payment form...
      </p>
    );
  }

  // Stripe initialization error
  if (checkoutState.type === "error") {
    return (
      <p className="text-red-600">
        {checkoutState.error.message}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* STRIPE PAYMENT ELEMENT */}
      <div className="border border-gray-200 rounded-xl p-5">
        <PaymentElement />
      </div>

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <p className="text-sm text-red-600">
          {errorMessage}
        </p>
      )}

      {/* CONFIRM PAYMENT */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold py-3 rounded-lg transition"
      >
        {loading ? "Processing Payment..." : "Pay Now"}
      </button>

    </form>
  );
};

export default Payment;
