// import ShipmentStats from "./ShipmentStats";
import RecentShipments from "./RecentShipments";
import Button from "./Button";
import ShipmentModal from "./Modal";
import { useState } from "react";

function CreateShipment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="md:py-10 py-12">
      <h1 className="text-3xl font-bold mb-2">Manage Your Shipments</h1>
      <p className="text-gray-600 mb-6">
        Create, track, and manage all your shipments in one place.
      </p>

      <div className="mb-6">
        <Button label="Create Shipment" onClick={openModal} />
      </div>

      {/* <ShipmentStats /> */}
      <RecentShipments />
      <ShipmentModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default CreateShipment;
