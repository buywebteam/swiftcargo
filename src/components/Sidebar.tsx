import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = ({ onSelect }: { onSelect: (page: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Fixed Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center p-4 bg-black text-white">
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-4 text-lg font-semibold">Dashboard</span>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-64 bg-black text-white min-h-screen p-6 fixed left-0 right-0 md:static z-20 top-0`}
      >
        <div className="flex flex-col items-center sm:pt-10 pt-16">
          <img
            src="/hero.png"
            alt="User Profile"
            className="w-24 h-24 rounded-full border-2"
          />
          <h2 className="mt-3 font-bold text-xl">John Doe</h2>
          <p className="text-base">johndoe@gmail.com</p>
        </div>

        <nav className="mt-10 space-y-4">
          <button
            onClick={() => onSelect("create")}
            className="block w-full text-left hover:bg-white hover:text-black p-3"
          >
            Create Shipment
          </button>
          <button
            onClick={() => onSelect("track")}
            className="block w-full text-left hover:bg-white hover:text-black p-3"
          >
            Track Shipment
          </button>
          <button
            onClick={() => onSelect("logout")}
            className="block w-full text-left hover:bg-white hover:text-black p-3"
          >
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
