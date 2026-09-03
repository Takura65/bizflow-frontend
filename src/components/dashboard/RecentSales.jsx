const recentSales = [
  {
    id: "#1042",
    customer: "Tendai M.",
    item: "Chicken Meal × 2",
    amount: "$10.00",
    status: "Paid",
  },
  {
    id: "#1041",
    customer: "Sarah K.",
    item: "Groceries",
    amount: "$24.50",
    status: "Paid",
  },
  {
    id: "#1040",
    customer: "John M.",
    item: "Black T-Shirt",
    amount: "$20.00",
    status: "Partial",
  },
  {
    id: "#1039",
    customer: "Brian T.",
    item: "Chicken Meal × 1",
    amount: "$5.00",
    status: "Credit",
  },
];

const RecentSales = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl">
      <div className="p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Sales
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Your latest transactions
          </p>
        </div>

        <button className="text-sm text-green-600 font-medium hover:text-green-700">
          View all →
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-t border-b border-gray-100 text-left">
              <th className="px-6 py-3 font-medium text-gray-500">
                Sale
              </th>

              <th className="px-6 py-3 font-medium text-gray-500">
                Customer
              </th>

              <th className="px-6 py-3 font-medium text-gray-500">
                Item
              </th>

              <th className="px-6 py-3 font-medium text-gray-500">
                Amount
              </th>

              <th className="px-6 py-3 font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {recentSales.map((sale) => (
              <tr
                key={sale.id}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {sale.id}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {sale.customer}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {sale.item}
                </td>

                <td className="px-6 py-4 font-medium text-gray-900">
                  {sale.amount}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      sale.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : sale.status === "Partial"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentSales;