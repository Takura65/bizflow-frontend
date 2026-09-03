import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const StatCard = ({
  title,
  value,
  description,
  trend,
  trendType = "positive",
}) => {
  const isPositive = trendType === "positive";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="text-2xl font-bold text-gray-900 mt-2">
        {value}
      </h3>

      <div className="flex items-center gap-2 mt-3">
        <span
          className={`flex items-center text-sm font-medium ${
            isPositive
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}

          {trend}
        </span>

        <span className="text-xs text-gray-400">
          {description}
        </span>
      </div>
    </div>
  );
};

export default StatCard;