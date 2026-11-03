
interface PaymentProps {
  paymentMethod: "stripe" | "cod";
  onPaymentMethodChange: (method: "stripe" | "cod") => void;
}

const Payment = ({
  paymentMethod,
  onPaymentMethodChange,
}: PaymentProps) => {
  return (
    <div className="space-y-4">

      {/* STRIPE PAYMENT */}
      <label
        className={`flex items-center gap-4 border rounded-xl p-5 cursor-pointer transition ${
          paymentMethod === "stripe"
            ? "border-yellow-400 bg-yellow-50"
            : "border-gray-200 hover:border-yellow-400"
        }`}
      >
        <input
          type="radio"
          name="paymentMethod"
          value="stripe"
          checked={paymentMethod === "stripe"}
          onChange={() => onPaymentMethodChange("stripe")}
          className="w-4 h-4 accent-yellow-500"
        />

        <div className="flex-1">
          <p className="font-semibold text-gray-900">
            Online Payment
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Pay securely using Stripe.
          </p>
        </div>

        <span className="text-sm font-semibold text-blue-600">
          Stripe
        </span>
      </label>

      {/* CASH ON DELIVERY */}
      <label
        className={`flex items-center gap-4 border rounded-xl p-5 cursor-pointer transition ${
          paymentMethod === "cod"
            ? "border-yellow-400 bg-yellow-50"
            : "border-gray-200 hover:border-yellow-400"
        }`}
      >
        <input
          type="radio"
          name="paymentMethod"
          value="cod"
          checked={paymentMethod === "cod"}
          onChange={() => onPaymentMethodChange("cod")}
          className="w-4 h-4 accent-yellow-500"
        />

        <div className="flex-1">
          <p className="font-semibold text-gray-900">
            Cash on Delivery
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Pay when your order arrives at your doorstep.
          </p>
        </div>

        <span className="text-sm font-semibold text-green-600">
          COD
        </span>
      </label>

      {/* SELECTED PAYMENT INFORMATION */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        {paymentMethod === "stripe" ? (
          <p className="text-sm text-gray-600">
            You will be redirected to Stripe's secure payment
            page when you place your order.
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            You can pay in cash when your order is delivered.
          </p>
        )}
      </div>

    </div>
  );
};

export default Payment;
