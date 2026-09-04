import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Eye,
  Clock,
  CheckCircle,
  Truck,
} from "lucide-react";

const initialOrders = [
  {
    id: "#ORD-1001",
    customer: "Tendai Moyo",
    items: "Chicken and rice",
    amount: 25,
    payment: "EcoCash",
    status: "Pending",
    date: "Today, 09:30",
  },
  {
    id: "#ORD-1002",
    customer: "Sarah M.",
    items: "Beef burger",
    amount: 12,
    payment: "Cash",
    status: "Processing",
    date: "Today, 10:15",
  },
  {
    id: "#ORD-1003",
    customer: "John D.",
    items: "Rice and vegetables",
    amount: 18,
    payment: "EcoCash",
    status: "Completed",
    date: "Yesterday",
  },
  {
    id: "#ORD-1004",
    customer: "Mary T.",
    items: "Chicken portions",
    amount: 30,
    payment: "Cash",
    status: "Completed",
    date: "Yesterday",
  },
];

const statusStyles = {
  Pending: "bg-orange-100 text-orange-700",
  Processing: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
};

const Orders = () => {
  const [orders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Orders
        </h1>

        <p className="text-gray-500 mt-1">
          Manage and track your customer orders.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Total Orders</p>
            <ShoppingCart className="text-green-600" size={20} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-3">
            {orders.length}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Pending</p>
            <Clock className="text-orange-500" size={20} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-3">
            {orders.filter((order) => order.status === "Pending").length}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Processing</p>
            <Truck className="text-blue-500" size={20} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-3">
            {orders.filter((order) => order.status === "Processing").length}
          </h2>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Completed</p>
            <CheckCircle className="text-green-500" size={20} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-3">
            {orders.filter((order) => order.status === "Completed").length}
          </h2>
        </div>

      </div>

      {/* Orders table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        {/* Filters */}
        <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

          <div className="relative w-full md:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search orders or customers..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Order
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Items
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Payment
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>

                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">

              {filteredOrders.map((order) => (

                <tr key={order.id} className="hover:bg-gray-50">

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {order.id}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {order.customer}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {order.items}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${order.amount.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {order.payment}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {order.date}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      className="text-gray-500 hover:text-green-600"
                      title="View order"
                    >
                      <Eye size={18} />
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {filteredOrders.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            No orders found.
          </div>
        )}

      </div>

    </div>
  );
};

export default Orders;