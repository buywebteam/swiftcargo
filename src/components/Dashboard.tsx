import { useState } from "react";
import Sidebar from "./Sidebar";
import CreateShipment from "./CreateShipment";

const Dashboard = () => {
  const [selected, setSelected] = useState("create");

  const renderContent = () => {
    switch (selected) {
      case "create":
        return <CreateShipment />;
      case "track":
        return <p>📦 This is the Track Shipment section.</p>;
      case "logout":
        return <p>👋 You have been logged out (placeholder).</p>;
      default:
        return <p>Welcome to your dashboard!</p>;
    }
  };

  return (
    <div className="flex">
      <Sidebar onSelect={setSelected} />

      <main className="flex-1 p-4 sm:p-5 bg-gray-50 py-20">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
