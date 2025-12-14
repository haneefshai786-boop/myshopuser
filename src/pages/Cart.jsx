import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Cart() {
const [cart, setCart] = useState([]);
const navigate = useNavigate();


useEffect(() => {
setCart(JSON.parse(localStorage.getItem('cart')) || []);
}, []);


const total = cart.reduce((s,i)=>s+i.price*i.qty,0);


return (
<div>
<h2>Cart</h2>
{cart.map(item => (
<div key={item._id} style={{ border:'1px solid #ccc', padding:10, margin:5 }}>
<h4>{item.name}</h4>
<p>Qty: {item.qty}</p>
<p>Price: ₹{item.price}</p>
</div>
))}
<p>Total: ₹{total}</p>
<button onClick={() => navigate('/checkout')}>Checkout</button>
</div>
);
}
