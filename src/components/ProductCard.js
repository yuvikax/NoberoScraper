import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <h3>{product.title}</h3>
        <p>Price: ₹{product.price}</p>
        <p>MRP: ₹{product.mrp}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
