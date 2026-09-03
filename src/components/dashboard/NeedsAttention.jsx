import {
  AlertTriangle,
  CreditCard,
  Package,
  ChevronRight,
} from "lucide-react";

const NeedsAttention = () => {
  const items = [
    {
      icon: Package,
      title: "Low stock",
      description: "7 products need restocking",
      type: "warning",
    },
    {
      icon: CreditCard,
      title: "Outstanding balances",
      description: "3 customers owe $280",
      type: "danger",
    },
    {
      icon: AlertTriangle,
      title: "Pending orders",
      description: "2 orders need attention",
      type: "info",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-gray-900">
          Needs Attention
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Things that may need your attention today
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icon
                  size={20}
                  className="text-gray-600"
                />
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {item.title}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {item.description}
                </p>
              </div>

              <ChevronRight
                size={18}
                className="text-gray-400"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NeedsAttention;