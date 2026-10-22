
import { Link } from "react-router-dom";

const ShippingInformation = () => {
  const shippingDetails = [
    {
      title: "Order Processing",
      description:
        "Orders are processed after they are successfully placed. Processing time may vary depending on product availability and order volume.",
      icon: "📦",
    },
    {
      title: "Delivery Time",
      description:
        "Delivery times depend on your delivery location and product availability. Your estimated delivery date can be checked using your order details.",
      icon: "🚚",
    },
    {
      title: "Shipping Charges",
      description:
        "Any applicable shipping charges will be displayed during checkout before you confirm your order.",
      icon: "💳",
    },
    {
      title: "Delivery Updates",
      description:
        "Use the Track Order page to check your order status and follow available delivery updates.",
      icon: "📍",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
            Customer Support
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Shipping Information
          </h1>

          <p className="text-gray-600 mt-4 leading-7 max-w-3xl">
            Find information about order processing, delivery timelines,
            shipping charges, and tracking your MyStore order.
          </p>
        </div>

        {/* SHIPPING DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {shippingDetails.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition"
            >
              <div className="text-3xl mb-4">{item.icon}</div>

              <h2 className="text-xl font-semibold text-gray-900">
                {item.title}
              </h2>

              <p className="text-gray-600 mt-3 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* DELIVERY HELP */}
        <div className="bg-slate-950 text-white rounded-xl p-6 md:p-8 mt-8">
          <h2 className="text-2xl font-bold">
            Need help with your delivery?
          </h2>

          <p className="text-slate-300 mt-3 leading-7">
            If you have questions about your shipment, check your order status
            or contact our support team for assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              to="/track-order"
              className="inline-flex items-center justify-center bg-white text-slate-950 px-5 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Track Your Order
            </Link>

            <a
              href="mailto:support@mystore.com"
              className="inline-flex items-center justify-center border border-slate-600 px-5 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* BACK TO HELP CENTER */}
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

export default ShippingInformation;
