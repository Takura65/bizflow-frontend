import { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Chicken Meal",
    category: "Food",
    price: 5,
    stock: 24,
  },
  {
    id: 2,
    name: "Beef Meal",
    category: "Food",
    price: 6,
    stock: 18,
  },
  {
    id: 3,
    name: "Cooking Oil",
    category: "Grocery",
    price: 8,
    stock: 12,
  },
  {
    id: 4,
    name: "Rice 2kg",
    category: "Grocery",
    price: 4.5,
    stock: 20,
  },
  {
    id: 5,
    name: "Black T-Shirt",
    category: "Clothing",
    price: 20,
    stock: 8,
  },
  {
    id: 6,
    name: "Blue Jeans",
    category: "Clothing",
    price: 35,
    stock: 5,
  },
];

const NewSale = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                ),
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + 1,
                item.stock
              ),
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cart]);

  const total = subtotal;

  const paid = Number(amountPaid) || 0;

  const balance = Math.max(total - paid, 0);

  const change = Math.max(paid - total, 0);

  const handleCompleteSale = () => {
    if (cart.length === 0) return;

    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    navigate("/sales");
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to="/sales"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-3"
          >
            <ArrowLeft size={17} />
            Back to Sales
          </Link>

          <h2 className="text-3xl font-bold text-gray-900">
            New Sale
          </h2>

          <p className="text-gray-500 mt-1">
            Add products and record a customer payment.
          </p>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Products */}
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl p-6">

          <div className="flex flex-col sm:flex-row gap-4 mb-6">

            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShoppingCart size={18} />

              {cart.reduce(
                (total, item) => total + item.quantity,
                0
              )}{" "}
              items
            </div>

          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => addToCart(product)}
                className="text-left border border-gray-200 rounded-xl p-4 hover:border-green-500 hover:shadow-sm transition"
              >
                <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart
                    size={28}
                    className="text-gray-400"
                  />
                </div>

                <h3 className="font-semibold text-gray-900">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {product.category}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>

                  <span className="text-xs text-gray-500">
                    {product.stock} in stock
                  </span>
                </div>
              </button>
            ))}

          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Search
                size={32}
                className="mx-auto text-gray-300"
              />

              <p className="text-gray-500 mt-3">
                No products found.
              </p>
            </div>
          )}

        </div>

        {/* Sale summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit">

          <h3 className="text-lg font-semibold text-gray-900">
            Sale Summary
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Review the sale before completing it.
          </p>

          {/* Customer */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer name
            </label>

            <input
              type="text"
              placeholder="Walk-in customer"
              value={customerName}
              onChange={(e) =>
                setCustomerName(e.target.value)
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Cart */}
          <div className="mt-6 space-y-3 max-h-64 overflow-y-auto">

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart
                  size={30}
                  className="mx-auto text-gray-300"
                />

                <p className="text-sm text-gray-500 mt-2">
                  No products added yet.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-100 pb-3"
                >
                  <div className="flex items-start justify-between gap-3">

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                  <div className="flex items-center justify-between mt-3">

                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="p-1.5 hover:bg-gray-100"
                      >
                        <Minus size={15} />
                      </button>

                      <span className="px-3 text-sm">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="p-1.5 hover:bg-gray-100"
                      >
                        <Plus size={15} />
                      </button>
                    </div>

                    <span className="font-medium text-sm">
                      $
                      {(item.price * item.quantity).toFixed(
                        2
                      )}
                    </span>

                  </div>
                </div>
              ))
            )}

          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 mt-5 pt-5 space-y-3">

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Subtotal
              </span>

              <span className="font-medium">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>

              <span>
                ${total.toFixed(2)}
              </span>
            </div>

          </div>

          {/* Payment */}
          <div className="mt-6">

            <p className="text-sm font-medium text-gray-700 mb-3">
              Payment method
            </p>

            <div className="grid grid-cols-2 gap-2">

              {[
                ["cash", "Cash"],
                ["mobile", "Mobile Money"],
                ["credit", "Credit"],
                ["partial", "Partial"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() =>
                    setPaymentMethod(value)
                  }
                  className={`border rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    paymentMethod === value
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              ))}

            </div>

          </div>

          {/* Amount paid */}
          {paymentMethod !== "credit" && (
            <div className="mt-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount paid
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={amountPaid}
                onChange={(e) =>
                  setAmountPaid(e.target.value)
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-green-500"
              />

            </div>
          )}

          {/* Payment calculation */}
          {cart.length > 0 && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4 space-y-2 text-sm">

              {paymentMethod === "credit" ? (
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Amount owed
                  </span>

                  <span className="font-semibold text-red-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Paid
                    </span>

                    <span>
                      ${paid.toFixed(2)}
                    </span>
                  </div>

                  {balance > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Balance
                      </span>

                      <span className="font-semibold text-red-600">
                        ${balance.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {change > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">
                        Change
                      </span>

                      <span className="font-semibold text-green-600">
                        ${change.toFixed(2)}
                      </span>
                    </div>
                  )}
                </>
              )}

            </div>
          )}

          {/* Complete sale */}
          <button
            onClick={handleCompleteSale}
            disabled={cart.length === 0}
            className="w-full mt-5 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
          >
            Complete Sale
          </button>

        </div>

      </div>

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">

            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2
                size={34}
                className="text-green-600"
              />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mt-5">
              Sale recorded!
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              The sale has been successfully recorded.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mt-5">
              <div className="flex justify-between">
                <span className="text-gray-500">
                  Total
                </span>

                <span className="font-bold">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between mt-2">
                <span className="text-gray-500">
                  Payment
                </span>

                <span className="font-medium capitalize">
                  {paymentMethod === "mobile"
                    ? "Mobile Money"
                    : paymentMethod}
                </span>
              </div>
            </div>

            <button
              onClick={closeSuccess}
              className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            >
              Done
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default NewSale;