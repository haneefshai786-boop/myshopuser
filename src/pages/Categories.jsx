import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';

export default function Categories() {
  const { vendorId } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get(`/categories?vendor=${vendorId}`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [vendorId]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Categories</h1>
      <Link to="/vendors">← Back to Vendors</Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 15,
        marginTop: 10
      }}>
        {categories.map(cat => (
          <div key={cat._id} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
            <h3>{cat.name}</h3>
            <Link to={`/vendors/${vendorId}/categories/${cat._id}/subcategories`} 
                  style={{ display: 'inline-block', marginTop: 5, color: '#007bff' }}>
              View Subcategories
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
