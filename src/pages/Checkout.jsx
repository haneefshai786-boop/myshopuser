
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart')) || [];
    if (stored.length === 0) {
      navigate('/');
    }
    setCart(stored);
  }, [navigate]);

  const total = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  async function placeOrder() {
    if (!address.trim()) {
      alert('Please enter delivery address');
      return;
    }

    setLoading(true);

    const order = {
      items: cart.map(i => ({
        product: i._id,
        name: i.name,
        price: i.price,
        qty: i.qty,
      })),
      total,
      address,
      paymentMethod: 'COD'
    };

    try {
      await api.post('/orders', order);
      localStorage.removeItem('cart');
      alert('Order placed successfully');
      navigate('/');
    } catch (err) {
      alert('Order failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Checkout</h2>

      <h3>Order Summary</h3>
      {cart.map(i => (
        <p key={i._id}>
          {i.name} × {i.qty} = ₹{i.price * i.qty}
        </p>
      ))}

      <h3>Total: ₹{total}</h3>

      <h3>Delivery Address</h3>
      <textarea
        rows="4"
        style={{ width: '100%', marginBottom: 15 }}
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Enter full delivery address"
      />

      <h3>Payment Method</h3>
      <p>Cash on Delivery (Online payment coming soon)</p>

      <button onClick={placeOrder} disabled={loading}>
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
      }
