import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';

export default function Vendors() {
  const { type } = useParams(); // restaurant / grocery
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    api.get(`/vendors?type=${type}`)
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
  }, [type]);

  return (
    <div>
      <h1>{type === 'restaurant' ? 'Restaurants' : 'Grocery'}</h1>
      <Link to="/">← Back</Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
        gap: 15,
        marginTop: 10
      }}>
        {vendors.map(v => (
          <div key={v._id} style={{ border: '1px solid #ccc', padding: 15 }}>
            <h3>{v.name}</h3>
            <Link to={`/vendors/${v._id}`}>View Categories</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
