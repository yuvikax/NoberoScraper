import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)  // Adjust URL based on your API
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the product details!', error);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <p>Price: ₹{product.price}</p>
      <p>MRP: ₹{product.mrp}</p>
      <p>{product.description}</p>
      <div>
        <h3>Available Colors:</h3>
        {product.available_skus.map((sku, index) => (
          <div key={index}>
            <p>Color: {sku.color}</p>
            <p>Sizes: {sku.size.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;
