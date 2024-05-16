import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./layout/Header";

import Home from "./pages/Home/Home";
import Product from "./pages/products/Product";
import Contact from "./pages/contact/Contact";
import Pricing from "./pages/pricing/Pricing";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </Router>
  );
}

export default App