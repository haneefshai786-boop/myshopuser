import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';

export default function Subcategories() {
  const { vendorId, categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    api.get(`/subcategories?category=${categoryId}`)
      .then(res => setSubcategories(res.data))
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Subcategories</h1>
      <Link to={`/vendors/${vendorId}/categories`}>← Back to Categories</Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 15,
        marginTop: 10
      }}>
        {subcategories.map(sub => (
          <div key={sub._id} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
            <h3>{sub.name}</h3>
            <Link to={`/vendors/${vendorId}/categories/${categoryId}/subcategories/${sub._id}/products`} 
                  style={{ display: 'inline-block', marginTop: 5, color: '#007bff' }}>
              View Products
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
