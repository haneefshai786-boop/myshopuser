import { Routes, Route } from 'react-router-dom';
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
    <Routes>
      {/* Public auth */}
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
  );
}
