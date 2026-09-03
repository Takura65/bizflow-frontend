
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatCard from "../components/dashboard/StatCard";
import SalesOverview from "../components/dashboard/SalesOverview";
import NeedsAttention from "../components/dashboard/NeedsAttention";
import RecentSales from "../components/dashboard/RecentSales";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Good morning 👋
          </h2>

          <p className="text-gray-500 mt-1">
            Here's what's happening with your business today.
          </p>
        </div>

       <button
  onClick={() => navigate("/sales/new")}
  className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-lg transition"
>
          New Sale
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Today's Sales"
          value="$1,240"
          trend="+12.5%"
          description="vs yesterday"
          trendType="positive"
        />

        <StatCard
          title="Today's Profit"
          value="$420"
          trend="+8.2%"
          description="vs yesterday"
          trendType="positive"
        />

        <StatCard
          title="Customers Owe"
          value="$280"
          trend="3"
          description="customers"
          trendType="negative"
        />

        <StatCard
          title="Low Stock"
          value="7"
          trend="View"
          description="inventory"
          trendType="negative"
        />

      </div>

      {/* Chart + Attention */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <SalesOverview />
        </div>

        <NeedsAttention />

      </div>

      {/* Recent Sales */}
      <RecentSales />

    </div>
  );
};

export default Dashboard;