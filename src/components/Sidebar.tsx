import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = ({
  onSelect,
  activePage,
}: {
  onSelect: (page: string) => void;
  activePage: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleSelect = (page: string) => {
    onSelect(page);
    setIsOpen(false);
  };

  const navItems = [
    { label: "Create Shipment", value: "create" },
    { label: "Track Shipment", value: "track" },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed lg:fixed top-0 left-0 right-0 z-30 flex items-center p-4 bg-black text-white cursor-pointer">
        <button onClick={toggleSidebar}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="ml-4 text-lg font-semibold">Dashboard</span>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:flex flex-col justify-between w-64 bg-black text-white min-h-screen p-6 fixed left-0 right-0 md:static z-20 top-0 cursor-pointer`}
      >
        <div>
          {/* Profile */}
          <div className="flex flex-col items-center sm:pt-10 pt-16">
            <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center bg-black text-white">
              <h1 className="text-3xl font-bold">J</h1>
            </div>
            <h2 className="mt-3 font-bold text-xl">John Doe</h2>
            <p className="text-base">johndoe@gmail.com</p>
          </div>

          {/* Navigation */}
          <nav className="pt-12 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleSelect(item.value)}
                className={`block w-full text-left p-3 rounded cursor-pointer ${
                  activePage === item.value
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-white hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <div className="pt-6">
          <button
            onClick={() => handleSelect("logout")}
            className={`block w-full text-left p-3 rounded cursor-pointer ${
              activePage === "logout"
                ? "bg-white text-black font-semibold"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
