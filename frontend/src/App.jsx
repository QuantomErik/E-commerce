import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import ProductCard from "./components/ProductCard/ProductCard";
/* import Products from "./components/Products/Products"; */
import CheckoutPage from "./components/Checkout/CheckoutPage";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { CartProvider } from "./components/Cart/CartContext";
import SuccessPage from "./components/Success/SuccessPage";
import Footer from "./components/Footer/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import { AuthProvider } from "./components/Auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import YourAccount from "./components/YourAccount/YourAccount";
import YourOrders from "./components/YourOrders/YourOrders";
import BuyAgain from "./components/BuyAgain/BuyAgain";
import YourAddresses from "./components/YourAddresses/YourAddresses";
import ContactUs from "./components/ContactUs/ContactUs";
import GiftCards from "./components/GiftCards/GiftCards";
import CartDrawer from "./components/Cart/CartDrawer";
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';

library.add(faShoppingCart, faUser);

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const openCartDrawer = () => {
    setIsCartDrawerOpen(true);
  };

  const closeCartDrawer = () => {
    setIsCartDrawerOpen(false);
  };

  return (
    <BrowserRouter basename="/ecommerce/">
      <AuthProvider>
        <CartProvider>
          <div className="app-container">
            <Navbar />
            <div className="content">
              <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/" element={<Home onOpenCartDrawer={openCartDrawer} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/success" element={<SuccessPage />} />

                <Route path="/your-account" element={<ProtectedRoute><YourAccount /></ProtectedRoute>} />
                {/* <Route path="/your-orders" element={<ProtectedRoute><YourOrders /></ProtectedRoute>} /> */}
                {/* <Route path="/productcard" element={<ProtectedRoute><ProductCard onOpenCartDrawer={openCartDrawer} /></ProtectedRoute>} /> */}
                <Route path="/your-orders" element={<ProtectedRoute><YourOrders onOpenCartDrawer={openCartDrawer} /></ProtectedRoute>} />
                {/* <Route path="/buy-again" element={<ProtectedRoute><BuyAgain /></ProtectedRoute>} /> */}
                <Route path="/buy-again" element={<ProtectedRoute><BuyAgain onOpenCartDrawer={openCartDrawer} /></ProtectedRoute>} />

                <Route path="/your-addresses" element={<ProtectedRoute><YourAddresses /></ProtectedRoute>} />
                <Route path="/contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
                <Route path="/gift-cards" element={<ProtectedRoute><GiftCards /></ProtectedRoute>} />


                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <ScrollToTopButton />
            <Footer />
            <CartDrawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} />
          </div>
          <ToastContainer position="bottom-center" autoClose={1500} hideProgressBar />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
