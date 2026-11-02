
import {
  Form,
  useActionData,
  useNavigation,
  useLoaderData,
} from "react-router-dom";

const Order = () => {
  const navigation = useNavigation();

  const actionData = useActionData() as
    | { success: false; message: string }
    | undefined;

  const { cart } = useLoaderData() as {
    cart: any[];
  };

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Order Summary */}
        <div className="lg:col-span-2 bg-white rounded-xl border p-6">

          <h1 className="text-2xl font-bold mb-6">
            Order Summary
          </h1>

          {cart.length === 0 ? (
            <p className="text-gray-500">
              Your cart is empty.
            </p>
          ) : (
            cart.map((item: any) => {
              const price =
                item.product.discountPrice ??
                item.product.price;

              return (
                <div
                  key={item._id}
                  className="flex justify-between items-center gap-4 mb-5 pb-4 border-b"
                >
                  <div>
                    <h3 className="font-medium">
                      {item.product.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{(price * item.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              );
            })
          )}

          {actionData?.message && (
            <p className="text-red-600 text-sm mb-4">
              {actionData.message}
            </p>
          )}

          {/* Continue to Payment */}
          <Form method="post">

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-60 py-3 rounded-lg font-semibold transition"
            >
              {isSubmitting
                ? "Creating Order..."
                : "Continue to Payment"}
            </button>

          </Form>

        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-xl border p-6 h-fit">

          <h2 className="text-xl font-semibold mb-4">
            Price Details
          </h2>

          <div className="flex justify-between mb-3 text-sm">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="flex justify-between mb-3 text-sm">
            <span>Subtotal</span>

            <span>
              ₹
              {cart.reduce((total: number, item: any) => {
                const price =
                  item.product.discountPrice ??
                  item.product.price;

                return total + price * item.quantity;
              }, 0).toLocaleString("en-IN")}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Order;
