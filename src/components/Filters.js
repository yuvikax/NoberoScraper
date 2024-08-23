// src/components/Filters.js
import React from 'react';

const Filters = ({ categories, selectedCategory, setSelectedCategory, selectedPriceRange, setSelectedPriceRange }) => {
  return (
    <div className="filters">
      <h3>Category</h3>
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="">All</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <h3>Price Range</h3>
      <input
        type="range"
        min="100"
        max="5000"
        value={selectedPriceRange[1]}
        onChange={(e) => setSelectedPriceRange([selectedPriceRange[0], parseInt(e.target.value)])}
        className="price-range-slider"
      />
      <div>
        ₹{selectedPriceRange[0]} - ₹{selectedPriceRange[1]}
      </div>
    </div>
  );
};

export default Filters;
