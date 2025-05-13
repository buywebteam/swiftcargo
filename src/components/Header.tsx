import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:underline ${isActive ? "text-yellow-400 font-semibold" : ""}`;

  return (
    <nav className="bg-black text-white sticky top-0 z-99 p-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold">
            Swiftcargo
          </NavLink>

          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <ul className="hidden md:flex space-x-6 text-base">
            <li>
              <NavLink to="/home" className={linkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={linkClass}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
          <ul className="flex flex-col space-y-4 text-base">
            <li>
              <NavLink to="/home" className={linkClass} onClick={toggleMenu}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={linkClass} onClick={toggleMenu}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={linkClass}
                onClick={toggleMenu}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={linkClass} onClick={toggleMenu}>
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
