import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black text-white sticky top-0 z-10 p-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <a href="/" className="text-xl font-bold">
            AlienX
          </a>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
          <ul className="hidden md:flex space-x-6">
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
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
