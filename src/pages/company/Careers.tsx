
import { Link } from "react-router-dom";

const Careers = () => {
  const benefits = [
    {
      icon: "🚀",
      title: "Growth & Learning",
      description:
        "Build your skills, explore new ideas, and grow through meaningful projects.",
    },
    {
      icon: "🤝",
      title: "Team Collaboration",
      description:
        "Work together, share ideas, and contribute to a supportive team environment.",
    },
    {
      icon: "💡",
      title: "Innovation",
      description:
        "Help improve the shopping experience through creative thinking and technology.",
    },
  ];

  const opportunities = [
    {
      title: "Frontend Developer",
      type: "Development",
      description:
        "Help build responsive, accessible, and user-friendly shopping experiences using modern frontend technologies.",
      skills: ["React", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Backend Developer",
      type: "Development",
      description:
        "Help develop reliable APIs, manage product and order data, and improve backend functionality.",
      skills: ["Node.js", "Express.js", "MongoDB"],
    },
    {
      title: "UI/UX Designer",
      type: "Design",
      description:
        "Design intuitive interfaces and create smooth user journeys across the MyStore platform.",
      skills: ["UI Design", "Wireframing", "Prototyping"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HERO SECTION */}
      <section className="bg-slate-950 text-white px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-widest">
            Careers at MyStore
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-4">
            Build the Future of Shopping
          </h1>

          <p className="text-slate-300 text-lg leading-8 max-w-3xl mx-auto mt-6">
            Interested in technology, design, and better online shopping
            experiences? Explore the example roles below and get in touch
            with our team.
          </p>

          <a
            href="#opportunities"
            className="inline-flex items-center justify-center mt-8 bg-amber-500 text-slate-950 px-7 py-3 rounded-lg font-semibold hover:bg-amber-400 transition"
          >
            Explore Opportunities
          </a>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider">
            Work With Us
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-3">
            Grow Your Ideas Into Impact
          </h2>

          <p className="text-gray-600 mt-5 leading-8 max-w-3xl mx-auto">
            MyStore is an e-commerce platform focused on making online
            shopping convenient. We value thoughtful design, useful
            technology, collaboration, and continuous improvement.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Work With Us?
            </h2>

            <p className="text-gray-600 mt-4">
              The values that guide how we approach our work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="border border-gray-200 rounded-xl p-7 hover:shadow-lg transition"
              >
                <div className="text-4xl">{benefit.icon}</div>

                <h3 className="text-xl font-bold text-gray-900 mt-5">
                  {benefit.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-7">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREER OPPORTUNITIES */}
      <section id="opportunities" className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-amber-600 text-sm font-semibold uppercase tracking-wider">
              Opportunities
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mt-3">
              Explore Career Roles
            </h2>

            <p className="text-gray-600 mt-4 leading-7">
              Here are example roles relevant to an e-commerce platform.
              These are illustrative listings, not confirmed vacancies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {opportunities.map((job) => (
              <div
                key={job.title}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition flex flex-col"
              >
                <span className="self-start text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  {job.type}
                </span>

                <h3 className="text-xl font-bold text-gray-900 mt-5">
                  {job.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-7 flex-grow">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-5">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-2 rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={`mailto:support@mystore.com?subject=${encodeURIComponent(
                    `Career Inquiry - ${job.title}`
                  )}`}
                  className="mt-6 inline-flex items-center justify-center bg-slate-950 text-white px-5 py-3 rounded-lg font-semibold hover:bg-slate-800 transition"
                >
                  Enquire About This Role
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="bg-slate-950 text-white px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">
            Interested in Joining MyStore?
          </h2>

          <p className="text-slate-300 mt-4 leading-7">
            Contact us with your area of interest and a brief introduction.
            Our team can respond to your inquiry.
          </p>

          <a
            href="mailto:support@mystore.com?subject=Career%20Inquiry%20-%20MyStore"
            className="inline-flex items-center justify-center mt-8 bg-white text-slate-950 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Send Your Inquiry
          </a>

          <div className="mt-8">
            <Link
              to="/about-us"
              className="text-slate-300 hover:text-white transition"
            >
              ← Back to About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
