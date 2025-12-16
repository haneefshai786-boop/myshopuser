import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserPrivateRoute from "./components/UserPrivateRoute";

import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <UserPrivateRoute>
              <Products />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <UserPrivateRoute>
              <Cart />
            </UserPrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <UserPrivateRoute>
              <Orders />
            </UserPrivateRoute>
          }
        />
      </Routes>
    </>
  );
          }
