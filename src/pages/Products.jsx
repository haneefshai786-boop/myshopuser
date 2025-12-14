import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';


export default function Products() {
const { vendorId, categoryId, subcategoryId } = useParams();
const [products, setProducts] = useState([]);


useEffect(() => {
api.get('/products').then(res => {
const filtered = res.data.filter(p =>
p.vendor._id === vendorId &&
p.category._id === categoryId &&
p.subcategory._id === subcategoryId
);
setProducts(filtered);
});
}, [vendorId, categoryId, subcategoryId]);


const addToCart = p => {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const exists = cart.find(i => i._id === p._id);
if (exists) exists.qty += 1;
else cart.push({ ...p, qty:1 });
localStorage.setItem('cart', JSON.stringify(cart));
alert('Added to cart');
};


return (
<div>
<h1>Products</h1>
{products.map(p => (
<div key={p._id} style={{ margin:10, padding:10, border:'1px solid #ccc' }}>
<h3>{p.name}</h3>
<p>₹{p.price}</p>
<Link to={`/product/${p._id}`}>View Details</Link>
<button onClick={() => addToCart(p)} style={{ marginLeft:10 }}>Add to Cart</button>
</div>
))}
</div>
);
}
