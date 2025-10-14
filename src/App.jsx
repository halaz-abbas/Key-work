import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./features/home/pages/Home";
import ProductList from "./features/products/pages/ProductList";
import "./App.css";
import LayoutContainer from "./shared/layout/layout-container";
import Cart from "./features/cart/pages/Cart";
import SignUp from "./features/auth/components/signup/SignUp";
import Login from "./features/auth/pages/Login";
import { Toaster } from "react-hot-toast";
import CheckoutPage from "./features/checkout/pages/CheckoutPage";
import ContactPage from "./features/contact/pages/ContactPages";
import ProductDetails from "./features/productdetails/pages/ProductDetails";
import WishList from "./features/wishlist/pages/WishList";
import AboutPage from "./features/about/pages/AboutPage";
import ScrollToTop from "./shared/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LayoutContainer>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/det" element={<ProductDetails />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </LayoutContainer>
    </BrowserRouter>
  );
}

export default App;
