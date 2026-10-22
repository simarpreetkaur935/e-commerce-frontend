
import { Link } from "react-router-dom";

const TrackOrder = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
            Customer Support
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Track Your Order
          </h1>

          <p className="text-gray-600 mt-4 leading-7">
            Check your order status and stay updated on your MyStore delivery.
          </p>
        </div>

        {/* TRACKING FORM */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-900">
            Enter Your Order Details
          </h2>

          <p className="text-gray-600 mt-2">
            Order tracking will be available once connected to your account
            and order database.
          </p>

          <form
            className="mt-6 space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div>
              <label
                htmlFor="orderId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Order ID
              </label>

              <input
                id="orderId"
                name="orderId"
                type="text"
                placeholder="Enter your order ID"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-slate-950 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
            >
              Track Order
            </button>
          </form>
        </div>

        {/* SUPPORT */}
        <div className="bg-slate-950 text-white rounded-xl p-6 mt-8">
          <h2 className="text-xl font-bold">
            Need help with your order?
          </h2>

          <p className="text-slate-300 mt-3">
            Contact our support team if you have questions about your delivery.
          </p>

          <a
            href="mailto:support@mystore.com"
            className="inline-block mt-5 bg-white text-slate-950 px-5 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Contact Support
          </a>
        </div>

        {/* BACK LINK */}
        <div className="mt-8">
          <Link
            to="/help-center"
            className="text-amber-700 hover:text-amber-800 font-medium"
          >
            ← Back to Help Center
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
