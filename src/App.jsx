import { Routes, Route } from 'react-router-dom';
import UserLayout from './layout/UserLayout.jsx';
import Home from './pages/Home.jsx';
import Vendors from './pages/Vendors.jsx';
import Categories from './pages/Categories.jsx';
import Subcategories from './pages/Subcategories.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        
        {/* HOME */}
        <Route index element={<Home />} />

        {/* FOLDER LEVEL */}
        <Route path="vendors/:type" element={<Vendors />} />

        {/* FLOW */}
        <Route path="vendors/:vendorId/categories" element={<Categories />} />
        <Route path="vendors/:vendorId/categories/:categoryId" element={<Subcategories />} />
        <Route path="vendors/:vendorId/categories/:categoryId/sub/:subId" element={<Products />} />

        {/* PRODUCT & CART */}
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />

      </Route>
    </Routes>
  );
}
