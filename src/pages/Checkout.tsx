
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Address from "../components/checkout/Address";
import Payment from "../components/checkout/Payment";

type AccordionSection = "address" | "payment";

interface CartItem {
  _id?: string;
  product: {
    _id: string;
    name: string;
    price: number;
    image?: string;
  } | string;
  quantity: number;
  price?: number;
}

const Checkout = () => {
  // Get cart data from cartLoader
  const { cart } = useLoaderData() as {
    cart: CartItem[];
  };

  // Accordion state
  const [activeSection, setActiveSection] =
    useState<AccordionSection>("address");

  // Selected address
  const [selectedAddressId, setSelectedAddressId] =
    useState("");

  // Selected payment method
  const [paymentMethod, setPaymentMethod] =
    useState<"stripe" | "cod">("stripe");

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    const price =
      item.price ??
      (typeof item.product === "object"
        ? item.product.price
        : 0);

    return total + price * item.quantity;
  }, 0);

  const toggleSection = (section: AccordionSection) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        {/* PAGE HEADING */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <p className="text-gray-500 mt-2">
            Complete the steps below to place your order.
          </p>
        </div>

        <div className="space-y-5">

          {/* 1. DELIVERY ADDRESS ACCORDION */}
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

          {/* 2. PAYMENT METHOD ACCORDION */}
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
              <div className="border-t border-gray-200 p-5">

                <Payment
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                />

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

          {/* 3. ORDER SUMMARY */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

            <h2 className="font-semibold text-xl text-gray-900 mb-5">
              Order Summary
            </h2>

            {/* CART ITEMS */}
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

                  const price =
                    item.price ?? product?.price ?? 0;

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
                        ₹{(
                          (price * item.quantity) / 100
                        ).toFixed(2)}
                      </p>
                    </div>
                  );
                })}

              </div>
            )}

            {/* PRICE DETAILS */}
            <div className="mt-6 space-y-3">

              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>
                  ₹{(subtotal / 100).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">
                  Free
                </span>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>
                  ₹{(subtotal / 100).toFixed(2)}
                </span>
              </div>

            </div>

            {/* SELECTED PAYMENT */}
            <div className="mt-5 text-sm text-gray-600">
              Payment Method:{" "}
              <span className="font-semibold text-gray-900">
                {paymentMethod === "stripe"
                  ? "Online Payment (Stripe)"
                  : "Cash on Delivery"}
              </span>
            </div>

            {/* PLACE ORDER */}
            <button
              type="button"
              disabled={
                !selectedAddressId || cart.length === 0
              }
              className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-semibold py-3 rounded-lg transition"
            >
              Place Order
            </button>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;
