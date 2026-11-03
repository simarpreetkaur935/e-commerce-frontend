
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Address from "../components/checkout/Address";

type AccordionSection = "address" | "payment" | "summary";
type PaymentMethodType = "stripe" | "cod";

interface CartItem {
  _id?: string;
  product: any;
  quantity: number;
  price?: number;
}

const PaymentMethod = () => {
  // Get cart data from cartLoader
  const { cart } = useLoaderData() as {
    cart: CartItem[];
  };

  const [activeSection, setActiveSection] =
    useState<AccordionSection>("address");

  const [selectedAddressId, setSelectedAddressId] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethodType>("stripe");

  const toggleSection = (section: AccordionSection) => {
    setActiveSection(section);
  };

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const price = item.price ?? item.product?.price ?? 0;
    return total + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Page Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete the steps below to place your order.
          </p>
        </div>

        <div className="space-y-4">

          {/* 1. DELIVERY ADDRESS */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

            <button
              type="button"
              onClick={() => toggleSection("address")}
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

                {/* Existing Address Component */}
                <Address
                  selectedAddressId={selectedAddressId}
                  onSelectAddress={setSelectedAddressId}
                />

                <div className="flex justify-end mt-6">

                  <button
                    type="button"
                    disabled={!selectedAddressId}
                    onClick={() => setActiveSection("payment")}
                    className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Continue to Payment
                  </button>

                </div>
              </div>
            )}
          </div>

          {/* 2. PAYMENT METHOD */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

            <button
              type="button"
              onClick={() => toggleSection("payment")}
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
              <div className="border-t border-gray-200 p-5 space-y-4">

                {/* Stripe */}
                <label className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === "stripe"
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200"
                }`}>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                    className="accent-yellow-500"
                  />

                  <div>
                    <p className="font-medium text-gray-900">
                      Online Payment
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay securely using Stripe
                    </p>
                  </div>

                </label>

                {/* COD */}
                <label className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition ${
                  paymentMethod === "cod"
                    ? "border-yellow-400 bg-yellow-50"
                    : "border-gray-200"
                }`}>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="accent-yellow-500"
                  />

                  <div>
                    <p className="font-medium text-gray-900">
                      Cash on Delivery
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay when your order arrives
                    </p>
                  </div>

                </label>

                <div className="flex justify-end">

                  <button
                    type="button"
                    onClick={() => setActiveSection("summary")}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Continue to Order Summary
                  </button>

                </div>
              </div>
            )}
          </div>

          {/* 3. ORDER SUMMARY */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

            <button
              type="button"
              onClick={() => toggleSection("summary")}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <div className="flex items-center gap-4">

                <span className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center font-bold">
                  3
                </span>

                <div>
                  <h2 className="font-semibold text-lg text-gray-900">
                    Order Summary
                  </h2>

                  <p className="text-sm text-gray-500">
                    Review your order before placing it
                  </p>
                </div>

              </div>

              <span className="text-xl text-gray-500">
                {activeSection === "summary" ? "−" : "+"}
              </span>
            </button>

            {activeSection === "summary" && (
              <div className="border-t border-gray-200 p-5">

                <h3 className="font-semibold text-gray-900 mb-4">
                  Your Items ({cart.length})
                </h3>

                {cart.length === 0 ? (
                  <p className="text-gray-500">
                    Your cart is empty.
                  </p>
                ) : (
                  <div className="space-y-4">

                    {cart.map((item, index) => {
                      const product =
                        typeof item.product === "object"
                          ? item.product
                          : null;

                      const name =
                        product?.name || "Product";

                      const price =
                        item.price ?? product?.price ?? 0;

                      return (
                        <div
                          key={item._id || index}
                          className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4"
                        >
                          <div>
                            <p className="font-medium text-gray-900">
                              {name}
                            </p>

                            <p className="text-sm text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                          </div>

                          <p className="font-semibold text-gray-900">
                            ₹{(
                              (price * item.quantity) / 100
                            ).toFixed(2)}
                          </p>
                        </div>
                      );
                    })}

                  </div>
                )}

                {/* Price Details */}
                <div className="mt-6 space-y-3">

                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      ₹{(subtotal / 100).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                    <span>Total</span>
                    <span>
                      ₹{(subtotal / 100).toFixed(2)}
                    </span>
                  </div>

                </div>

                {/* Selected Payment */}
                <p className="mt-5 text-sm text-gray-500">
                  Payment Method:{" "}
                  <span className="font-semibold text-gray-900">
                    {paymentMethod === "stripe"
                      ? "Online Payment (Stripe)"
                      : "Cash on Delivery"}
                  </span>
                </p>

                <button
                  type="button"
                  disabled={!selectedAddressId || cart.length === 0}
                  className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-semibold py-3 rounded-lg transition"
                >
                  Place Order
                </button>

              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
