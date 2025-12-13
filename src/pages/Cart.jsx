import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Toast from '../components/Toast.jsx';

export default function Cart() {
  const { cart, setCart } = useOutletContext();
  const [toastMessage, setToastMessage] = useState('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    setToastMessage('Quantity increased');
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map(item =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    setToastMessage('Quantity decreased');
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item._id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    setToastMessage('Item removed from cart');
  };

  const handleBuyNow = () => {
    if (cart.length === 0) {
      setToastMessage('Cart is empty!');
      return;
    }
    setToastMessage(`Order placed! Total: ₹${total}`);
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map(item => (
              <li key={item._id} style={{ marginBottom: 10, borderBottom: '1px solid #ccc', paddingBottom: 5 }}>
                <strong>{item.name}</strong> x {item.quantity} - ₹{item.price * item.quantity}
                <div style={{ marginTop: 5 }}>
                  <button onClick={() => increaseQty(item._id)} style={{ marginRight: 5 }}>+</button>
                  <button onClick={() => decreaseQty(item._id)} style={{ marginRight: 5 }}>-</button>
                  <button onClick={() => removeItem(item._id)} style={{ color: 'red' }}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
          <button
            onClick={handleBuyNow}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              cursor: 'pointer',
              marginTop: 10
            }}
          >
            Buy Now
          </button>
        </div>
      )}

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
    </div>
  );
}
