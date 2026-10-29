
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

type PaymentMethodType =
  | "credit_card"
  | "debit_card"
  | "net_banking"
  | "upi"
  | "cod";

interface PaymentLocationState {
  orderId?: string;
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api/v1";

const paymentOptions: {
  value: PaymentMethodType;
  title: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "credit_card",
    title: "Credit Card",
    description: "Pay using your credit card",
    icon: "💳",
  },
  {
    value: "debit_card",
    title: "Debit Card",
    description: "Pay using your debit card",
    icon: "🏧",
  },
  {
    value: "net_banking",
    title: "Net Banking",
    description: "Pay directly through your bank",
    icon: "🏦",
  },
  {
    value: "upi",
    title: "UPI",
    description: "Pay using a supported UPI method",
    icon: "📱",
  },
  {
    value: "cod",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "💵",
  },
];

const PaymentMethod = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as PaymentLocationState | null;
  const orderId = state?.orderId;

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("credit_card");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    if (!orderId) {
      setError("Order ID is missing. Please return to checkout.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_URL}/payments`,
        {
          orderId,
          paymentMethod,
        },
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      if (!data.success) {
        setError(data.message || "Unable to process your order.");
        return;
      }

      if (paymentMethod === "cod") {
        navigate("/order-success", {
          state: {
            orderId,
            paymentMethod: "cod",
          },
        });
        return;
      }

      const checkoutUrl = data.stripeSession?.url;

      if (!checkoutUrl) {
        setError("Stripe Checkout URL was not returned.");
        return;
      }

      // Redirect to Stripe-hosted checkout.
      window.location.assign(checkoutUrl);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Payment failed to start. Please try again."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-md sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Select Payment Method
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Choose how you want to pay for your order.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="mt-6 space-y-3">
          {paymentOptions.map((option) => (
            <label
              key={option.value}
              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition ${
                paymentMethod === option.value
                  ? "border-amber-500 bg-amber-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={option.value}
                checked={paymentMethod === option.value}
                onChange={() => setPaymentMethod(option.value)}
                className="h-4 w-4 accent-amber-500"
              />

              <span className="text-2xl" aria-hidden="true">
                {option.icon}
              </span>

              <span className="flex-1">
                <span className="block font-semibold text-gray-900">
                  {option.title}
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  {option.description}
                </span>
              </span>
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={handlePayment}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Processing..."
            : paymentMethod === "cod"
              ? "Place Order"
              : "Continue to Online Payment"}
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
