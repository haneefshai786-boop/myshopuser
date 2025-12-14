import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';


export default function ProductDetail() {
const { productId } = useParams();
const [product, setProduct] = useState(null);


useEffect(() => {
api.get(`/products/${productId}`).then(res => setProduct(res.data));
}, [productId]);


const addToCart = () => {
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const exists = cart.find(i => i._id === product._id);
if (exists) exists.qty +=1;
else cart.push({...product, qty:1});
localStorage.setItem('cart', JSON.stringify(cart));
alert('Added to cart');
};


if (!product) return <p>Loading...</p>;


return (
<div>
<h2>{product.name}</h2>
<p>Price: ₹{product.price}</p>
<p>Vendor: {product.vendor.name}</p>
<p>Category: {product.category.name}</p>
{product.subcategory && <p>Subcategory: {product.subcategory.name}</p>}
<button onClick={addToCart}>Add to Cart</button>
<br />
<Link to={`/vendors/${product.vendor._id}/categories/${product.category._id}/sub/${product.subcategory?._id}`}>Back to Products</Link>
</div>
);
}
