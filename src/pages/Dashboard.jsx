import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CircleDollarSign,
  Clock,
  Package,
  Plus,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const recentOrders = [
  {
    id: "#ORD-1021",
    customer: "Tendai Moyo",
    amount: 25,
    status: "Paid",
  },
  {
    id: "#ORD-1020",
    customer: "Sarah M.",
    amount: 15,
    status: "Pending",
  },
  {
    id: "#ORD-1019",
    customer: "John D.",
    amount: 32,
    status: "Paid",
  },
  {
    id: "#ORD-1018",
    customer: "Mary T.",
    amount: 18,
    status: "Processing",
  },
];

const lowStock = [
  {
    name: "Chicken",
    quantity: "5 portions",
  },
  {
    name: "Cooking Oil",
    quantity: "2 litres",
  },
  {
    name: "Rice",
    quantity: "8 kg",
  },
  {
    name: "Tomatoes",
    quantity: "4 kg",
  },
];

const outstandingPayments = [
  {
    customer: "John D.",
    amount: 20,
  },
  {
    customer: "Sarah M.",
    amount: 15,
  },
  {
    customer: "Peter K.",
    amount: 8,
  },
];

const activities = [
  {
    text: "Payment of $25 received",
    time: "5 minutes ago",
    type: "success",
  },
  {
    text: "New order #ORD-1021 created",
    time: "18 minutes ago",
    type: "info",
  },
  {
    text: "Chicken stock is running low",
    time: "32 minutes ago",
    type: "warning",
  },
  {
    text: "Expense of $35 recorded",
    time: "1 hour ago",
    type: "expense",
  },
];

const Dashboard = () => {
  const revenue = 320;
  const expenses = 95;
  const profit = revenue - expenses;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Good morning 👋
          </h1>

          <p className="text-gray-500 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium transition">
          <Plus size={19} />
          New Sale
        </button>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* Sales */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Today's Sales
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                24
              </h2>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <ArrowUpRight size={15} />
                12% from yesterday
              </div>
            </div>

            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <ShoppingCart
                size={20}
                className="text-green-600"
              />
            </div>

          </div>

        </div>

        {/* Revenue */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                ${revenue.toFixed(2)}
              </h2>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <ArrowUpRight size={15} />
                8% from yesterday
              </div>
            </div>

            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <CircleDollarSign
                size={20}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>

        {/* Expenses */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Expenses
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                ${expenses.toFixed(2)}
              </h2>

              <div className="flex items-center gap-1 mt-2 text-sm text-orange-600">
                <ArrowUpRight size={15} />
                3% from yesterday
              </div>
            </div>

            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Wallet
                size={20}
                className="text-orange-600"
              />
            </div>

          </div>

        </div>

        {/* Profit */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Today's Profit
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                ${profit.toFixed(2)}
              </h2>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp size={15} />
                Healthy
              </div>
            </div>

            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp
                size={20}
                className="text-purple-600"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Sales overview */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Sales Overview
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Your sales performance over the week.
              </p>
            </div>

            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option>This Week</option>
              <option>This Month</option>
            </select>

          </div>

          {/* Simple chart */}
          <div className="h-64 flex items-end gap-3 sm:gap-6 border-b border-l border-gray-200 px-4">

            {[45, 65, 55, 80, 70, 95, 72].map(
              (height, index) => (
                <div
                  key={index}
                  className="flex-1 h-full flex flex-col justify-end"
                >

                  <div
                    className="bg-green-500 rounded-t-md w-full max-w-10 mx-auto"
                    style={{
                      height: `${height}%`,
                    }}
                  />

                  <span className="text-xs text-gray-500 text-center py-3">
                    {
                      [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                        "Sat",
                        "Sun",
                      ][index]
                    }
                  </span>

                </div>
              )
            )}

          </div>

        </div>

        {/* Low stock */}
        <div className="bg-white border border-gray-200 rounded-xl">

          <div className="p-6 border-b border-gray-100">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Low Stock
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Items that need attention.
                </p>
              </div>

              <Package
                size={20}
                className="text-orange-500"
              />

            </div>

          </div>

          <div className="divide-y divide-gray-100">

            {lowStock.map((item) => (

              <div
                key={item.name}
                className="flex items-center justify-between p-4"
              >

                <div>
                  <p className="font-medium text-gray-900">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Remaining
                  </p>
                </div>

                <span className="text-sm font-semibold text-orange-600">
                  {item.quantity}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Orders + payments */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent orders */}
        <div className="bg-white border border-gray-200 rounded-xl">

          <div className="p-6 border-b border-gray-100 flex items-center justify-between">

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Your latest customer orders.
              </p>
            </div>

            <ShoppingCart
              size={20}
              className="text-gray-400"
            />

          </div>

          <div className="divide-y divide-gray-100">

            {recentOrders.map((order) => (

              <div
                key={order.id}
                className="flex items-center justify-between p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <ShoppingCart
                      size={18}
                      className="text-gray-500"
                    />
                  </div>

                  <div>

                    <p className="font-medium text-gray-900">
                      {order.id}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.customer}
                    </p>

                  </div>

                </div>

                <div className="text-right">

                  <p className="font-semibold text-gray-900">
                    ${order.amount.toFixed(2)}
                  </p>

                  <span
                    className={`text-xs font-medium ${
                      order.status === "Paid"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-orange-600"
                        : "text-blue-600"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Outstanding */}
        <div className="bg-white border border-gray-200 rounded-xl">

          <div className="p-6 border-b border-gray-100">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Users
                  size={20}
                  className="text-red-600"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Outstanding Payments
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Customers with unpaid balances.
                </p>
              </div>

            </div>

          </div>

          <div className="divide-y divide-gray-100">

            {outstandingPayments.map((payment) => (

              <div
                key={payment.customer}
                className="flex items-center justify-between p-5"
              >

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                    <Users
                      size={17}
                      className="text-gray-500"
                    />
                  </div>

                  <p className="font-medium text-gray-900">
                    {payment.customer}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold text-red-600">
                    ${payment.amount.toFixed(2)}
                  </p>

                  <p className="text-xs text-gray-400">
                    Outstanding
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Activity */}
      <div className="bg-white border border-gray-200 rounded-xl">

        <div className="p-6 border-b border-gray-100">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Bell
                size={20}
                className="text-gray-600"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Latest changes in your business.
              </p>
            </div>

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">

          {activities.map((activity, index) => (

            <div
              key={index}
              className="p-5 flex gap-3"
            >

              <div
                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === "success"
                    ? "bg-green-500"
                    : activity.type === "warning"
                    ? "bg-orange-500"
                    : activity.type === "expense"
                    ? "bg-red-500"
                    : "bg-blue-500"
                }`}
              />

              <div>

                <p className="text-sm font-medium text-gray-800">
                  {activity.text}
                </p>

                <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                  <Clock size={12} />
                  {activity.time}
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;