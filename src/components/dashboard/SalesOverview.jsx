const salesData = [
  { day: "Mon", value: 55 },
  { day: "Tue", value: 72 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 68 },
  { day: "Sat", value: 92 },
  { day: "Sun", value: 76 },
];

const SalesOverview = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Sales Overview
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Sales performance over the last 7 days
          </p>
        </div>

        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>

      <div className="h-64 flex items-end justify-between gap-4">
        {salesData.map((item) => (
          <div
            key={item.day}
            className="flex-1 h-full flex flex-col justify-end items-center gap-2"
          >
            <div className="w-full h-full flex items-end">
              <div
                className="w-full bg-green-500 rounded-t-md hover:bg-green-600 transition"
                style={{ height: `${item.value}%` }}
                title={`$${item.value * 10}`}
              />
            </div>

            <span className="text-xs text-gray-500">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesOverview;