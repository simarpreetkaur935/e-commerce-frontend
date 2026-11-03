
interface CartItem {
  _id?: string;
  product: {
    _id: string;
    name: string;
    price: number;
    discountPrice?: number;
    images?: string[];
    image?: string;
  } | string;
  quantity: number;
  price?: number;
}

interface CalculationProps {
  cart: CartItem[];
  priceDetails: {
    originalSubtotal: number;
    subtotal: number;
    discount: number;
    tax: number;
    shippingCharge: number;
    totalAmount: number;
  } | null;
  paymentMethod?: "stripe" | "cod";
  loading?: boolean;
  showOrderSummary?: boolean;
}

const formatPrice = (amount: number) =>
  `₹${(amount / 100).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Calculation = ({
  cart,
  priceDetails,
  paymentMethod = "stripe",
  loading = false,
  showOrderSummary = true,
}: CalculationProps) => {
  return (
    <div className="space-y-5">

      {/* ORDER SUMMARY */}
      {showOrderSummary && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Order Summary
          </h2>

          {cart.map((item, index) => {
            const product =
              typeof item.product === "object"
                ? item.product
                : null;

            const price =
              item.price ??
              (product?.discountPrice != null &&
              product.discountPrice < product.price
                ? product.discountPrice
                : product?.price ?? 0);

            return (
              <div
                key={item._id || index}
                className="flex justify-between items-center border-b border-gray-100 pb-4 mb-4"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {product?.name || "Product"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-gray-900">
                  {formatPrice(price * item.quantity)}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* PRICE DETAILS */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-5 py-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Price Details
          </h2>
        </div>

        <div className="p-5">
          {loading ? (
            <p className="text-center text-gray-500 py-5">
              Updating price details...
            </p>
          ) : !priceDetails ? (
            <p className="text-center text-gray-500 py-5">
              Price details are not available.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Original Price</span>
                <span>{formatPrice(priceDetails.originalSubtotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Discount</span>
                <span className="text-green-600">
                  -{formatPrice(priceDetails.discount)}
                </span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(priceDetails.subtotal)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>GST (18%)</span>
                <span>{formatPrice(priceDetails.tax)}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>

              {paymentMethod === "cod" && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>COD Charges (10%)</span>
                  <span>
                    {formatPrice(priceDetails.shippingCharge)}
                  </span>
                </div>
              )}

              <div className="border-t border-dashed border-gray-300 pt-5 flex justify-between items-center">
                <span className="font-bold text-lg text-gray-900">
                  Total Amount
                </span>
                <span className="font-bold text-xl text-gray-900">
                  {formatPrice(priceDetails.totalAmount)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculation;
