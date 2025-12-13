import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';

export default function UserLayout() {
  const [cart, setCart] = useState([]);

  // Add product to cart
  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <header className="header" style={{ padding: '10px 0', borderBottom: '1px solid #ccc' }}>
        <div className="container nav" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Link to="/" style={{ marginRight: 15 }}>Home</Link>
            <Link to="/vendors">Vendors</Link>
          </div>
          <div>
            <Link to="/cart">Cart ({totalItems})</Link>
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: '20px 0' }}>
        {/* Pass cart and addToCart to child pages */}
        <Outlet context={{ cart, addToCart, setCart }} />
      </main>
    </div>
  );
}
