import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';


export default function Subcategories() {
const { categoryId } = useParams();
const [subcategories, setSubcategories] = useState([]);


useEffect(() => {
api.get(`/subcategories/category/${categoryId}`).then(res => setSubcategories(res.data));
}, [categoryId]);


return (
<div>
<h1>Subcategories</h1>
{subcategories.map(s => (
<div key={s._id} style={{ margin:10, padding:10, border:'1px solid #ccc' }}>
<h3>{s.name}</h3>
<Link to={`/vendors/${s.vendor}/categories/${s.category}/sub/${s._id}`}>View Products</Link>
</div>
))}
</div>
);
}
