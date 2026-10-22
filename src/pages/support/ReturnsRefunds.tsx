
import { Link } from "react-router-dom";

const ReturnsRefunds = () => {
  const returnSteps = [
    {
      number: "01",
      title: "Check Eligibility",
      description:
        "Review the return conditions for your product before requesting a return.",
    },
    {
      number: "02",
      title: "Contact Support",
      description:
        "Contact our support team with your order details and the reason for your return.",
    },
    {
      number: "03",
      title: "Return Review",
      description:
        "Our team will review your request and provide instructions for the next steps.",
    },
    {
      number: "04",
      title: "Refund Processing",
      description:
        "If your refund is approved, the amount will be processed according to the applicable refund policy.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">
            Customer Support
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Returns &amp; Refunds
          </h1>

          <p className="text-gray-600 mt-4 leading-7 max-w-3xl">
            Need to return a product or ask about a refund? Find out how the
            return and refund process works at MyStore.
          </p>
        </div>

        {/* RETURN PROCESS */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How the Return Process Works
          </h2>

          <div className="space-y-6">
            {returnSteps.map((step) => (
              <div key={step.number} className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  {step.number}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="text-gray-600 mt-2 leading-7">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IMPORTANT INFORMATION */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900">
            Before Requesting a Return
          </h2>

          <ul className="list-disc pl-6 mt-4 space-y-3 text-gray-600 leading-7">
            <li>Keep your order details available.</li>
            <li>Explain the reason for your return or refund request.</li>
            <li>Follow the return instructions provided by our support team.</li>
            <li>Refund eligibility and processing times depend on the applicable policy.</li>
          </ul>
        </div>

        {/* CONTACT SUPPORT */}
        <div className="bg-slate-950 text-white rounded-xl p-6 md:p-8 mt-8">
          <h2 className="text-2xl font-bold">
            Need help with a return?
          </h2>

          <p className="text-slate-300 mt-3 leading-7">
            Contact our support team for assistance with returns and refunds.
          </p>

          <a
            href="mailto:support@mystore.com"
            className="inline-flex items-center justify-center mt-6 bg-white text-slate-950 px-5 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Contact Support
          </a>
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

export default ReturnsRefunds;