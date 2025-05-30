import { useState } from "react";

function TrackShipment() {
  const [trackingId, setTrackingId] = useState("");
  const [submittedId, setSubmittedId] = useState("");

  const shipmentDetails = [
    { label: "Tracking ID", value: submittedId || "TRK123456789" },
    { label: "Recipient", value: "John Doe" },
    { label: "Address", value: "123 Maple Street" },
    { label: "Weight", value: "2kg" },
    { label: "Date", value: "2025-05-29" },
    { label: "Status", value: "Delivered" },
    { label: "Status", value: "Delivered" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedId(trackingId); // Just mock submitting for now
  };

  return (
    <div>
      <div className="max-w-xl mx-auto mt-10 p-4">
        <h2 className="text-xl font-semibold mb-4">Track Your Shipment</h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Enter Tracking ID"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition cursor-pointer"
          >
            Track
          </button>
        </form>
      </div>

      {submittedId && (
        <div className="mt-6 p-4 ">
          <h3 className="text-4xl font-semibold mb-4 text-center">
            Shipment Details
          </h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {shipmentDetails.map(({ label, value }) => (
              <div key={label}>
                <div className="bg-white p-6 rounded-lg shadow-md text-center w-full lg:w-5/6 h-40 flex items-center justify-center flex-col">
                  <h3 className="text-base font-medium">{label}</h3>
                  <p className="text-lg font-bold mt-2">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TrackShipment;
