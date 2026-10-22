
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const sections = [
    {
      number: "01",
      title: "Information We Collect",
      content:
        "Depending on how you use MyStore, we may collect information such as your name, email address, phone number, shipping address, order details, and account information that you provide.",
    },
    {
      number: "02",
      title: "How We Use Your Information",
      content:
        "Information may be used to process orders, manage your account, provide customer support, communicate order updates, improve the shopping experience, and help protect the platform against misuse.",
    },
    {
      number: "03",
      title: "Payments and Transactions",
      content:
        "Payment information should be handled through secure payment providers where applicable. MyStore should not store sensitive payment credentials unless an appropriate, secure and compliant payment arrangement is in place.",
    },
    {
      number: "04",
      title: "Sharing of Information",
      content:
        "Personal information may need to be shared with service providers involved in operating the store, such as delivery partners, payment providers, or technical service providers. Information should not be shared for unrelated purposes without an appropriate legal basis.",
    },
    {
      number: "05",
      title: "Cookies and Website Data",
      content:
        "The website may use cookies or similar technologies to support essential functionality, remember preferences, maintain sessions, and understand how the platform is used. Any non-essential tracking should be handled according to applicable requirements.",
    },
    {
      number: "06",
      title: "Data Security",
      content:
        "We aim to protect personal information using appropriate technical and organizational safeguards. However, no method of electronic storage or transmission can be guaranteed to be completely secure.",
    },
    {
      number: "07",
      title: "Data Retention",
      content:
        "Information should be retained only for as long as needed for the purposes for which it was collected, including fulfilling orders, providing support, meeting legal obligations, and resolving disputes.",
    },
    {
      number: "08",
      title: "Your Privacy Rights",
      content:
        "Depending on applicable law, you may have rights to request access to, correction of, or deletion of your personal information, or to raise concerns about how it is used. Requests can be directed to our contact email.",
    },
    {
      number: "09",
      title: "Children's Privacy",
      content:
        "MyStore is not intended to collect personal information from children in violation of applicable law. If you believe a child has provided personal information improperly, please contact us so the matter can be reviewed.",
    },
    {
      number: "10",
      title: "Changes to This Policy",
      content:
        "This policy may be updated as the website, its features, or applicable requirements change. Any revised version should be published on this page with an updated effective date.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <section className="bg-slate-950 text-white px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Your Privacy Matters
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Privacy Policy
          </h1>

          <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto mt-6">
            Learn how personal information may be collected, used,
            protected, and managed when you use the MyStore platform.
          </p>

          <p className="text-slate-400 text-sm mt-5">
            Effective date: October 22, 2026
          </p>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-6 pt-12">
        <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Introduction
          </h2>

          <p className="text-gray-600 mt-4 leading-7">
            This Privacy Policy describes the intended privacy practices
            for MyStore, an online shopping platform. It explains the
            categories of information the platform may handle and how
            that information should be managed.
          </p>

          <p className="text-gray-600 mt-4 leading-7">
            The actual practices depend on the features implemented in
            the application, its service providers, and applicable law.
            Please review this policy and adapt it to your real data
            collection and processing practices before publishing it
            for customers.
          </p>
        </div>
      </section>

      {/* POLICY SECTIONS */}
      <section className="px-6 py-10">
        <div className="max-w-5xl mx-auto space-y-5">
          {sections.map((section) => (
            <article
              key={section.number}
              className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 hover:shadow-sm transition"
            >
              <div className="flex items-start gap-4">
                <span className="shrink-0 w-11 h-11 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  {section.number}
                </span>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {section.title}
                  </h2>

                  <p className="text-gray-600 mt-3 leading-7">
                    {section.content}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto bg-slate-950 text-white rounded-2xl p-7 md:p-10">
          <h2 className="text-2xl font-bold">
            Questions About Your Privacy?
          </h2>

          <p className="text-slate-300 mt-4 leading-7">
            If you have a question or privacy request, contact the
            MyStore team using the email below.
          </p>

          <a
            href="mailto:support@mystore.com?subject=Privacy%20Request"
            className="inline-flex items-center justify-center mt-6 bg-white text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            support@mystore.com
          </a>

          <p className="text-slate-400 text-sm mt-5">
            Replace this contact address if your store uses a different
            privacy contact.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-8">
          <Link
            to="/"
            className="text-amber-700 hover:text-amber-800 font-medium transition"
          >
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
