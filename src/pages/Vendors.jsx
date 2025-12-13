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

  // Group vendors by their type (Restaurant, Grocery, etc.)
  const grouped = vendors.reduce((acc, vendor) => {
    const key = vendor.type || 'Others';
    if (!acc[key]) acc[key] = [];
    acc[key].push(vendor);
    return acc;
  }, {});

  return (
    <div style={{ padding: 20 }}>
      <h1>Vendors</h1>

      {Object.keys(grouped).map(type => (
        <div key={type} style={{ marginBottom: 30 }}>
          <h2>{type}</h2> {/* Folder name */}

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 15,
            marginTop: 10
          }}>
            {grouped[type].map(vendor => (
              <div key={vendor._id} style={{ border: '1px solid #ccc', padding: 15, borderRadius: 8 }}>
                <h3>{vendor.name}</h3>
                {vendor.description && <p>{vendor.description}</p>}
                <Link to={`/vendors/${vendor._id}/categories`} 
                      style={{ display: 'inline-block', marginTop: 5, color: '#007bff' }}>
                  View Categories
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
