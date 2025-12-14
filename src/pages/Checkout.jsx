import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const placeOrder = async () => {
    try {
      await api.post('/orders', {
        items: cart.map(i => ({ product: i._id, name: i.name, price: i.price, qty: i.qty })),
        total
      });
      alert('Order placed successfully');
      localStorage.removeItem('cart');
      navigate('/orders');
    } catch (err) {
      alert('Order failed');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ₹{total}</p>
      <button onClick={placeOrder}>Place Order (Cash on Delivery)</button>
    </div>
  );
}
