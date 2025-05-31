import { useState, useEffect } from "react";
import { useShipment, type ShipmentData } from "../context/ShipmentContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ShipmentModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ShipmentModal: React.FC<ShipmentModalProps> = ({ isOpen, onClose }) => {
  const { createShipment, loading, error } = useShipment();

  const [formData, setFormData] = useState({
    shipperName: "",
    shipperAddress: "",
    receiverName: "",
    receiverAddress: "",
    package: "",
    shipmentType: "",
    shipmentMode: "",
    carrierMode: "",
    weight: "",
    pickupDate: "",
    deliveryDate: "",
  });

  // Clear error or form data when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        shipperName: "",
        shipperAddress: "",
        receiverName: "",
        receiverAddress: "",
        package: "",
        shipmentType: "",
        shipmentMode: "",
        carrierMode: "",
        weight: "",
        pickupDate: "",
        deliveryDate: "",
      });
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert weight to number before submitting
    const shipmentData: ShipmentData = {
      ...formData,
      weight: Number(formData.weight),
      status: "Pending", // or another default status as required by your app
    };

    await createShipment(shipmentData);
    toast.success("Shipment created successfully");

    if (!error) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Create New Shipment
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 md:grid-cols-2 gap-6 gap-x-4"
        >
          <div>
            <label htmlFor="shipperName" className="block mb-1 font-medium">
              Shipper Name
            </label>
            <input
              type="text"
              name="shipperName"
              id="shipperName"
              value={formData.shipperName}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="shipperAddress" className="block mb-1 font-medium">
              Shipper Address
            </label>
            <input
              type="text"
              name="shipperAddress"
              id="shipperAddress"
              value={formData.shipperAddress}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="receiverName" className="block mb-1 font-medium">
              Receiver Name
            </label>
            <input
              type="text"
              name="receiverName"
              id="receiverName"
              value={formData.receiverName}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="receiverAddress" className="block mb-1 font-medium">
              Receiver Address
            </label>
            <input
              type="text"
              name="receiverAddress"
              id="receiverAddress"
              value={formData.receiverAddress}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="package" className="block mb-1 font-medium">
              Package
            </label>
            <input
              type="text"
              name="package"
              id="package"
              value={formData.package}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="shipmentType" className="block mb-1 font-medium">
              Type of Shipment
            </label>
            <select
              name="shipmentType"
              id="shipmentType"
              value={formData.shipmentType}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              disabled={loading}
            >
              <option value="">Select Type</option>
              <option value="International Shipment">
                International Shipment
              </option>
              <option value="Local Shipment">Local Shipment</option>
            </select>
          </div>

          <div>
            <label htmlFor="shipmentMode" className="block mb-1 font-medium">
              Mode of Shipment
            </label>
            <select
              name="shipmentMode"
              id="shipmentMode"
              value={formData.shipmentMode}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              disabled={loading}
            >
              <option value="">Select Mode</option>
              <option value="Air">Air</option>
              <option value="Road">Road</option>
              <option value="Sea">Sea</option>
            </select>
          </div>
          <div>
            <label htmlFor="carrierMode" className="block mb-1 font-medium">
              Mode of Carrier
            </label>
            <select
              name="carrierMode"
              id="carrierMode"
              value={formData.carrierMode}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              disabled={loading}
            >
              <option value="">Select Carrier</option>
              <option value="DHL">DHL</option>
              <option value="FedEX">FedEX</option>
              <option value="USPS">USPS</option>
            </select>
          </div>

          <div>
            <label htmlFor="weight" className="block mb-1 font-medium">
              Weight (kg)
            </label>
            <input
              type="text"
              name="weight"
              id="weight"
              value={formData.weight}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="pickupDate" className="block mb-1 font-medium">
              Pickup Date
            </label>
            <input
              type="date"
              name="pickupDate"
              id="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              disabled={loading}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="deliveryDate" className="block mb-1 font-medium">
              Delivery Date
            </label>
            <input
              type="date"
              name="deliveryDate"
              id="deliveryDate"
              value={formData.deliveryDate}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              disabled={loading}
              autoComplete="off"
            />
          </div>

          {/* Full-width button row */}
          <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded bg-gray-300 hover:bg-gray-400 cursor-pointer text-sm"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 rounded bg-black text-white cursor-pointer text-sm"
              disabled={loading}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShipmentModal;
