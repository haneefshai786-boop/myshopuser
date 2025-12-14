import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';

export default function Categories() {
  const { vendorId } = useParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Correct backend route
    api.get(`/categories/vendor/${vendorId}`)
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, [vendorId]);

  return (
    <div>
      <h2>Categories</h2>
      {categories.map(cat => (
        <Link key={cat._id} to={`/vendors/${vendorId}/categories/${cat._id}/sub`}>
          {cat.name}
        </Link>
      ))}
    </div>
  );
}
