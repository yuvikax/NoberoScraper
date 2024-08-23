// src/components/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading }) => {
  if (loading) return <div>Loading products...</div>;

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <div>No products found for the selected category and price range.</div>
      ) : (
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductList;
