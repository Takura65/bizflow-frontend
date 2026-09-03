import { useMemo, useState } from "react";
import {
  Eye,
  Plus,
  Search,
  Users,
  Wallet,
} from "lucide-react";

const customersData = [
  {
    id: 1,
    name: "Tendai M.",
    phone: "077 123 4567",
    email: "tendai@example.com",
    purchases: 12,
    spent: 120,
    balance: 0,
    lastPurchase: "Today",
    status: "Active",
    history: [
      {
        sale: "#1042",
        date: "Today, 12:42 PM",
        amount: 10,
        paid: 10,
      },
      {
        sale: "#1028",
        date: "Aug 31, 1:15 PM",
        amount: 15,
        paid: 15,
      },
    ],
  },
  {
    id: 2,
    name: "Sarah K.",
    phone: "071 456 7890",
    email: "sarah@example.com",
    purchases: 8,
    spent: 85,
    balance: 10,
    lastPurchase: "Today",
    status: "Active",
    history: [
      {
        sale: "#1041",
        date: "Today, 12:18 PM",
        amount: 24.5,
        paid: 24.5,
      },
      {
        sale: "#1019",
        date: "Aug 30, 11:40 AM",
        amount: 20,
        paid: 10,
      },
    ],
  },
  {
    id: 3,
    name: "John M.",
    phone: "078 234 5678",
    email: "john@example.com",
    purchases: 5,
    spent: 65,
    balance: 25,
    lastPurchase: "Today",
    status: "Active",
    history: [
      {
        sale: "#1040",
        date: "Today, 11:56 AM",
        amount: 20,
        paid: 10,
      },
      {
        sale: "#1008",
        date: "Aug 28, 12:10 PM",
        amount: 30,
        paid: 15,
      },
    ],
  },
  {
    id: 4,
    name: "Brian T.",
    phone: "077 876 5432",
    email: "brian@example.com",
    purchases: 3,
    spent: 40,
    balance: 5,
    lastPurchase: "Yesterday",
    status: "Active",
    history: [
      {
        sale: "#1039",
        date: "Yesterday, 2:15 PM",
        amount: 5,
        paid: 0,
      },
    ],
  },
  {
    id: 5,
    name: "Mary P.",
    phone: "076 345 6789",
    email: "mary@example.com",
    purchases: 15,
    spent: 150,
    balance: 0,
    lastPurchase: "Yesterday",
    status: "Active",
    history: [
      {
        sale: "#1038",
        date: "Yesterday, 1:42 PM",
        amount: 9,
        paid: 9,
      },
      {
        sale: "#1012",
        date: "Aug 27, 12:30 PM",
        amount: 18,
        paid: 18,
      },
    ],
  },
  {
    id: 6,
    name: "David C.",
    phone: "078 987 6543",
    email: "david@example.com",
    purchases: 6,
    spent: 95,
    balance: 15,
    lastPurchase: "Yesterday",
    status: "Active",
    history: [
      {
        sale: "#1037",
        date: "Yesterday, 12:30 PM",
        amount: 35,
        paid: 20,
      },
    ],
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState(customersData);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const totalCustomers = customers.length;

  const activeCustomers = customers.filter(
    (customer) => customer.status === "Active"
  ).length;

  const owingCustomers = customers.filter(
    (customer) => customer.balance > 0
  ).length;

  const totalOutstanding = customers.reduce(
    (sum, customer) => sum + customer.balance,
    0
  );

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        customer.name.toLowerCase().includes(searchValue) ||
        customer.phone.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue);

      let matchesFilter = true;

      if (filter === "Owing") {
        matchesFilter = customer.balance > 0;
      }

      if (filter === "Paid") {
        matchesFilter = customer.balance === 0;
      }

      return matchesSearch && matchesFilter;
    });
  }, [customers, search, filter]);

  const recordPayment = () => {
    if (!selectedCustomer) return;

    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === selectedCustomer.id
          ? {
              ...customer,
              balance: 0,
            }
          : customer
      )
    );

    setSelectedCustomer((current) => ({
      ...current,
      balance: 0,
    }));
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Customers
          </h2>

          <p className="text-gray-500 mt-1">
            Manage customers, purchases and outstanding balances.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={19} />
          Add Customer
        </button>

      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Total Customers
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {totalCustomers}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Customers recorded
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Active Customers
          </p>

          <h3 className="text-2xl font-bold text-green-600 mt-2">
            {activeCustomers}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Customers with activity
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Customers Owing
          </p>

          <h3 className="text-2xl font-bold text-red-600 mt-2">
            {owingCustomers}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Have outstanding balances
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Outstanding
          </p>

          <h3 className="text-2xl font-bold text-orange-600 mt-2">
            ${totalOutstanding.toFixed(2)}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Total customer debt
          </p>
        </div>

      </div>

      {/* Outstanding alert */}
      {totalOutstanding > 0 && (
        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">

          <Wallet
            size={20}
            className="text-orange-600 mt-0.5"
          />

          <div>
            <h3 className="font-semibold text-orange-800">
              Outstanding customer balances
            </h3>

            <p className="text-sm text-orange-700 mt-1">
              {owingCustomers} customer
              {owingCustomers !== 1 ? "s" : ""} currently owe a
              combined ${totalOutstanding.toFixed(2)}.
            </p>
          </div>

        </div>
      )}

      {/* Search and filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">

        <div className="flex flex-col md:flex-row gap-3">

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">
              All Customers
            </option>

            <option value="Owing">
              Customers Owing
            </option>

            <option value="Paid">
              Fully Paid
            </option>
          </select>

        </div>

      </div>

      {/* Customer table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="p-6 border-b border-gray-100">

          <h3 className="text-lg font-semibold text-gray-900">
            Customer List
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {filteredCustomers.length} customer
            {filteredCustomers.length !== 1 ? "s" : ""}
            {" "}found
          </p>

        </div>

        {filteredCustomers.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-gray-100 text-left">

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Customer
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Phone
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Purchases
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Total Spent
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Balance
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Last Purchase
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredCustomers.map((customer) => (

                  <tr
                    key={customer.id}
                    className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-sm font-semibold text-green-700">
                            {customer.name.charAt(0)}
                          </span>
                        </div>

                        <div>

                          <p className="font-semibold text-gray-900">
                            {customer.name}
                          </p>

                          <p className="text-xs text-gray-400">
                            {customer.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {customer.phone}
                    </td>

                    <td className="px-6 py-4 text-gray-700">
                      {customer.purchases}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900">
                      ${customer.spent.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">

                      {customer.balance > 0 ? (

                        <div>
                          <p className="font-semibold text-red-600">
                            ${customer.balance.toFixed(2)}
                          </p>

                          <p className="text-xs text-red-400">
                            Outstanding
                          </p>
                        </div>

                      ) : (

                        <span className="text-green-600 font-medium">
                          Paid
                        </span>

                      )}

                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {customer.lastPurchase}
                    </td>

                    <td className="px-6 py-4">

                      <button
                        onClick={() =>
                          setSelectedCustomer(customer)
                        }
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
              <Users
                size={22}
                className="text-gray-400"
              />
            </div>

            <h3 className="font-semibold text-gray-900 mt-4">
              No customers found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filter.
            </p>

          </div>

        )}

      </div>

      {/* Customer details modal */}
      {selectedCustomer && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">

            {/* Modal header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center">

                  <span className="font-semibold text-green-700">
                    {selectedCustomer.name.charAt(0)}
                  </span>

                </div>

                <div>

                  <p className="text-sm text-gray-500">
                    Customer
                  </p>

                  <h3 className="text-xl font-bold text-gray-900">
                    {selectedCustomer.name}
                  </h3>

                </div>

              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>

            {/* Customer information */}
            <div className="p-6 space-y-6">

              <div className="grid grid-cols-2 gap-4">

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                  <p className="font-medium text-gray-900 mt-1">
                    {selectedCustomer.phone}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p className="font-medium text-gray-900 mt-1 break-all">
                    {selectedCustomer.email}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Total Purchases
                  </p>

                  <p className="font-bold text-gray-900 mt-1">
                    {selectedCustomer.purchases}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500">
                    Total Spent
                  </p>

                  <p className="font-bold text-gray-900 mt-1">
                    ${selectedCustomer.spent.toFixed(2)}
                  </p>
                </div>

              </div>

              {/* Balance */}
              <div
                className={`rounded-xl p-5 ${
                  selectedCustomer.balance > 0
                    ? "bg-red-50 border border-red-100"
                    : "bg-green-50 border border-green-100"
                }`}
              >

                <p className="text-sm text-gray-500">
                  Outstanding Balance
                </p>

                <p
                  className={`text-3xl font-bold mt-1 ${
                    selectedCustomer.balance > 0
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  ${selectedCustomer.balance.toFixed(2)}
                </p>

                {selectedCustomer.balance > 0 && (
                  <p className="text-sm text-red-500 mt-1">
                    Customer needs to settle this balance.
                  </p>
                )}

              </div>

              {/* Purchase history */}
              <div>

                <h4 className="font-semibold text-gray-900 mb-3">
                  Purchase History
                </h4>

                <div className="space-y-3">

                  {selectedCustomer.history.map((sale) => (

                    <div
                      key={sale.sale}
                      className="border border-gray-100 rounded-xl p-4"
                    >

                      <div className="flex items-center justify-between">

                        <div>

                          <p className="font-semibold text-gray-900">
                            {sale.sale}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {sale.date}
                          </p>

                        </div>

                        <div className="text-right">

                          <p className="font-semibold text-gray-900">
                            ${sale.amount.toFixed(2)}
                          </p>

                          <p
                            className={`text-xs mt-1 ${
                              sale.paid === sale.amount
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            Paid ${sale.paid.toFixed(2)}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            {/* Modal footer */}
            <div className="p-6 border-t border-gray-100 flex gap-3">

              {selectedCustomer.balance > 0 && (

                <button
                  onClick={recordPayment}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg"
                >
                  Record Payment
                </button>

              )}

              <button
                onClick={() => setSelectedCustomer(null)}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg"
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

export default Customers;