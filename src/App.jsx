import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Customers from "./pages/Customers";
import Payments from "./pages/Payments";
import Expenses from "./pages/Expenses";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<DashboardLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/sales"
            element={<Sales />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/inventory"
            element={<Inventory />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/payments"
            element={<Payments />}
          />

          <Route
            path="/expenses"
            element={<Expenses />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

        </Route>

        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;