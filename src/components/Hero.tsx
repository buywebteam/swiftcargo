import Button from "./Button";

function Hero() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 md:py-24 lg:py-32 flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12">
        {/* Text Section */}
        <div className="w-full md:w-1/2 text-center md:text-left mt-8 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-bold leading-tight">
            Delivering Seamless Logistics Solutions Worldwide
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl my-4 sm:my-6">
            We Handle Transport and Logistics, So You Can Focus on Your Business
          </p>
          <div className="flex justify-center md:justify-start">
            <a
              href="https://wa.me/1234567890" // Replace with your WhatsApp number
            >
              <Button label="Track Shipment" />
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 md:-mt-10 flex justify-center md:justify-end">
          <img
            src="/hero.png"
            alt="Hero"
            className="w-full max-w-sm sm:max-w-md md:max-w-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
