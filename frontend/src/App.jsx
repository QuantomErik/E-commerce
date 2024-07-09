import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Home from "./components/Home/Home"
import NotFound from "./components/NotFound/NotFound"
import Navbar from "./components/Navbar/Navbar"
import Products from "./components/Products/Products"
import CheckoutPage from "./components/Checkout/CheckoutPage";
/* import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx" */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { CartProvider } from "./components/Cart/CartContext"
/* import CartPage from './components/Cart/CartPage'; */
import SuccessPage from "./components/Success/SuccessPage"
import Footer from "./components/Footer/Footer"
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton"


library.add(faShoppingCart, faUser);


function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {


  
  return (
    <CartProvider>
    <BrowserRouter>
    <Navbar />
      <Routes>
        
        {/* <Route path="/"element={<ProtectedRoute><Home /></ProtectedRoute>}/> */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<Products />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<RegisterAndLogout />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ScrollToTopButton />
      <Footer />
    </BrowserRouter>
    </CartProvider>
  )
}

export default App