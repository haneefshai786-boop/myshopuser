import { useEffect, useState } from 'react';
import api from '../api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders/my').then(res => setOrders(res.data));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(o => (
        <div key={o._id} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <p>Order ID: {o._id}</p>
          <p>Total: ₹{o.total}</p>
          <ul>
            {o.items.map(i => (
              <li key={i._id}>{i.name} × {i.qty} = ₹{i.price * i.qty}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
