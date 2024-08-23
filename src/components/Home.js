// src/components/Home.js
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Filters from './Filters';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([100, 5000]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['Oversized T-Shirts', 'T-Shirts', 'Co-ords', 'Joggers', 'Shorts', 'Plus Size T-Shirts'];

  useEffect(() => {
    const fetchProducts = async () => {
      let url = 'http://localhost:8000/api/products/';

      if (selectedCategory) {
        url += `?category=${selectedCategory}`;
      }

      try {
        const response = await axios.get(url);
        const filteredProducts = response.data.filter(product => {
          return product.price >= selectedPriceRange[0] && product.price <= selectedPriceRange[1];
        });
        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.error('There was an error fetching the products!', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedPriceRange]);

  return (
    <div className="home-page">
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPriceRange={selectedPriceRange}
        setSelectedPriceRange={setSelectedPriceRange}
      />
      <ProductList products={products} loading={loading} />
    </div>
  );
};

export default Home;
