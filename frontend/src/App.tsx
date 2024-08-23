import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import Product from "./pages/products/Product";
import Contact from "./pages/contact/Contact";
import Pricing from "./pages/pricing/Pricing";
import SingleProduct from "./pages/products/product-detail";
import RegisterPage from "./pages/register/register-page";
import Login from "./pages/login/login";
import NotFound from "./pages/not-found/not-found";
import Dashboard from "./pages/dashboard/dashboard";

// 
import AuthLayout from "./layout/auth-layout/auth";
import DefaultLayout from "./layout/default/default";
import AddProductForm from "./pages/dashboard/product/add-product";
import GetProduct from "./pages/dashboard/product/get-product";
import CategoryPage from "./pages/dashboard/category/get-category";
import OrderPage from "./pages/dashboard/orders/get-order";
import CustomerPage from "./pages/dashboard/customers/get-customer";
import UpdateProductPage from "./pages/dashboard/product/update-product/update-product";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />

        {/* Default Layout */}
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Product />} />
          <Route path="/products/:id" element={<SingleProduct />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<Login />} />
        </Route>


        {/* Authentication layout */}
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* product */}
          <Route path="/dashboard/products" element={<GetProduct />} />
          <Route path="/dashboard/add-product" element={<AddProductForm />} />
          <Route path="/dashboard/update-product/:id" element={<UpdateProductPage />} />

          {/* category */}
          <Route path="/dashboard/category" element={<CategoryPage />} />

          {/* Orders */}
          <Route path="/dashboard/orders" element={<OrderPage />} />

          {/* customers */}
          <Route path="/dashboard/customers" element={<CustomerPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App