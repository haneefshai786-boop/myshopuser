import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    api.get('/vendors')
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Vendors</h1>
      <p>Select a vendor to browse products</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 15 }}>
        {vendors.map(v => (
          <div key={v._id} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
            <h3>{v.name}</h3>
            <p>{v.description}</p>
            <Link to={`/vendors/${v._id}`}>View Categories</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
