function AboutUs() {
  return (
    <section className="bg-white pb-30 px-4 py-16 scroll-mt-20" id="about">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">About Us</h2>
        <p className="text-gray-600 mb-8 text-lg sm:text-xl">
          At Swiftcargo, we’re revolutionizing logistics for businesses of all
          sizes. Our mission is to provide seamless, reliable, and efficient
          transport solutions across the globe. Whether you’re a small startup
          or a large corporation, we handle the logistics so you can focus on
          what matters most—growing your business.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Text Section */}
          <div className="w-full md:w-2/3 text-left">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 text-lg sm:text-xl">
              Swiftcargo was built on a simple belief: logistics should be
              effortless. Our team is dedicated to making international
              transport as smooth as possible for our clients, ensuring that
              every package, big or small, reaches its destination on time and
              in perfect condition.
            </p>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src="https://swiftcargo.netlify.app/assets/img/about.jpg"
              alt="About Us"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
