import { useEffect } from "react";
import { useShipment } from "../context/ShipmentContext"; // Update this import path

const RecentShipmentsTable = () => {
  const { shipments, getShipments, loading, error } = useShipment();

  useEffect(() => {
    if (shipments.length === 0) {
      getShipments();
    }
  }, [getShipments, shipments.length]);

  if (loading) {
    return (
      <div className="mt-10 w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Recent Shipments
        </h2>
        <div className="flex justify-center items-center p-8">
          <div className="text-gray-600">Loading shipments...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Recent Shipments
        </h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-600">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (shipments.length === 0) {
    return (
      <div className="mt-10 w-full">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Recent Shipments
        </h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <div className="text-gray-600">No shipments found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Recent Shipments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded-lg">
          <thead className="hidden sm:table-header-group">
            <tr className="bg-gray-200 text-left text-xs sm:text-sm text-gray-600">
              <th className="p-3 sm:p-3">Receiver Name</th>
              <th className="p-3 sm:p-3">Receiver Address</th>
              <th className="p-3 sm:p-3">Package</th>
              <th className="p-3 sm:p-3">Weight</th>
              <th className="p-3 sm:p-3">Mode of Carrier</th>
              <th className="p-3 sm:p-3">Tracking ID</th>
            </tr>
          </thead>
          <tbody>
            {shipments.map((item) => (
              <tr
                key={item.id}
                className="block sm:table-row border-t border-gray-100 text-sm text-gray-800 p-2"
              >
                {/* Mobile layout: each cell becomes a block with label */}
                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Receiver: </span>
                  {item.receiverName}
                </td>
                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Address: </span>
                  {item.receiverAddress}
                </td>
                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Weight: </span>
                  {item.package}
                </td>
                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Weight: </span>
                  {item.weight}kg
                </td>
                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Weight: </span>
                  {item.carrierMode}
                </td>

                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Tracking ID: </span>
                  {item.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentShipmentsTable;
