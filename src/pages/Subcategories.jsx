import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';

export default function Subcategories() {
  const { vendorId, categoryId } = useParams();
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    api.get(`/subcategories/category/${categoryId}`)
      .then(res => setSubs(res.data))
      .catch(err => console.error(err));
  }, [categoryId]);

  return (
    <div>
      <h1>Subcategories</h1>
      <Link to={`/vendors/${vendorId}`}>← Back to Categories</Link>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 15, marginTop: 10 }}>
        {subs.map(s => (
          <div key={s._id} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
            <h3>{s.name}</h3>
            <Link to={`/vendors/${vendorId}/categories/${categoryId}/sub/${s._id}`}>View Products</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
