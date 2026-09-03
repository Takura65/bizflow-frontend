import { useMemo, useState } from "react";
import {
  ChevronDown,
  Eye,
  Plus,
  Search,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const salesData = [
  {
    id: "#1042",
    customer: "Tendai M.",
    items: "Chicken Meal × 2",
    amount: 10,
    paid: 10,
    payment: "Cash",
    status: "Paid",
    date: "Today, 12:42 PM",
  },
  {
    id: "#1041",
    customer: "Sarah K.",
    items: "Groceries",
    amount: 24.5,
    paid: 24.5,
    payment: "Mobile Money",
    status: "Paid",
    date: "Today, 12:18 PM",
  },
  {
    id: "#1040",
    customer: "John M.",
    items: "Black T-Shirt",
    amount: 20,
    paid: 10,
    payment: "Cash",
    status: "Partial",
    date: "Today, 11:56 AM",
  },
  {
    id: "#1039",
    customer: "Brian T.",
    items: "Chicken Meal",
    amount: 5,
    paid: 0,
    payment: "Credit",
    status: "Credit",
    date: "Yesterday, 2:15 PM",
  },
  {
    id: "#1038",
    customer: "Mary P.",
    items: "Rice 2kg × 2",
    amount: 9,
    paid: 9,
    payment: "Cash",
    status: "Paid",
    date: "Yesterday, 1:42 PM",
  },
  {
    id: "#1037",
    customer: "David C.",
    items: "Blue Jeans",
    amount: 35,
    paid: 20,
    payment: "Mobile Money",
    status: "Partial",
    date: "Yesterday, 12:30 PM",
  },
];

const Sales = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [selectedSale, setSelectedSale] = useState(null);

  const filteredSales = useMemo(() => {
    return salesData.filter((sale) => {
      const matchesSearch =
        sale.id.toLowerCase().includes(search.toLowerCase()) ||
        sale.customer.toLowerCase().includes(search.toLowerCase()) ||
        sale.items.toLowerCase().includes(search.toLowerCase());

      const matchesPayment =
        paymentFilter === "All" ||
        sale.payment === paymentFilter;

      return matchesSearch && matchesPayment;
    });
  }, [search, paymentFilter]);

  const totalSales = salesData.reduce(
    (sum, sale) => sum + sale.amount,
    0
  );

  const totalPaid = salesData.reduce(
    (sum, sale) => sum + sale.paid,
    0
  );

  const totalOwed = salesData.reduce(
    (sum, sale) => sum + (sale.amount - sale.paid),
    0
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Sales
          </h2>

          <p className="text-gray-500 mt-1">
            Track and manage your business sales.
          </p>
        </div>

        <button
          onClick={() => navigate("/sales/new")}
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={19} />
          New Sale
        </button>

      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Total Sales
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            ${totalSales.toFixed(2)}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Today's recorded sales
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Total Paid
          </p>

          <h3 className="text-2xl font-bold text-green-600 mt-2">
            ${totalPaid.toFixed(2)}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Money received
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Outstanding
          </p>

          <h3 className="text-2xl font-bold text-red-600 mt-2">
            ${totalOwed.toFixed(2)}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Still owed by customers
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Transactions
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {salesData.length}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Recorded transactions
          </p>
        </div>

      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">

        <div className="flex flex-col md:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by sale, customer or product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* Payment filter */}
          <div className="relative">

            <select
              value={paymentFilter}
              onChange={(e) =>
                setPaymentFilter(e.target.value)
              }
              className="appearance-none w-full md:w-48 border border-gray-200 rounded-lg px-4 py-2.5 pr-10 outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="All">
                All payments
              </option>

              <option value="Cash">
                Cash
              </option>

              <option value="Mobile Money">
                Mobile Money
              </option>

              <option value="Credit">
                Credit
              </option>
            </select>

            <ChevronDown
              size={17}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />

          </div>

        </div>

      </div>

      {/* Sales table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Sales
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {filteredSales.length} transaction
            {filteredSales.length !== 1 ? "s" : ""}
            found
          </p>
        </div>

        {filteredSales.length > 0 ? (
          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-gray-100 text-left">

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Sale
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Customer
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Items
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Amount
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Payment
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Date
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredSales.map((sale) => (
                  <tr
                    key={sale.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {sale.id}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {sale.customer}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {sale.items}
                    </td>

                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          ${sale.amount.toFixed(2)}
                        </p>

                        {sale.paid < sale.amount && (
                          <p className="text-xs text-red-500 mt-1">
                            ${(
                              sale.amount - sale.paid
                            ).toFixed(2)} owed
                          </p>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">

                      <div className="flex flex-col gap-1">

                        <span
                          className={`inline-flex w-fit px-2.5 py-1 rounded-full text-xs font-medium ${
                            sale.status === "Paid"
                              ? "bg-green-100 text-green-700"
                              : sale.status === "Partial"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {sale.status}
                        </span>

                        <span className="text-xs text-gray-400">
                          {sale.payment}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {sale.date}
                    </td>

                    <td className="px-6 py-4">

                      <button
                        onClick={() => setSelectedSale(sale)}
                        className="inline-flex items-center gap-1.5 text-gray-500 hover:text-green-600 font-medium"
                      >
                        <Eye size={16} />
                        View
                      </button>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        ) : (
          <div className="text-center py-16">

            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag
                size={22}
                className="text-gray-400"
              />
            </div>

            <h3 className="font-semibold text-gray-900 mt-4">
              No sales found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </div>

      {/* Sale details modal */}
      {selectedSale && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl max-w-md w-full">

            <div className="p-6 border-b border-gray-100 flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Sale
                </p>

                <h3 className="text-xl font-bold text-gray-900">
                  {selectedSale.id}
                </h3>
              </div>

              <button
                onClick={() => setSelectedSale(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                ×
              </button>

            </div>

            <div className="p-6 space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Customer
                </span>

                <span className="font-medium">
                  {selectedSale.customer}
                </span>
              </div>

              <div className="flex justify-between gap-6">
                <span className="text-gray-500">
                  Items
                </span>

                <span className="font-medium text-right">
                  {selectedSale.items}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Total
                </span>

                <span className="font-bold">
                  ${selectedSale.amount.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Paid
                </span>

                <span className="font-medium text-green-600">
                  ${selectedSale.paid.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Balance
                </span>

                <span className="font-medium text-red-600">
                  ${(
                    selectedSale.amount -
                    selectedSale.paid
                  ).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Payment
                </span>

                <span className="font-medium">
                  {selectedSale.payment}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Date
                </span>

                <span className="font-medium">
                  {selectedSale.date}
                </span>
              </div>

            </div>

            <div className="p-6 border-t border-gray-100">

              <button
                onClick={() => setSelectedSale(null)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg"
              >
                Close
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Sales;