import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);

  const removeItem = (id) => {
    const updated = cart.filter(i => i._id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item._id}>
          <h4>{item.name}</h4>
          <p>Qty: {item.qty} × ₹{item.price}</p>
          <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ₹{total}</h3>
      {cart.length > 0 && <button onClick={() => navigate('/checkout')}>Checkout</button>}
      <br />
      <Link to="/">← Back to Home</Link>
    </div>
  );
}
