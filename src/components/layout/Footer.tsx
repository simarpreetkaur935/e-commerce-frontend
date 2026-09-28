const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white mt-16">
      {/* =========================
          NEWSLETTER SECTION
      ========================= */}

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

            <div className="flex w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full lg:w-80 px-4 py-3 rounded-l-lg bg-white text-gray-900 outline-none"
              />

              <button
                type="button"
                className="px-6 py-3 bg-white text-slate-950 font-semibold rounded-r-lg hover:bg-slate-200 transition"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN FOOTER
      ========================= */}

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* =========================
              BRAND
          ========================= */}

          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold">
              MyStore
            </h2>

            <p className="text-slate-400 mt-4 leading-6">
              Your one-stop online shopping store for quality
              products at great prices.
            </p>

            {/* Social Icons */}

            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
              >
                f
              </a>

              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
              >
                𝕏
              </a>

              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
              >
                in
              </a>

              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 transition"
              >
                ◎
              </a>
            </div>
          </div>

          {/* =========================
              SHOP
          ========================= */}

          <div>
            <h3 className="font-semibold text-lg">
              Shop
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  All Products
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Categories
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  New Arrivals
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Featured Products
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Offers
                </a>
              </li>
            </ul>
          </div>

          {/* =========================
              CUSTOMER SUPPORT
          ========================= */}

          <div>
            <h3 className="font-semibold text-lg">
              Customer Support
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Shipping Information
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  FAQ
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* =========================
              COMPANY
          ========================= */}

          <div>
            <h3 className="font-semibold text-lg">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-slate-400">
              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Our Story
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Careers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* =========================
              CONTACT
          ========================= */}

          <div>
            <h3 className="font-semibold text-lg">
              Contact Us
            </h3>

            <ul className="mt-5 space-y-4 text-slate-400">
              <li className="flex gap-3">
                <span>📧</span>

                <span>
                  support@mystore.com
                </span>
              </li>

              <li className="flex gap-3">
                <span>📞</span>

                <span>
                  +91 98765 43210
                </span>
              </li>

              <li className="flex gap-3">
                <span>📍</span>

                <span>
                  Chandigarh, India
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-sm text-slate-500">
                Customer support
              </p>

              <p className="text-sm text-slate-400 mt-1">
                Mon - Sat, 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================
          BOTTOM FOOTER
      ========================= */}

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} MyStore. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a
                href="#"
                className="hover:text-white transition"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                Terms & Conditions
              </a>

              <a
                href="#"
                className="hover:text-white transition"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;