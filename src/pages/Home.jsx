import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';


export default function Home() {
const [vendors, setVendors] = useState([]);


useEffect(() => {
api.get('/vendors').then(res => setVendors(res.data));
}, []);


return (
<div>
<h1>Vendors</h1>
{vendors.map(v => (
<div key={v._id} style={{ margin:10, padding:10, border:'1px solid #ccc' }}>
<h3>{v.name}</h3>
<p>{v.description}</p>
<Link to={`/vendors/${v._id}/categories`}>View Categories</Link>
</div>
))}
</div>
);
}
