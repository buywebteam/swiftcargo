function WhyChooseUs() {
  const features = [
    {
      title: "Global Reach",
      description:
        "We deliver to over 100+ countries with trusted international partners.",
      icon: "🌍",
    },
    {
      title: "Fast Delivery",
      description:
        "Swift and reliable logistics solutions to meet your deadlines.",
      icon: "⚡",
    },
    {
      title: "Real-Time Tracking",
      description:
        "Track your shipments anytime, anywhere with our tracking tools.",
      icon: "📦",
    },
    {
      title: "Affordable Rates",
      description:
        "Competitive pricing to help you save without compromising on quality.",
      icon: "💰",
    },
  ];

  return (
    <section className="bg-black py-30 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
          Why Choose Us
        </h2>
        <p className="text-white mb-12 text-lg">
          Discover what sets Swiftcargo apart from the rest.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
