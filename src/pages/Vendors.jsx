import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../api.js';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const type = new URLSearchParams(location.search).get('type');

  // Redirect to home if type is missing
  useEffect(() => {
    if (!type) {
      navigate('/');  // back to Home
      return;
    }

    api.get(`/vendors?type=${type}`)
      .then(res => setVendors(res.data))
      .catch(err => console.error(err));
  }, [type]);

  if (!type) return null; // Prevent render until redirect

  return (
    <div>
      <h1>{type.toUpperCase()}</h1>
      <Link to="/">← Back to Home</Link>

      {vendors.length === 0 ? (
        <p>No vendors found for this folder.</p>
      ) : (
        <div style={{ display: 'grid', gap: 15 }}>
          {vendors.map(v => (
            <div key={v._id} style={{ border: '1px solid #ccc', padding: 15 }}>
              <h3>{v.name}</h3>
              <p>{v.description}</p>
              <Link to={`/vendors/${v._id}`}>View Categories</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

