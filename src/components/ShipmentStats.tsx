const ShipmentStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      {[
        { label: "Total Shipments", value: 128 },
        { label: "In Transit", value: 9 },
        { label: "Delivered", value: 119 },
      ].map((stat, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-md text-center"
        >
          <h3 className="text-lg font-medium text-gray-700">{stat.label}</h3>
          <p className="text-3xl font-bold mt-2 text-black">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default ShipmentStats;
