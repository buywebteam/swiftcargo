import React, { useState } from "react";
import Button from "./Button";

interface ShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShipmentModal: React.FC<ShipmentModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    recipient: "",
    address: "",
    weight: "",
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Shipment Created:", form);
    onClose();
    // Add your API call here if needed
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">New Shipment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="recipient"
            placeholder="Recipient Name"
            value={form.recipient}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={form.weight}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-4 py-2 border rounded text-gray-600"
            >
              Cancel
            </button>
            <Button label="Submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentModal;
