
import { Link } from "react-router-dom";

const OurStory = () => {
  const milestones = [
    {
      number: "01",
      title: "The Idea",
      description:
        "MyStore was imagined as a convenient place where customers could explore products and discover useful deals in one place.",
      icon: "💡",
    },
    {
      number: "02",
      title: "Building the Platform",
      description:
        "We designed an online shopping experience with product categories, product details, search, and a simple browsing experience.",
      icon: "💻",
    },
    {
      number: "03",
      title: "A Better Shopping Experience",
      description:
        "Our focus is on making it easier to discover products, explore new arrivals, find offers, and manage shopping activities.",
      icon: "🛍️",
    },
    {
      number: "04",
      title: "Looking Ahead",
      description:
        "We aim to keep improving the platform with useful features and a smoother experience for our customers.",
      icon: "🚀",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <section className="bg-slate-950 text-white px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Our Journey
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            The Story Behind MyStore
          </h1>

          <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto mt-6">
            Every great shopping experience starts with a simple idea:
            making it easier for people to discover products and shop
            conveniently.
          </p>
        </div>
      </section>

      {/* OUR BEGINNING */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider">
              Where It Begins
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              A Simple Idea, A Better Experience
            </h2>

            <p className="text-gray-600 mt-5 leading-7">
              MyStore is built around the idea of bringing products,
              categories, and offers together in one convenient online
              shopping platform.
            </p>

            <p className="text-gray-600 mt-4 leading-7">
              Instead of making shopping complicated, the goal is to help
              customers browse products, explore available deals, and find
              what they need through a straightforward interface.
            </p>

            <p className="text-gray-600 mt-4 leading-7">
              This journey is about continuously improving the experience
              and building a platform that is easy to use.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-sm">
            <div className="text-6xl mb-6">🛒</div>

            <h3 className="text-2xl font-bold text-gray-900">
              Welcome to Our Journey
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              From exploring product collections to discovering special
              offers, MyStore brings essential shopping features together
              in one place.
            </p>

            <Link
              to="/products"
              className="inline-flex items-center mt-6 text-amber-700 font-semibold hover:text-amber-800 transition"
            >
              Explore Our Products →
            </Link>
          </div>
        </div>
      </section>

      {/* OUR JOURNEY */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider">
              The Journey
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              How We're Moving Forward
            </h2>

            <p className="text-gray-600 mt-4 leading-7">
              Our story reflects the ideas and priorities behind the MyStore
              shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {milestones.map((milestone) => (
              <div
                key={milestone.number}
                className="rounded-xl border border-gray-200 p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">
                    {milestone.icon}
                  </span>

                  <span className="text-amber-600 font-bold text-lg">
                    {milestone.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mt-5">
                  {milestone.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-7">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            What Guides Us
          </h2>

          <p className="text-gray-600 mt-5 leading-8 max-w-3xl mx-auto">
            Simplicity, convenience, and continuous improvement guide the
            way we think about MyStore. We want customers to spend less
            time navigating and more time discovering products that suit
            their needs.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-left">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900">
                Simplicity
              </h3>
              <p className="text-gray-600 mt-3 leading-7">
                Clear navigation and an easy-to-use shopping experience.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900">
                Convenience
              </h3>
              <p className="text-gray-600 mt-3 leading-7">
                Products, categories, and offers available in one place.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-bold text-lg text-gray-900">
                Improvement
              </h3>
              <p className="text-gray-600 mt-3 leading-7">
                Continuing to refine the platform and its features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="bg-slate-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Be Part of the MyStore Experience
          </h2>

          <p className="text-slate-300 mt-5 leading-7">
            Discover our products, explore categories, and find your next
            favorite item.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              to="/products"
              className="bg-amber-500 text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-amber-400 transition"
            >
              Start Shopping
            </Link>

            <Link
              to="/about-us"
              className="border border-slate-600 px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
            >
              About MyStore
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurStory;
