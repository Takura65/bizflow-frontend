import { useMemo, useState } from "react";
import {
  Banknote,
  CreditCard,
  Plus,
  Search,
  Smartphone,
  Wallet,
  X,
} from "lucide-react";

const initialPayments = [
  {
    id: "PAY-1042",
    customer: "Tendai M.",
    method: "Cash",
    amount: 10,
    status: "Paid",
    date: "Today, 12:42 PM",
  },
  {
    id: "PAY-1041",
    customer: "Sarah K.",
    method: "EcoCash",
    amount: 24.5,
    status: "Paid",
    date: "Today, 12:18 PM",
  },
  {
    id: "PAY-1040",
    customer: "John M.",
    method: "Cash",
    amount: 10,
    status: "Partial",
    date: "Today, 11:56 AM",
  },
  {
    id: "PAY-1039",
    customer: "Brian T.",
    method: "EcoCash",
    amount: 0,
    status: "Pending",
    date: "Yesterday, 2:15 PM",
  },
  {
    id: "PAY-1038",
    customer: "Mary P.",
    method: "Cash",
    amount: 18,
    status: "Paid",
    date: "Yesterday, 1:42 PM",
  },
  {
    id: "PAY-1037",
    customer: "David C.",
    method: "EcoCash",
    amount: 20,
    status: "Partial",
    date: "Yesterday, 12:30 PM",
  },
  {
    id: "PAY-1036",
    customer: "Sarah K.",
    method: "Cash",
    amount: 15,
    status: "Paid",
    date: "Aug 31, 1:15 PM",
  },
];

const Payments = () => {
  const [payments, setPayments] = useState(initialPayments);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    customer: "",
    method: "Cash",
    amount: "",
    status: "Paid",
  });

  const totalPayments = payments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  const cashPayments = payments
    .filter((payment) => payment.method === "Cash")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const mobilePayments = payments
    .filter((payment) => payment.method === "EcoCash")
    .reduce((sum, payment) => sum + payment.amount, 0);

  const outstanding = payments
    .filter(
      (payment) =>
        payment.status === "Partial" || payment.status === "Pending"
    )
    .reduce((sum, payment) => sum + payment.amount, 0);

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        payment.id.toLowerCase().includes(searchValue) ||
        payment.customer.toLowerCase().includes(searchValue) ||
        payment.method.toLowerCase().includes(searchValue);

      let matchesFilter = true;

      if (filter !== "All") {
        matchesFilter = payment.method === filter;
      }

      return matchesSearch && matchesFilter;
    });
  }, [payments, search, filter]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customer || !formData.amount) {
      return;
    }

    const newPayment = {
      id: `PAY-${1043 + payments.length}`,
      customer: formData.customer,
      method: formData.method,
      amount: Number(formData.amount),
      status: formData.status,
      date: "Just now",
    };

    setPayments((current) => [newPayment, ...current]);

    setFormData({
      customer: "",
      method: "Cash",
      amount: "",
      status: "Paid",
    });

    setShowModal(false);
  };

  const getMethodIcon = (method) => {
    if (method === "Cash") {
      return <Banknote size={17} />;
    }

    if (method === "EcoCash") {
      return <Smartphone size={17} />;
    }

    return <CreditCard size={17} />;
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Payments
          </h2>

          <p className="text-gray-500 mt-1">
            Track cash, mobile money and outstanding payments.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={19} />
          Record Payment
        </button>

      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* Total */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Received
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${totalPayments.toFixed(2)}
              </h3>
            </div>

            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Wallet
                size={20}
                className="text-green-600"
              />
            </div>

          </div>

        </div>

        {/* Cash */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Cash
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${cashPayments.toFixed(2)}
              </h3>
            </div>

            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Banknote
                size={20}
                className="text-gray-600"
              />
            </div>

          </div>

        </div>

        {/* Mobile */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Mobile Money
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${mobilePayments.toFixed(2)}
              </h3>
            </div>

            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Smartphone
                size={20}
                className="text-orange-600"
              />
            </div>

          </div>

        </div>

        {/* Outstanding */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Outstanding
              </p>

              <h3 className="text-2xl font-bold text-red-600 mt-2">
                ${outstanding.toFixed(2)}
              </h3>
            </div>

            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <CreditCard
                size={20}
                className="text-red-600"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Search + filter */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">

        <div className="flex flex-col md:flex-row gap-3">

          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search payment, customer or method..."
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
              All Methods
            </option>

            <option value="Cash">
              Cash
            </option>

            <option value="EcoCash">
              EcoCash
            </option>

          </select>

        </div>

      </div>

      {/* Payments table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="p-6 border-b border-gray-100">

          <h3 className="text-lg font-semibold text-gray-900">
            Payment History
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {filteredPayments.length} payment
            {filteredPayments.length !== 1 ? "s" : ""}
            {" "}found
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-gray-100 text-left">

                <th className="px-6 py-3 font-medium text-gray-500">
                  Payment ID
                </th>

                <th className="px-6 py-3 font-medium text-gray-500">
                  Customer
                </th>

                <th className="px-6 py-3 font-medium text-gray-500">
                  Method
                </th>

                <th className="px-6 py-3 font-medium text-gray-500">
                  Amount
                </th>

                <th className="px-6 py-3 font-medium text-gray-500">
                  Status
                </th>

                <th className="px-6 py-3 font-medium text-gray-500">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredPayments.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{payment.id}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {payment.customer}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2">

                      <span className="text-gray-500">
                        {getMethodIcon(payment.method)}
                      </span>

                      <span className="text-gray-700">
                        {payment.method}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : payment.status === "Partial"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.status}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {payment.date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredPayments.length === 0 && (

            <div className="text-center py-14">

              <Wallet
                size={30}
                className="mx-auto text-gray-300"
              />

              <p className="font-medium text-gray-700 mt-3">
                No payments found
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* Record payment modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-md">

            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Record Payment
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Add a new customer payment.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={21} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* Customer */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer
                </label>

                <input
                  type="text"
                  value={formData.customer}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customer: e.target.value,
                    })
                  }
                  placeholder="e.g. John M."
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              {/* Amount */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        amount: e.target.value,
                      })
                    }
                    placeholder="0.00"
                    className="w-full border border-gray-200 rounded-lg pl-8 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>

              </div>

              {/* Method */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>

                <select
                  value={formData.method}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      method: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                >

                  <option value="Cash">
                    Cash
                  </option>

                  <option value="EcoCash">
                    EcoCash
                  </option>

                </select>

              </div>

              {/* Status */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>

                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                >

                  <option value="Paid">
                    Paid
                  </option>

                  <option value="Partial">
                    Partial
                  </option>

                  <option value="Pending">
                    Pending
                  </option>

                </select>

              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 border border-gray-200 text-gray-700 font-medium py-2.5 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 rounded-lg"
                >
                  Save Payment
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Payments;