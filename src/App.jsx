mport { Routes, Route } from 'react-router-dom';

import UserLayout from './layout/UserLayout.jsx';
import Home from './pages/Home.jsx';
import Vendors from './pages/Vendors.jsx';
import Categories from './pages/Categories.jsx';
import Subcategories from './pages/Subcategories.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Checkout from './pages/Checkout.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="vendors" element={<Vendors />} />
        <Route path="vendors/:vendorId" element={<Categories />} >
        <Route path="vendors/:vendorId/categories/:categoryId" el>
        <Route path="vendors/:vendorId/categories/:categoryId/sub>
        <Route path="product/:productId" element={<ProductDetail >
        <Route path="cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
