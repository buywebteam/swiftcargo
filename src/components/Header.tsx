import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black text-white sticky top-0 z-10 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          SwiftCargo{" "}
        </a>
        <ul className="hidden md:flex space-x-6 mx-auto">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/services">Services</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        <div className="hidden md:flex space-x-4">
          <button className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
            Login
          </button>
          <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300">
            Sign Up
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <ul className="flex flex-col space-y-4">
          <li>
            <a href="/home" onClick={toggleMenu}>
              Home
            </a>
          </li>
          <li>
            <a href="/about" onClick={toggleMenu}>
              About
            </a>
          </li>
          <li>
            <a href="/services" onClick={toggleMenu}>
              Services
            </a>
          </li>
          <li>
            <a href="/contact" onClick={toggleMenu}>
              Contact
            </a>
          </li>
          <div className="flex flex-col space-y-2 mt-4">
            <button className="bg-transparent border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
              Login
            </button>
            <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300">
              Sign Up
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
