import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

export default function Products() {
  const { vendorId, categoryId, subcategoryId } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(res => {
      const filtered = res.data.filter(p =>
        String(p.vendor._id) === vendorId &&
        String(p.category._id) === categoryId &&
        String(p.subcategory._id) === subcategoryId
      );
      setProducts(filtered);
    });
  }, [vendorId, categoryId, subcategoryId]);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(i => i._id === product._id);
    if (exists) exists.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 15 }}>
        {products.map(p => (
          <div key={p._id} style={{ padding: 15, border: '1px solid #ccc', borderRadius: 8 }}>
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <Link to={`/product/${p._id}`}>View Details</Link>
            <br />
            <button onClick={() => addToCart(p)} style={{ marginTop: 10 }}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
