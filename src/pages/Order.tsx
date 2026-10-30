
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

        <div className="lg:col-span-2 bg-white rounded-xl border p-6">
          <h1 className="text-2xl font-bold mb-6">
            Delivery Address
          </h1>

          <Form method="post" className="space-y-5">

            <div>
              <label className="block text-sm font-medium mb-2">
                Street Address
              </label>
              <input
                name="street"
                required
                placeholder="House number, street, area"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  City
                </label>
                <input
                  name="city"
                  required
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  State
                </label>
                <input
                  name="state"
                  required
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Country
                </label>
                <input
                  name="country"
                  defaultValue="India"
                  required
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  PIN Code
                </label>
                <input
                  name="pincode"
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {actionData?.message && (
              <p className="text-red-600 text-sm">
                {actionData.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-400 hover:bg-amber-500 disabled:opacity-60 py-3 rounded-lg font-semibold"
            >
              {isSubmitting
                ? "Creating Order..."
                : "Continue to Payment"}
            </button>

          </Form>
        </div>

        <div className="bg-white rounded-xl border p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cart.map((item: any) => {
            const price =
              item.product.discountPrice ??
              item.product.price;

            return (
              <div
                key={item._id}
                className="flex justify-between gap-3 mb-3 text-sm"
              >
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>
                  ₹{(price * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Order;
