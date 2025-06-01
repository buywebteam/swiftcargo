import { useEffect, useState } from "react";
import {
  useShipment,
  type ShipmentData,
  type ShipmentStatus,
} from "../context/ShipmentContext";

function TrackShipment() {
  const { trackShipment, loading, error } = useShipment();
  const [trackingId, setTrackingId] = useState(
    () => sessionStorage.getItem("trackingId") || ""
  );
  const [shipmentData, setShipmentData] = useState<ShipmentData | null>(() => {
    const stored = sessionStorage.getItem("shipmentData");
    return stored ? JSON.parse(stored) : null;
  });
  const [searchAttempted, setSearchAttempted] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("trackingId", trackingId);
  }, [trackingId]);

  useEffect(() => {
    if (shipmentData) {
      sessionStorage.setItem("shipmentData", JSON.stringify(shipmentData));
    } else {
      sessionStorage.removeItem("shipmentData");
    }
  }, [shipmentData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingId.trim()) return;

    setSearchAttempted(true);
    const result = await trackShipment(trackingId);
    setShipmentData(result);
  };

  const getStatusColor = (status: ShipmentStatus) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Picked Up":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "In Transit":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Out for Delivery":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "On Hold":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Track Your Shipment
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !trackingId.trim()}
          className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {loading ? "Tracking..." : "Track"}
        </button>
      </form>

      {error && searchAttempted && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="mb-6 p-8 text-center">
          <div className="text-gray-600">Searching for your shipment...</div>
        </div>
      )}

      {shipmentData && !loading && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Tracking ID: {shipmentData.id}
            </h3>
            <div
              className={`inline-block px-6 py-3 rounded-full border-2 ${getStatusColor(
                shipmentData.status
              )}`}
            >
              <span className="text-lg font-bold">{shipmentData.status}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 border-b pb-2">
                Sender Information
              </h4>
              <div>
                <span className="text-sm text-gray-600">Name:</span>
                <p className="font-medium">{shipmentData.shipperName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Address:</span>
                <p className="font-medium">{shipmentData.shipperAddress}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 border-b pb-2">
                Receiver Information
              </h4>
              <div>
                <span className="text-sm text-gray-600">Name:</span>
                <p className="font-medium">{shipmentData.receiverName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Address:</span>
                <p className="font-medium">{shipmentData.receiverAddress}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-sm text-gray-600">Package:</span>
                <p className="font-medium">{shipmentData.package}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Weight:</span>
                <p className="font-medium">{shipmentData.weight}kg</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Pickup Date:</span>
                <p className="font-medium">{shipmentData.pickupDate}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Delivery Date:</span>
                <p className="font-medium">{shipmentData.deliveryDate}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {searchAttempted && !shipmentData && !loading && !error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <div className="text-yellow-800 font-medium">
            No shipment found with tracking ID: <strong>{trackingId}</strong>
          </div>
          <div className="text-sm text-yellow-600 mt-2">
            Please check your tracking ID and try again.
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackShipment;
