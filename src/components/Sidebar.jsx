import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  CreditCard,
  Receipt,
  BarChart3,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Sales",
      path: "/sales",
      icon: ShoppingCart,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: Receipt,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: Package,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: CreditCard,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: Receipt,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 p-5">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-green-600">
          BizFlow
        </h1>

        <p className="text-sm text-gray-500">
          Business management
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-green-100 text-green-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;