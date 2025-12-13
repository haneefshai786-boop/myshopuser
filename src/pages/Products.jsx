import { useEffect, useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import api from '../api.js';
import Toast from '../components/Toast.jsx';

export default function Products() {
  const { vendorId, categoryId, subId } = useParams();
  const [products, setProducts] = useState([]);
  const { cart, addToCart, setCart } = useOutletContext(); 
  const [toastMessage, setToastMessage] = useState('');

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

  const getQuantityInCart = (productId) => {
    const item = cart.find(p => p._id === productId);
    return item ? item.quantity : 0;
  };

  const increaseQty = (product) => {
    const updated = cart.map(item =>
      item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    setToastMessage(`${product.name} quantity increased`);
  };

  const decreaseQty = (product) => {
    let updated = cart.map(item =>
      item._id === product._id ? { ...item, quantity: item.quantity - 1 } : item
    );
    updated = updated.filter(item => item.quantity > 0);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    setToastMessage(`${product.name} quantity decreased`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setToastMessage(`${product.name} added to cart`);
  };

  return (
    <div>
      <h1>Products</h1>
      <Link to={`/vendors/${vendorId}/categories/${categoryId}`}>← Back to Subcategories</Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 15,
        marginTop: 10
      }}>
        {products.map(p => {
          const quantityInCart = getQuantityInCart(p._id);

          return (
            <div key={p._id} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
              <h3>{p.name}</h3>
              <p>Price: ₹{p.price}</p>
              <p>Vendor: {p.vendor.name}</p>
              <p>Category: {p.category.name}</p>
              {p.subcategory && <p>Subcategory: {p.subcategory.name}</p>}

              {quantityInCart === 0 ? (
                <button
                  onClick={() => handleAddToCart(p)}
                  style={{
                    width: '100%',
                    padding: '8px 0',
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
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                  <button style={{ flex: 1 }} onClick={() => decreaseQty(p)}>-</button>
                  <span style={{ flex: 1, textAlign: 'center' }}>{quantityInCart}</span>
                  <button style={{ flex: 1 }} onClick={() => increaseQty(p)}>+</button>
                </div>
              )}

              <div style={{ marginTop: 5 }}>
                <Link to={`/product/${p._id}`}>View Details</Link>
              </div>
            </div>
          );
        })}
      </div>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
    </div>
  );
}
