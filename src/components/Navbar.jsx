import { Bell, Search, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      
      <div className="flex items-center gap-3 w-96">
        <Search size={20} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full outline-none text-sm"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell size={21} className="text-gray-600" />

          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
            <User size={18} className="text-green-700" />
          </div>

          <div>
            <p className="text-sm font-medium">
              Business Owner
            </p>

            <p className="text-xs text-gray-500">
              Admin
            </p>
          </div>
        </div>
      </div>

    </header>
  );
};

export default Navbar;