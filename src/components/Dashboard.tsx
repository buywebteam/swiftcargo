import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import CreateShipment from "./CreateShipment";
import TrackShipment from "./TrackShipment";
import LogoutModal from "./Logout"; // if you created the modal

const Dashboard = () => {
  const [selected, setSelected] = useState("create");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("activePage");
    if (stored && stored !== "logout") {
      setSelected(stored);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (selected !== "logout") {
      localStorage.setItem("activePage", selected);
    }
  }, [selected]);

  const handleSelect = (page: string) => {
    if (page === "logout") {
      setShowLogoutModal(true);
    } else {
      setSelected(page);
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
          window.location.href = "/"; // or reset auth state
        }}
      />
    </div>
  );
};

export default Dashboard;
