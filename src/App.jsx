// src/App.jsx
import { Routes, Route, Link } from 'react-router-dom';
import UserLayout from './layout/UserLayout.jsx';
import UserPrivateRoute from './components/UserPrivateRoute.jsx';

import Home from './pages/Home.jsx';
import Categories from './pages/Categories.jsx';
import Subcategories from './pages/Subcategories.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import MyOrders from './pages/MyOrders.jsx';
import UserLogin from './pages/UserLogin.jsx';
import Register from './pages/Register.jsx';

export default function App() {
  return (
    <>
      {/* Simple nav links */}
      <nav style={{ padding: 10, background: '#f0f0f0', marginBottom: 20 }}>
        <Link to="/" style={{ marginRight: 15 }}>Home</Link>
        <Link to="/cart" style={{ marginRight: 15 }}>Cart</Link>
        <Link to="/login" style={{ marginRight: 15 }}>Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        {/* Public auth pages */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />

        {/* Public pages */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="vendors/:vendorId/categories/:categoryId/sub/:subcategoryId" element={<Products />} />
          <Route path="product/:productId" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
        </Route>

        {/* Protected pages */}
        <Route element={<UserPrivateRoute />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<MyOrders />} />
        </Route>
      </Routes>
    </>
  );
}
