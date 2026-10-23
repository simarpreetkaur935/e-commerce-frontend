import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { subscribeToNewsletter } from "../../api/subscription";

const Footer = () => {
  
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setIsSuccess(false);

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setMessage("Please enter your email address.");
      return;
    }

    setIsLoading(true);

    try {
      const data = await subscribeToNewsletter(normalizedEmail);

      setIsSuccess(true);
      setMessage(data.message || "Thank you for subscribing to MyStore!");
      setEmail("");
    } catch (error: unknown) {
      setIsSuccess(false);

      const errorMessage =
        typeof error === "object" && error !== null && "response" in error
          ? (
              error as {
                response?: { data?: { message?: string } };
              }
            ).response?.data?.message
          : undefined;

      setMessage(errorMessage || "Unable to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-slate-950 text-white mt-16">
      {/* NEWSLETTER SECTION */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold">
                Stay updated with MyStore
              </h2>

              <p className="text-slate-400 mt-2">
                Subscribe to get the latest products, offers and updates.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              <form
                onSubmit={handleSubscribe}
                className="flex w-full lg:w-auto"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  required
                  aria-label="Email address"
                  className="w-full lg:w-80 min-w-0 px-4 py-3 rounded-l-lg bg-white text-gray-900 outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-60"
                />

                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 bg-white text-slate-950 font-semibold rounded-r-lg hover:bg-slate-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>

              {message && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`mt-3 text-sm ${
                    isSuccess ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold">MyStore</h2>

            <p className="text-slate-400 mt-4 leading-6">
              Your one-stop online shopping store for quality products at great
              prices.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
              >
                f
              </a>

              <a
                href="#"
                aria-label="X"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
              >
                𝕏
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
              >
                in
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
              >
                ◎
              </a>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h3 className="font-semibold text-lg">Shop</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <Link to="/products" className="hover:text-white transition">
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/categories" className="hover:text-white transition">
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  to="/products?type=new-arrivals"
                  className="hover:text-white transition"
                >
                  New Arrivals
                </Link>
              </li>

              <li>
                <Link
                  to="/products?type=offers"
                  className="hover:text-white transition"
                >
                  Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SUPPORT */}
          <div>
            <h3 className="font-semibold text-lg">Customer Support</h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <Link
                  to="/shipping-information"
                  className="hover:text-white transition"
                >
                  Shipping Information
                </Link>
              </li>

              <li>
                <Link
                  to="/returns-refunds"
                  className="hover:text-white transition"
                >
                  Returns &amp; Refunds
                </Link>
              </li>

              <li>
                <Link to="/track-order" className="hover:text-white transition">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  to="/about-us"
                  className="transition-colors hover:text-amber-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/our-story"
                  className="transition-colors hover:text-amber-400"
                >
                  Our Story
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="transition-colors hover:text-amber-400"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/contact-us"
                  className="transition-colors hover:text-amber-400"
                >
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy-policy"
                  className="transition-colors hover:text-amber-400"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold text-lg">Contact Us</h3>

            <ul className="mt-5 space-y-4 text-slate-400">
              <li className="flex gap-3">
                <span>📧</span>
                <span>support@mystore.com</span>
              </li>

              <li className="flex gap-3">
                <span>📞</span>
                <span>+91 98765 43210</span>
              </li>

              <li className="flex gap-3">
                <span>📍</span>
                <span>Chandigarh, India</span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-sm text-slate-500">Customer support</p>

              <p className="text-sm text-slate-400 mt-1">
                Mon - Sat, 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} MyStore. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link
                to="/privacy-policy"
                className="hover:text-white transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms-and-conditions"
                className="hover:text-white transition"
              >
                Terms &amp; Conditions
              </Link>

              <Link to="/cookies" className="hover:text-white transition">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
