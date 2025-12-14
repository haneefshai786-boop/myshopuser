import { useEffect, useState } from 'react';
import api from '../api.js';


export default function MyOrders() {
const [orders, setOrders] = useState([]);


useEffect(() => {
api.get('/orders/my').then(res => setOrders(res.data));
}, []);


return (
<div>
<h2>My Orders</h2>
{orders.map(o => (
<div key={o._id} style={{ border:'1px solid #ccc', padding:10, margin:5 }}>
<p>Order ID: {o._id}</p>
<p>Total: ₹{o.total}</p>
<p>Items:</p>
<ul>
{o.items.map(i => <li key={i._id}>{i.name} x{i.qty}</li>)}
</ul>
</div>
))}
</div>
);
}
