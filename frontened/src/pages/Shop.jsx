import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(200000);

  // Extract unique categories dynamically
  const categories = ['All', ...new Set(products.map(item => item.category))];

  // 1. Filter by category and price
  let filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  // 2. Sort products based on selection
  if (sortBy === 'low-high') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high-low') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#1f2937', maxWidth: '1200px', margin: '0 auto' }}>
      
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '10px', color: '#111827' }}>
        Shop the Collection
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '1.1rem' }}>
        Showing {filteredProducts.length} products
      </p>

      {/* Control Bar: Categories & Sorting */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        flexWrap: 'wrap', 
        gap: '20px', 
        marginBottom: '30px',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb'
      }}>
        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: '8px 16px',
                backgroundColor: activeCategory === category ? '#2563eb' : '#f3f4f6',
                color: activeCategory === category ? 'white' : '#4b5563',
                border: 'none',
                borderRadius: '20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sorting and Price Filter Controls */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Max Price Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: '600', color: '#4b5563' }}>
            <span>Max Price: ₹{maxPrice.toLocaleString('en-IN')}</span>
            <input 
              type="range" 
              min="500" 
              max="200000" 
              step="5000" 
              value={maxPrice} 
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ cursor: 'pointer' }}
            />
          </div>

          {/* Sort Selector */}
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              backgroundColor: 'white',
              fontWeight: '600',
              fontSize: '0.9rem',
              color: '#374151',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="featured">Sort by: Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.2rem', color: '#6b7280' }}>
          No products found matching your filter criteria.
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Shop;