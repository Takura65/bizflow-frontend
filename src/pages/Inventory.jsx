import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Box,
  Eye,
  PackagePlus,
  Plus,
  Search,
} from "lucide-react";

const inventoryData = [
  {
    id: 1,
    name: "Chicken Meal",
    category: "Food",
    price: 5,
    stock: 8,
    unit: "portions",
    reorderLevel: 10,
  },
  {
    id: 2,
    name: "Rice 2kg",
    category: "Grocery",
    price: 4.5,
    stock: 3,
    unit: "bags",
    reorderLevel: 5,
  },
  {
    id: 3,
    name: "Black T-Shirt",
    category: "Clothing",
    price: 15,
    stock: 12,
    unit: "pieces",
    reorderLevel: 5,
  },
  {
    id: 4,
    name: "Cooking Oil 2L",
    category: "Grocery",
    price: 8,
    stock: 0,
    unit: "bottles",
    reorderLevel: 5,
  },
  {
    id: 5,
    name: "Beef Meal",
    category: "Food",
    price: 6,
    stock: 6,
    unit: "portions",
    reorderLevel: 8,
  },
  {
    id: 6,
    name: "Blue Jeans",
    category: "Clothing",
    price: 35,
    stock: 4,
    unit: "pieces",
    reorderLevel: 3,
  },
  {
    id: 7,
    name: "Tomatoes",
    category: "Food",
    price: 3,
    stock: 2,
    unit: "kg",
    reorderLevel: 5,
  },
  {
    id: 8,
    name: "Sugar 2kg",
    category: "Grocery",
    price: 3.5,
    stock: 15,
    unit: "bags",
    reorderLevel: 5,
  },
];

const Inventory = () => {
  const [products, setProducts] = useState(inventoryData);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const totalItems = products.length;

  const inStock = products.filter(
    (product) => product.stock > product.reorderLevel
  ).length;

  const lowStock = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= product.reorderLevel
  ).length;

  const outOfStock = products.filter(
    (product) => product.stock === 0
  ).length;

  const getStockStatus = (product) => {
    if (product.stock === 0) {
      return "Out of Stock";
    }

    if (product.stock <= product.reorderLevel) {
      return "Low Stock";
    }

    return "In Stock";
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        product.category === categoryFilter;

      const status = getStockStatus(product);

      const matchesStock =
        stockFilter === "All" ||
        status === stockFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });
  }, [products, search, categoryFilter, stockFilter]);

  const handleStockAdjustment = (amount) => {
    if (!selectedProduct) return;

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === selectedProduct.id
          ? {
              ...product,
              stock: Math.max(
                0,
                product.stock + amount
              ),
            }
          : product
      )
    );

    setSelectedProduct((current) => ({
      ...current,
      stock: Math.max(
        0,
        current.stock + amount
      ),
    }));
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Inventory
          </h2>

          <p className="text-gray-500 mt-1">
            Manage your products and keep track of stock.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2.5 rounded-lg transition"
        >
          <Plus size={19} />
          Add Product
        </button>

      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Total Items
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-2">
            {totalItems}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Products in inventory
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            In Stock
          </p>

          <h3 className="text-2xl font-bold text-green-600 mt-2">
            {inStock}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Healthy stock levels
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Low Stock
          </p>

          <h3 className="text-2xl font-bold text-yellow-600 mt-2">
            {lowStock}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Need restocking soon
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Out of Stock
          </p>

          <h3 className="text-2xl font-bold text-red-600 mt-2">
            {outOfStock}
          </h3>

          <p className="text-xs text-gray-400 mt-2">
            Currently unavailable
          </p>
        </div>

      </div>

      {/* Low stock alert */}
      {lowStock + outOfStock > 0 && (
        <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">

          <AlertTriangle
            size={20}
            className="text-yellow-600 mt-0.5"
          />

          <div>
            <h3 className="font-semibold text-yellow-800">
              Stock needs attention
            </h3>

            <p className="text-sm text-yellow-700 mt-1">
              {lowStock + outOfStock} product
              {lowStock + outOfStock !== 1 ? "s" : ""}
              {" "}need restocking.
            </p>
          </div>

        </div>
      )}

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">

        <div className="flex flex-col lg:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
            />

          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">
              All Categories
            </option>

            <option value="Food">
              Food
            </option>

            <option value="Grocery">
              Grocery
            </option>

            <option value="Clothing">
              Clothing
            </option>
          </select>

          {/* Stock */}
          <select
            value={stockFilter}
            onChange={(e) =>
              setStockFilter(e.target.value)
            }
            className="border border-gray-200 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="All">
              All Stock
            </option>

            <option value="In Stock">
              In Stock
            </option>

            <option value="Low Stock">
              Low Stock
            </option>

            <option value="Out of Stock">
              Out of Stock
            </option>
          </select>

        </div>

      </div>

      {/* Inventory table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">

        <div className="p-6 border-b border-gray-100">

          <h3 className="text-lg font-semibold text-gray-900">
            Products
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
            {" "}found
          </p>

        </div>

        {filteredProducts.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-gray-100 text-left">

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Product
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Category
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Price
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Stock
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-3 font-medium text-gray-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredProducts.map((product) => {

                  const status =
                    getStockStatus(product);

                  return (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                            <Box
                              size={19}
                              className="text-gray-500"
                            />
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {product.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              SKU-{String(product.id).padStart(4, "0")}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {product.category}
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                      </td>

                      <td className="px-6 py-4">

                        <span className="font-semibold text-gray-900">
                          {product.stock}
                        </span>

                        <span className="text-gray-400 ml-1">
                          {product.unit}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                            status === "In Stock"
                              ? "bg-green-100 text-green-700"
                              : status === "Low Stock"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <button
                          onClick={() =>
                            setSelectedProduct(product)
                          }
                          className="inline-flex items-center gap-1.5 text-gray-500 hover:text-green-600 font-medium"
                        >
                          <Eye size={16} />
                          View
                        </button>

                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="text-center py-16">

            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <Box
                size={22}
                className="text-gray-400"
              />
            </div>

            <h3 className="font-semibold text-gray-900 mt-4">
              No products found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filters.
            </p>

          </div>

        )}

      </div>

      {/* Product details modal */}
      {selectedProduct && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl max-w-md w-full">

            <div className="p-6 border-b border-gray-100 flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Product
                </p>

                <h3 className="text-xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h3>

              </div>

              <button
                onClick={() =>
                  setSelectedProduct(null)
                }
                className="text-gray-400 hover:text-gray-700 text-2xl"
              >
                ×
              </button>

            </div>

            <div className="p-6 space-y-5">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Category
                </span>

                <span className="font-medium">
                  {selectedProduct.category}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Selling Price
                </span>

                <span className="font-bold">
                  ${selectedProduct.price.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Current Stock
                </span>

                <span className="font-bold">
                  {selectedProduct.stock}{" "}
                  {selectedProduct.unit}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Reorder Level
                </span>

                <span className="font-medium">
                  {selectedProduct.reorderLevel}{" "}
                  {selectedProduct.unit}
                </span>
              </div>

              {/* Stock adjustment */}
              <div className="border-t border-gray-100 pt-5">

                <p className="text-sm font-medium text-gray-700 mb-3">
                  Adjust Stock
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      handleStockAdjustment(-1)
                    }
                    className="flex-1 border border-gray-200 hover:bg-gray-50 py-2.5 rounded-lg font-medium"
                  >
                    − Remove 1
                  </button>

                  <button
                    onClick={() =>
                      handleStockAdjustment(1)
                    }
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium"
                  >
                    + Add 1
                  </button>

                </div>

              </div>

            </div>

            <div className="p-6 border-t border-gray-100">

              <button
                onClick={() =>
                  setSelectedProduct(null)
                }
                className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg"
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

export default Inventory;