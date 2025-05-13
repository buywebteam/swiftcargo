import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo and Company Information */}
          <div className="text-center sm:text-left mb-6 sm:mb-0">
            <a href="/" className="text-3xl font-bold">
              Swiftcargo
            </a>
            <p className="mt-2 text-lg">
              Delivering Seamless Logistics Solutions Worldwide
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a href="#about" className="text-lg hover:text-gray-400">
              About Us
            </a>
            <a href="#services" className="text-lg hover:text-gray-400">
              Services
            </a>
            <a href="#contact" className="text-lg hover:text-gray-400">
              Contact Us
            </a>
            <a href="#privacy" className="text-lg hover:text-gray-400">
              Privacy Policy
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mt-6 sm:mt-0">
            <a
              href="https://facebook.com"
              className="text-2xl hover:text-blue-600"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              className="text-2xl hover:text-blue-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              className="text-2xl hover:text-blue-700"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              className="text-2xl hover:text-pink-600"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center">
          <p className="text-lg">
            &copy; {new Date().getFullYear()} Swiftcargo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
