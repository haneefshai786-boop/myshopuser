import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Products() {
  const { vendorId, categoryId, subId } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api.get('/products', { params: { vendorId, categoryId, subId } })
      .then(res => {
        setProducts(res.data);
        setError('');
      })
      .catch(err => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, [vendorId, categoryId, subId]);

  // Determine the back URL dynamically
  const backUrl = subId
    ? `/vendors/${vendorId}/categories/${categoryId || ''}`
    : categoryId
      ? `/vendors/${vendorId}`
      : `/vendors`;

  return (
    <div>
      <h1>Products</h1>
      <Link to={backUrl}>← Back</Link>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
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
            <Link to={`/product/${p._id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
