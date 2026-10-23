
import { Link } from "react-router-dom";

const AboutUs = () => {
  const features = [
    {
      icon: "🛍️",
      title: "Quality Products",
      description:
        "Explore a wide range of products selected to give you a convenient shopping experience.",
    },
    {
      icon: "💰",
      title: "Great Value",
      description:
        "Discover attractive prices, special offers, and deals across our product collection.",
    },
    {
      icon: "🚚",
      title: "Convenient Shopping",
      description:
        "Browse products, place orders, and access your shopping details in one place.",
    },
    {
      icon: "🤝",
      title: "Customer Support",
      description:
        "We're here to help with questions about your orders, deliveries, and shopping experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <section className="bg-slate-950 text-white px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-amber-400 font-semibold uppercase tracking-widest text-sm">
            Get to Know Us
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            About MyStore
          </h1>

          <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto mt-6">
            Your one-stop online shopping destination for quality products,
            great value, and a convenient shopping experience.
          </p>

          <Link
            to="/products"
            className="inline-flex items-center justify-center mt-8 bg-amber-500 text-slate-950 px-7 py-3 rounded-lg font-semibold hover:bg-amber-400 transition"
          >
            Explore Products
          </Link>
        </div>
      </section>

      {/* OUR INTRODUCTION */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-amber-600 font-semibold uppercase tracking-wider text-sm">
              Who We Are
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              Making Online Shopping Simple
            </h2>

            <p className="text-gray-600 mt-5 leading-7">
              MyStore is an online shopping platform designed to make
              discovering and purchasing products simple and convenient.
              We bring products together in one place so customers can browse
              categories, compare prices, and find items that suit their needs.
            </p>

            <p className="text-gray-600 mt-4 leading-7">
              From exploring new arrivals to discovering special offers,
              MyStore aims to provide a smooth shopping experience from
              browsing products to placing an order.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-10 shadow-sm">
            <div className="text-5xl mb-5">🛒</div>

            <h3 className="text-2xl font-bold text-gray-900">
              Welcome to MyStore
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Discover products, explore categories, find deals, and enjoy
              a convenient way to shop online.
            </p>

            <Link
              to="/categories"
              className="inline-block mt-6 text-amber-700 font-semibold hover:text-amber-800 transition"
            >
              Browse Categories →
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-amber-600 font-semibold uppercase tracking-wider text-sm">
              Why MyStore
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              What You Can Expect
            </h2>

            <p className="text-gray-600 mt-4 leading-7">
              Our platform brings together useful shopping features to help
              you discover products and manage your shopping journey.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="text-4xl">{feature.icon}</div>

                <h3 className="text-xl font-semibold text-gray-900 mt-5">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-7">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PURPOSE */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Our Purpose
          </h2>

          <p className="text-gray-600 text-lg leading-8 mt-5 max-w-3xl mx-auto">
            Our goal is to make online shopping straightforward by bringing
            product discovery, categories, offers, and order information
            together in one convenient platform.
          </p>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-slate-950 text-white px-6 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">
            Start Exploring MyStore
          </h2>

          <p className="text-slate-300 mt-4 leading-7">
            Browse our collection and discover products for your needs.
          </p>

          <div className="flex justify-center mt-8">
            <Link
              to="/products"
              className="bg-white text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
