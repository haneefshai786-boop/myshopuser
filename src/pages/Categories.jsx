import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';

export default function Categories() {
  const { vendorId } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get(`/categories/vendor/${vendorId}`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [vendorId]);

  return (
    <div>
      <h1>Categories</h1>
      <Link to="/">← Back to Vendors</Link>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 15, marginTop: 10 }}>
        {categories.map(c => (
          <div key={c._id} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
            <h3>{c.name}</h3>
            <Link to={`/vendors/${vendorId}/categories/${c._id}`}>View Subcategories</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
