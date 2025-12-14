import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';


export default function Categories() {
const { vendorId } = useParams();
const [categories, setCategories] = useState([]);


useEffect(() => {
api.get(`/categories/vendor/${vendorId}`).then(res => setCategories(res.data));
}, [vendorId]);


return (
<div>
<h1>Categories</h1>
{categories.map(c => (
<div key={c._id} style={{ margin:10, padding:10, border:'1px solid #ccc' }}>
<h3>{c.name}</h3>
<Link to={`/vendors/${vendorId}/categories/${c._id}/subcategories`}>View Subcategories</Link>
</div>
))}
</div>
);
}
