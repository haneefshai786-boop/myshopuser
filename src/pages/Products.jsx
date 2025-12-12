import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';

export default function Products() {
  const { vendorId, categoryId, subId } = useParams();
  const [products, setProducts] = useState([]);

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

  return (
    <div>
      <h1>Products</h1>
      <Link to={`/vendors/${vendorId}/categories/${categoryId}`}>← Back to Subcategories</Link>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 15, marginTop: 10 }}>
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
