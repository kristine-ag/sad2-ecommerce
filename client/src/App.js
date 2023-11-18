import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Supplier from "./pages/Supplier";
import AddSupplier from "./pages/AddSupplier";
import UpdateSupplier from "./pages/UpdateSupplier";
import PurchaseOrder from "./pages/PurchaseOrder";
import AddPurchaseOrder from "./pages/AddPurchaseOrder";
import UpdatePurchaseOrder from "./pages/UpdatePurchaseOrder";
import Reward from "./pages/Reward";
import AddReward from "./pages/AddReward";
import UpdateReward from "./pages/UpdateReward";
import Customer from "./pages/Customer";
import AddCustomer from "./pages/AddCustomer";
import UpdateCustomer from "./pages/UpdateCustomer";
import Order from "./pages/Order";
import AddOrder from "./pages/AddOrder";
import UpdateOrder from "./pages/UpdateOrder";
import Category from "./pages/Category";
import Layout from "./components/Layout";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <Layout onLogout={handleLogout}>
          <Routes>
            <Route path="/products" element={<Product />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/products/update/:id" element={<UpdateProduct />} />

            <Route path="/customers" element={<Customer />} />
            <Route path="/customers/add" element={<AddCustomer />} />
            <Route path="/customers/update/:id" element={<UpdateCustomer />} />

            <Route path="/suppliers" element={<Supplier />} />
            <Route path="/suppliers/add" element={<AddSupplier />} />
            <Route path="/suppliers/update/:id" element={<UpdateSupplier />} />

            <Route path="/categories" element={<Category />} />

            <Route path="/purchaseorders" element={<PurchaseOrder />} />
            <Route path="/purchaseorders/add" element={<AddPurchaseOrder />} />
            <Route path="/purchaseorders/update/:id" element={<UpdatePurchaseOrder />}
            />

            <Route path="/orders" element={<Order />} />
            <Route path="/orders/add" element={<AddOrder />} />
            <Route path="/orders/update/:id" element={<UpdateOrder />} />

            <Route path="/rewards" element={<Reward />} />
            <Route path="/rewards/add" element={<AddReward />} />
            <Route path="/rewards/update/:id" element={<UpdateReward />} />
          </Routes>
        </Layout>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </BrowserRouter>
  );
}

export default App;
