import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

export default function UserLayout() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [showMiniCart, setShowMiniCart] = useState(false);
  const miniCartRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Close mini cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (miniCartRef.current && !miniCartRef.current.contains(event.target)) {
        setShowMiniCart(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [miniCartRef]);

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
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBuyNow = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }
    alert(`Order placed! Total: ₹${totalPrice}`);
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      <header style={{ padding: 10, borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <Link to="/" style={{ marginRight: 15 }}>Home</Link>
          <Link to="/vendors">Vendors</Link>
        </div>
        <div style={{ position: 'relative' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setShowMiniCart(!showMiniCart)}>
            Cart ({totalItems})
          </span>

          {showMiniCart && (
            <div ref={miniCartRef} style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '90vw',
              maxWidth: 300,
              background: 'white',
              border: '1px solid #ccc',
              borderRadius: 5,
              padding: 10,
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              zIndex: 1000,
              opacity: showMiniCart ? 1 : 0,
              transform: showMiniCart ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'opacity 0.3s, transform 0.3s'
            }}>
              {cart.length === 0 ? (
                <p style={{ margin: 0 }}>Cart is empty</p>
              ) : (
                <div>
                  <ul style={{ listStyle: 'none', padding: 0, maxHeight: 200, overflowY: 'auto' }}>
                    {cart.map(item => (
                      <li key={item._id} style={{ borderBottom: '1px solid #eee', padding: '5px 0' }}>
                        {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                  <h4>Total: ₹{totalPrice}</h4>
                  <button
                    onClick={handleBuyNow}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: 5,
                      cursor: 'pointer',
                      marginRight: 5
                    }}
                  >
                    Buy Now
                  </button>
                  <Link to="/cart">
                    <button style={{
                      padding: '5px 10px',
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: 5,
                      cursor: 'pointer'
                    }}>
                      Go to Cart
                    </button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <main style={{ padding: '20px 0' }}>
        <Outlet context={{ cart, addToCart, setCart }} />
      </main>
    </div>
  );
}
