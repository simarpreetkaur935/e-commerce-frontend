
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Clock, Package, ShoppingBag, XCircle } from "lucide-react";

type PaymentStatus = "loading" | "paid" | "pending" | "failed";

interface OrderSuccessProps {
  // Optional props are not required when using React Router.
}

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000/api/v1";

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const orderIdFromUrl = searchParams.get("orderId");

  const [status, setStatus] = useState<PaymentStatus>("loading");
  const [message, setMessage] = useState(
    "Please wait while we verify your payment."
  );
  const [orderId, setOrderId] = useState<string | null>(
    orderIdFromUrl
  );

  useEffect(() => {
    let cancelled = false;

    const verifyOrderPayment = async () => {
      // Stripe online payment
      if (sessionId) {
        try {
          const response = await axios.post(
            `${API_URL}/payments/verify`,
            { stripeSessionId: sessionId },
            { withCredentials: true }
          );

          if (cancelled) return;

          if (response.data.success) {
            setStatus("paid");
            setMessage("Your payment was successful and your order is confirmed.");
            setOrderId(
              response.data.order?._id ||
              response.data.payment?.order ||
              orderIdFromUrl
            );
          } else {
            setStatus("pending");
            setMessage("We could not confirm your payment yet. Please check your orders before trying again.");
          }
        } catch (error) {
          if (cancelled) return;

          if (axios.isAxiosError(error)) {
            const paymentStatus = error.response?.data?.paymentStatus;

            if (
              paymentStatus === "unpaid" ||
              paymentStatus === "no_payment_required"
            ) {
              setStatus("pending");
              setMessage("Your payment has not been completed yet.");
            } else {
              setStatus("pending");
              setMessage(
                "We could not verify your payment right now. Please check your orders or try again shortly."
              );
            }
          } else {
            setStatus("pending");
            setMessage("Unable to verify your payment right now.");
          }
        }

        return;
      }

      // COD confirmation
      if (orderIdFromUrl) {
        setStatus("paid");
        setMessage(
          "Your order has been placed. Payment is due when your order arrives."
        );
        return;
      }

      setStatus("failed");
      setMessage(
        "We couldn't find your order or payment session. Please check your orders."
      );
    };

    void verifyOrderPayment();

    return () => {
      cancelled = true;
    };
  }, [sessionId, orderIdFromUrl]);

  const isPaid = status === "paid";
  const isPending = status === "pending";
  const isFailed = status === "failed";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-md">
        {status === "loading" ? (
          <div className="mx-auto mb-5 h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500" />
        ) : isPaid ? (
          <CheckCircle className="mx-auto mb-5 h-16 w-16 text-green-600" />
        ) : isPending ? (
          <Clock className="mx-auto mb-5 h-16 w-16 text-amber-500" />
        ) : (
          <XCircle className="mx-auto mb-5 h-16 w-16 text-red-600" />
        )}

        <h1 className="text-2xl font-bold text-gray-900">
          {status === "loading"
            ? "Confirming Your Order..."
            : isPaid
              ? "Order Confirmed!"
              : isPending
                ? "Payment Pending"
                : "Unable to Confirm Order"}
        </h1>

        <p className="mt-3 text-gray-600">{message}</p>

        {orderId && (
          <div className="mt-6 rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="mt-1 break-all font-semibold text-gray-900">
              {orderId}
            </p>
          </div>
        )}

        {isPaid && (
          <p className="mt-4 text-sm text-gray-500">
            {sessionId
              ? "Payment status: Paid"
              : "Payment method: Cash on Delivery"}
          </p>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-semibold text-white transition hover:bg-amber-600"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            <Package size={18} />
            My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
