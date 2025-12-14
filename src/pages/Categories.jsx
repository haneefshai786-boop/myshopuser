import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

export default function Categories() {
  const { vendorId } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get(`/categories/vendor/${vendorId}`).then(res => setCategories(res.data));
  }, [vendorId]);

  return (
    <div>
      <h2>Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 15 }}>
        {categories.map(c => (
          <div key={c._id} style={{ padding: 15, border: '1px solid #ccc', borderRadius: 8 }}>
            <h3>{c.name}</h3>
            <Link to={`/vendors/${vendorId}/categories/${c._id}/subcategories`}>View Subcategories</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
