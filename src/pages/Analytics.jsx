import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CircleDollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Wallet,
} from "lucide-react";

const revenueData = [
  { day: "Mon", revenue: 180, expenses: 80 },
  { day: "Tue", revenue: 240, expenses: 110 },
  { day: "Wed", revenue: 210, expenses: 95 },
  { day: "Thu", revenue: 310, expenses: 120 },
  { day: "Fri", revenue: 300, expenses: 80 },
  { day: "Sat", revenue: 360, expenses: 140 },
  { day: "Sun", revenue: 280, expenses: 90 },
];

const topProducts = [
  {
    name: "Chicken & Rice",
    sales: 240,
    units: 48,
  },
  {
    name: "Beef Plate",
    sales: 180,
    units: 36,
  },
  {
    name: "Fish & Chips",
    sales: 145,
    units: 29,
  },
  {
    name: "Lunch Combo",
    sales: 120,
    units: 24,
  },
];

const Analytics = () => {
  const totalRevenue = revenueData.reduce(
    (sum, item) => sum + item.revenue,
    0
  );

  const totalExpenses = revenueData.reduce(
    (sum, item) => sum + item.expenses,
    0
  );

  const totalProfit = totalRevenue - totalExpenses;

  const profitMargin =
    totalRevenue > 0
      ? (totalProfit / totalRevenue) * 100
      : 0;

  const maxValue = Math.max(
    ...revenueData.map((item) =>
      Math.max(item.revenue, item.expenses)
    )
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Analytics
          </h2>

          <p className="text-gray-500 mt-1">
            Understand your business performance at a glance.
          </p>
        </div>

        <select className="border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-500">
          <option>This Week</option>
          <option>This Month</option>
          <option>Last 30 Days</option>
          <option>This Year</option>
        </select>

      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {/* Revenue */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Revenue
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${totalRevenue.toFixed(2)}
              </h3>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <ArrowUpRight size={16} />
                12.5%
              </div>
            </div>

            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CircleDollarSign
                size={20}
                className="text-green-600"
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

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${totalExpenses.toFixed(2)}
              </h3>

              <div className="flex items-center gap-1 mt-2 text-sm text-orange-600">
                <ArrowUpRight size={16} />
                4.2%
              </div>
            </div>

            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
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
                Profit
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                ${totalProfit.toFixed(2)}
              </h3>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <ArrowUpRight size={16} />
                18.3%
              </div>
            </div>

            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <TrendingUp
                size={20}
                className="text-blue-600"
              />
            </div>

          </div>

        </div>

        {/* Margin */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">

          <div className="flex items-start justify-between">

            <div>
              <p className="text-sm text-gray-500">
                Profit Margin
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {profitMargin.toFixed(1)}%
              </h3>

              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <ArrowUpRight size={16} />
                3.1%
              </div>
            </div>

            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <BarChart3
                size={20}
                className="text-purple-600"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Revenue chart */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">

        <div className="flex items-center justify-between mb-6">

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Revenue vs Expenses
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Compare your money coming in and going out.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-sm">

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500" />
              Revenue
            </div>

            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-300" />
              Expenses
            </div>

          </div>

        </div>

        {/* Chart */}
        <div className="h-72 flex items-end gap-3 sm:gap-6 border-b border-l border-gray-200 px-4 pb-0">

          {revenueData.map((item) => {

            const revenueHeight =
              (item.revenue / maxValue) * 100;

            const expenseHeight =
              (item.expenses / maxValue) * 100;

            return (
              <div
                key={item.day}
                className="flex-1 h-full flex flex-col justify-end"
              >

                <div className="flex items-end justify-center gap-1 h-full">

                  <div
                    className="w-3 sm:w-6 bg-green-500 rounded-t-md"
                    style={{
                      height: `${revenueHeight}%`,
                    }}
                    title={`Revenue: $${item.revenue}`}
                  />

                  <div
                    className="w-3 sm:w-6 bg-gray-300 rounded-t-md"
                    style={{
                      height: `${expenseHeight}%`,
                    }}
                    title={`Expenses: $${item.expenses}`}
                  />

                </div>

                <div className="text-xs text-gray-500 text-center py-3">
                  {item.day}
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Top products */}
        <div className="bg-white border border-gray-200 rounded-xl">

          <div className="p-6 border-b border-gray-100">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingCart
                  size={20}
                  className="text-green-600"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Products
                </h3>

                <p className="text-sm text-gray-500">
                  Your best-selling products.
                </p>
              </div>

            </div>

          </div>

          <div className="divide-y divide-gray-100">

            {topProducts.map((product, index) => (

              <div
                key={product.name}
                className="flex items-center justify-between p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-semibold text-gray-600">
                    {index + 1}
                  </div>

                  <div>

                    <p className="font-medium text-gray-900">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {product.units} units sold
                    </p>

                  </div>

                </div>

                <p className="font-semibold text-gray-900">
                  ${product.sales.toFixed(2)}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Business insights */}
        <div className="bg-white border border-gray-200 rounded-xl">

          <div className="p-6 border-b border-gray-100">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Business Insights
                </h3>

                <p className="text-sm text-gray-500">
                  Things that need your attention.
                </p>
              </div>

            </div>

          </div>

          <div className="p-6 space-y-4">

            <div className="flex gap-3 p-4 bg-orange-50 rounded-lg">

              <ArrowUpRight
                size={20}
                className="text-orange-600 mt-0.5"
              />

              <div>

                <p className="font-medium text-gray-900">
                  Expenses increased
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Inventory spending is higher than
                  your previous period.
                </p>

              </div>

            </div>

            <div className="flex gap-3 p-4 bg-green-50 rounded-lg">

              <TrendingUp
                size={20}
                className="text-green-600 mt-0.5"
              />

              <div>

                <p className="font-medium text-gray-900">
                  Revenue is trending upward
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Your sales are performing well this week.
                </p>

              </div>

            </div>

            <div className="flex gap-3 p-4 bg-red-50 rounded-lg">

              <ArrowDownRight
                size={20}
                className="text-red-600 mt-0.5"
              />

              <div>

                <p className="font-medium text-gray-900">
                  Outstanding payments
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  Some customers still have balances
                  that need attention.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;