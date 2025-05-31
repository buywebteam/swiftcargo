import { useState } from "react";
import Sidebar from "./Sidebar";
import CreateShipment from "./CreateShipment";
import TrackShipment from "./TrackShipment";
import LogoutModal from "./Logout"; // Make sure you have this modal component

const Dashboard = () => {
  // Initialize selected page from localStorage
  const [selected, setSelected] = useState<string>(() => {
    const stored = localStorage.getItem("activePage");
    return stored && stored !== "logout" ? stored : "create";
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSelect = (page: string) => {
    if (page === "logout") {
      setShowLogoutModal(true);
    } else {
      setSelected(page);
      localStorage.setItem("activePage", page);
    }
  };

  const renderContent = () => {
    switch (selected) {
      case "create":
        return <CreateShipment />;
      case "track":
        return <TrackShipment />;
      default:
        return <p>Welcome to your dashboard!</p>;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onSelect={handleSelect} activePage={selected} />
      <main className="flex-1 scroll-auto p-4 sm:p-5 bg-gray-50 py-20">
        {renderContent()}
      </main>

      <LogoutModal
        isOpen={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          localStorage.removeItem("activePage");
          window.location.href = "/"; // or reset auth state if using context
        }}
      />
    </div>
  );
};

export default Dashboard;
