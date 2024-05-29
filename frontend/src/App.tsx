import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./layout/Header";

import Home from "./pages/Home/Home";
import Product from "./pages/products/Product";
import Contact from "./pages/contact/Contact";
import Pricing from "./pages/pricing/Pricing";
import SingleProduct from "./pages/products/product-detail";
import RegisterPage from "./pages/register/register-page";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Product />} />
        <Route path="/products/:id" element={<SingleProduct />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}




      </Routes>
    </Router>
  );
}

export default App