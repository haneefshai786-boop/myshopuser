import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api.js';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    api.get('/products')
      .then(res => {
        const p = res.data.find(x => x._id === id);
        setProduct(p);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <div>Vendor: {product.vendor.name}</div>
      <div>Category: {product.category.name}</div>
      {product.subcategory && <div>Subcategory: {product.subcategory.name}</div>}
      <div>Price: ₹{product.price}</div>
    </div>
  );
}
