
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mailtoLink = `mailto:support@mystore.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <section className="bg-slate-950 text-white px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Get in Touch
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Contact Us
          </h1>

          <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto mt-6">
            Have a question about a product, order, or delivery?
            We'd love to hear from you. Send us a message and
            we'll help you find the right information.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* CONTACT INFORMATION */}
          <div className="space-y-6">
            <div>
              <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider">
                Contact Information
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-3">
                We'd love to hear from you
              </h2>

              <p className="text-gray-600 mt-3 leading-7">
                Reach out to us for questions about MyStore,
                your shopping experience, or order-related assistance.
              </p>
            </div>

            {/* EMAIL */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-lg bg-amber-100 flex items-center justify-center text-2xl">
                📧
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Email Us
                </h3>

                <a
                  href="mailto:support@mystore.com"
                  className="text-amber-700 hover:text-amber-800 break-all"
                >
                  support@mystore.com
                </a>

                <p className="text-sm text-gray-500 mt-1">
                  Send us your questions anytime.
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-lg bg-amber-100 flex items-center justify-center text-2xl">
                📞
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Call Us
                </h3>

                <a
                  href="tel:+919876543210"
                  className="text-amber-700 hover:text-amber-800"
                >
                  +91 98765 43210
                </a>

                <p className="text-sm text-gray-500 mt-1">
                  Mon - Sat, 9:00 AM - 6:00 PM
                </p>
              </div>
            </div>

            {/* LOCATION */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-lg bg-amber-100 flex items-center justify-center text-2xl">
                📍
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">
                  Our Location
                </h3>

                <p className="text-gray-600">
                  Chandigarh, India
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  MyStore Customer Support
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              Send Us a Message
            </h2>

            <p className="text-gray-600 mt-2 mb-7">
              Fill out the form below to prepare an email to our team.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME AND EMAIL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What can we help you with?"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message *
                </label>

                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-y focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-950 text-white px-7 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
              >
                Send Message
                <span>→</span>
              </button>

              <p className="text-sm text-gray-500">
                This opens your default email application with the message
                filled in. You must send the email to contact us.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* HELP CENTER */}
      <section className="bg-white border-t border-gray-200 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Need Help With an Order?
          </h2>

          <p className="text-gray-600 mt-3 leading-7">
            Visit our support pages for shipping information,
            returns, refunds, and order tracking.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link
              to="/help-center"
              className="bg-amber-500 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition"
            >
              Visit Help Center
            </Link>

            <Link
              to="/shipping-information"
              className="border border-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shipping Information
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;