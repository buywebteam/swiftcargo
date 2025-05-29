const shipments = [
  {
    id: 1,
    recipient: "John Doe",
    address: "123 Maple Street",
    weight: "2kg",
    date: "2025-05-29",
    trackingid: "TRK123456789",
    status: "Delivered",
  },
  {
    id: 2,
    recipient: "Jane Smith",
    address: "456 Oak Avenue",
    weight: "3.5kg",
    date: "2025-05-28",
    trackingid: "TRK987654321",
    status: "In Transit",
  },
];

const RecentShipmentsTable = () => {
  return (
    <div className="mt-10 w-full">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">
        Recent Shipments
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow rounded-lg">
          <thead className="hidden sm:table-header-group">
            <tr className="bg-gray-200 text-left text-xs sm:text-sm text-gray-600">
              <th className="p-3 sm:p-3">Recipient</th>
              <th className="p-3 sm:p-3">Address</th>
              <th className="p-3 sm:p-3">Weight</th>
              <th className="p-3 sm:p-3">Date</th>
              <th className="p-3 sm:p-3">Tracking ID</th>
              <th className="p-3 sm:p-3">Status</th>
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
                  <span className="font-semibold sm:hidden">Recipient: </span>
                  {item.recipient}
                </td>
                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Address: </span>
                  {item.address}
                </td>
                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Weight: </span>
                  {item.weight}
                </td>
                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Date: </span>
                  {item.date}
                </td>
                <td className="block sm:table-cell p-3 sm:p-3">
                  <span className="font-semibold sm:hidden">Tracking ID: </span>
                  {item.trackingid}
                </td>
                <td
                  className={`block sm:table-cell p-3 sm:p-3 font-semibold ${
                    item.status === "Delivered"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  <span className="font-semibold sm:hidden">Status: </span>
                  {item.status}
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
