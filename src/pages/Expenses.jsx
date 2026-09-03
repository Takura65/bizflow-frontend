import { useMemo, useState } from "react";
import {
  Car,
  FileText,
  Fuel,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Wallet,
  X,
} from "lucide-react";

const initialExpenses = [
  {
    id: "EXP-1021",
    description: "Chicken stock",
    category: "Inventory",
    amount: 120,
    date: "Today, 7:30 AM",
  },
  {
    id: "EXP-1020",
    description: "Market transport",
    category: "Transport",
    amount: 15,
    date: "Today, 6:15 AM",
  },
  {
    id: "EXP-1019",
    description: "Cooking gas refill",
    category: "Utilities",
    amount: 25,
    date: "Yesterday, 4:30 PM",
  },
  {
    id: "EXP-1018",
    description: "Food packaging",
    category: "Supplies",
    amount: 40,
    date: "Yesterday, 10:20 AM",
  },
  {
    id: "EXP-1017",
    description: "Tomatoes and vegetables",
    category: "Inventory",
    amount: 65,
    date: "Aug 31, 7:10 AM",
  },
  {
    id: "EXP-1016",
    description: "Stall rent",
    category: "Rent",
    amount: 150,
    date: "Aug 31, 8:00 AM",
  },
  {
    id: "EXP-1015",
    description: "Electricity",
    category: "Utilities",
    amount: 70,
    date: "Aug 30, 5:00 PM",
  },
];

const categoryIcons = {
  Inventory: <ShoppingCart size={18} />,
  Transport: <Car size={18} />,
  Utilities: <Fuel size={18} />,
  Supplies: <Package size={18} />,
  Rent: <Wallet size={18} />,
  Other: <FileText size={18} />,
};

const Expenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    category: "Inventory",
    amount: "",
  });

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const todayExpenses = expenses
    .filter((expense) => expense.date.startsWith("Today"))
    .reduce((sum, expense) => sum + expense.amount, 0);

  const monthExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        expense.id.toLowerCase().includes(searchValue) ||
        expense.description.toLowerCase().includes(searchValue) ||
        expense.category.toLowerCase().includes(searchValue);

      const matchesCategory =
        filter === "All" || expense.category === filter;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, search, filter]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount) {
      return;
    }

    const newExpense = {
      id: `EXP-${1022 + expenses.length}`,
      description: formData.description,
      category: formData.category,
      amount: Number(formData.amount),
      date: "Just now",
    };

    setExpenses((current) => [newExpense, ...current]);

    setFormData({
      description: "",
      category: "Inventory",
      amount: "",
    });

    setShowModal(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Expenses
          </h2>

          <p className="text-gray-500 mt-1">
            Track where your business money is going.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={19} />
          Add Expense
        </button>

      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Total Expenses
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${totalExpenses.toFixed(2)}
              </h3>
            </div>

            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Wallet
                size={20}
                className="text-red-600"
              />
            </div>

          </div>

        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Today's Expenses
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${todayExpenses.toFixed(2)}
              </h3>
            </div>

            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText
                size={20}
                className="text-orange-600"
              />
            </div>

          </div>

        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-gray-500">
                This Month
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${monthExpenses.toFixed(2)}
              </h3>
            </div>

            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package
                size={20}
                className="text-blue-600"
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
              placeholder="Search expenses..."
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
              All Categories
            </option>

            <option value="Inventory">
              Inventory
            </option>

            <option value="Transport">
              Transport
            </option>

            <option value="Utilities">
              Utilities
            </option>

            <option value="Supplies">
              Supplies
            </option>

            <option value="Rent">
              Rent
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

      </div>

      {/* Expense table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="p-6 border-b border-gray-100">

          <h3 className="text-lg font-semibold text-gray-900">
            Expense History
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {filteredExpenses.length} expense
            {filteredExpenses.length !== 1 ? "s" : ""}
            found
          </p>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b border-gray-100 text-left">

                <th className="px-6 py-3 font-medium text-gray-500">
                  Expense ID
                </th>

                <th className="px-6 py-3 font-medium text-gray-500">
                  Description
                </th>

                <th className="px-6 py-3 font-medium text-gray-500">
                  Category
                </th>

                <th className="px-6 py-3 font-medium text-gray-500">
                  Amount
                </th>

                <th className="px-6 py-3 font-medium text-gray-500">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredExpenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                >

                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{expense.id}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {expense.description}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-2 text-gray-600">

                      {categoryIcons[expense.category]}

                      <span>
                        {expense.category}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-4 font-semibold text-red-600">
                    -${expense.amount.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {expense.date}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {filteredExpenses.length === 0 && (

            <div className="text-center py-14">

              <FileText
                size={30}
                className="mx-auto text-gray-300"
              />

              <p className="font-medium text-gray-700 mt-3">
                No expenses found
              </p>

              <p className="text-sm text-gray-400 mt-1">
                Try changing your search or category.
              </p>

            </div>

          )}

        </div>

      </div>

      {/* Add Expense Modal */}
      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl w-full max-w-md">

            {/* Modal header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Add Expense
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Record a business expense.
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X size={21} />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-5"
            >

              {/* Description */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>

                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="e.g. Market stock"
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

              {/* Category */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
                >

                  <option value="Inventory">
                    Inventory
                  </option>

                  <option value="Transport">
                    Transport
                  </option>

                  <option value="Utilities">
                    Utilities
                  </option>

                  <option value="Supplies">
                    Supplies
                  </option>

                  <option value="Rent">
                    Rent
                  </option>

                  <option value="Other">
                    Other
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
                  Save Expense
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Expenses;