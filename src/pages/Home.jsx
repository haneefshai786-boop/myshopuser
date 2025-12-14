import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function Home() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    api.get('/vendors').then(res => setVendors(res.data));
  }, []);

  return (
    <div>
      <h1>Vendors</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 15 }}>
        {vendors.map(v => (
          <div key={v._id} style={{ padding: 15, border: '1px solid #ccc', borderRadius: 8 }}>
            <h3>{v.name}</h3>
            <p>{v.description}</p>
            <Link to={`/vendors/${v._id}/categories`}>View Categories</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
