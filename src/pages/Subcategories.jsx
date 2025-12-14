import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api';

export default function Subcategories() {
  const { vendorId, categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    api.get(`/subcategories/category/${categoryId}`).then(res => setSubcategories(res.data));
  }, [categoryId]);

  return (
    <div>
      <h2>Subcategories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 15 }}>
        {subcategories.map(s => (
          <div key={s._id} style={{ padding: 15, border: '1px solid #ccc', borderRadius: 8 }}>
            <h3>{s.name}</h3>
            <Link to={`/vendors/${vendorId}/categories/${categoryId}/sub/${s._id}`}>View Products</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
