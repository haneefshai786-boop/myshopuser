import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

export default function UserLayout() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [showMiniCart, setShowMiniCart] = useState(false);
  const miniCartRef = useRef(null);

  // save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // close minicart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (miniCartRef.current && !miniCartRef.current.contains(e.target)) {
        setShowMiniCart(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // add to cart
  const addToCart = (product) => {
    setCart(prev => {
      const exist = prev.find(p => p._id === product._id);
      if (exist) {
        return prev.map(p =>
          p._id === product._id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const buyNow = () => {
    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }
    alert(`Order placed! Total ₹${totalPrice}`);
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      {/* HEADER */}
      <header style={{
        padding: 12,
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <div>
          <Link to="/" style={{ marginRight: 15 }}>Home</Link>
          <Link to="/vendors">Vendors</Link>
        </div>

        {/* CART */}
        <div style={{ position: 'relative' }}>
          <span
            style={{ cursor: 'pointer', fontWeight: 'bold' }}
            onClick={() => setShowMiniCart(!showMiniCart)}
          >
            Cart ({totalItems})
          </span>

          {showMiniCart && (
            <div
              ref={miniCartRef}
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: '90vw',
                maxWidth: 300,
                background: '#fff',
                border: '1px solid #ccc',
                borderRadius: 6,
                padding: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,.2)',
                zIndex: 1000
              }}
            >
              {cart.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                <>
                  <ul style={{ listStyle: 'none', padding: 0, maxHeight: 200, overflowY: 'auto' }}>
                    {cart.map(item => (
                      <li key={item._id} style={{ marginBottom: 5 }}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <strong>Total: ₹{totalPrice}</strong>
                  <div style={{ marginTop: 8 }}>
                    <button onClick={buyNow} style={{ marginRight: 5 }}>
                      Buy Now
                    </button>
                    <Link to="/cart">
                      <button>View Cart</button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main style={{ padding: 20 }}>
        <Outlet context={{ cart, setCart, addToCart }} />
      </main>
    </div>
  );
}
