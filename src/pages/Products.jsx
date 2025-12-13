import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';

export default function Products() {
  const { vendorId, categoryId, subId } = useParams();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    api.get('/products')
      .then(res => {
        const filtered = res.data.filter(p =>
          String(p.vendor._id) === vendorId &&
          (categoryId ? String(p.category._id) === categoryId : true) &&
          (subId ? String(p.subcategory._id) === subId : true)
        );
        setProducts(filtered);
      })
      .catch(err => console.error(err));
  }, [vendorId, categoryId, subId]);

  // Add product to cart
  const addToCart = (product) => {
    setCart(prev => {
      // Check if already in cart
      const exists = prev.find(item => item._id === product._id);
      if (exists) {
        // Increase quantity
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div>
      <h1>Products</h1>
      <Link to={`/vendors/${vendorId}/categories/${categoryId}`}>← Back to Subcategories</Link>

      {/* Cart display */}
      {cart.length > 0 && (
        <div style={{ margin: '15px 0', padding: 10, border: '1px solid #333', borderRadius: 8 }}>
          <h3>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</h3>
          <ul>
            {cart.map(item => (
              <li key={item._id}>
                {item.name} x {item.quantity} - ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p><strong>Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</strong></p>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))',
        gap: 15,
        marginTop: 10
      }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
            <h3>{p.name}</h3>
            <p>Price: ₹{p.price}</p>
            <p>Vendor: {p.vendor.name}</p>
            <p>Category: {p.category.name}</p>
            {p.subcategory && <p>Subcategory: {p.subcategory.name}</p>}
            <button
              onClick={() => addToCart(p)}
              style={{
                padding: '5px 10px',
                marginTop: 10,
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
            <div style={{ marginTop: 5 }}>
              <Link to={`/product/${p._id}`}>View Details</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
