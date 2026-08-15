import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 📊 Sorting state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch products');
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>Loading amazing products...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>;

  // 🔍 Filter products by category AND search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || 
      (product.category && product.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase());
    
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // 📊 Sort filtered products based on dropdown selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'low-high') return a.price - b.price;
    if (sortBy === 'high-low') return b.price - a.price;
    return 0; // 'featured' keeps original order
  });

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', paddingBottom: '40px', fontFamily: 'sans-serif' }}>
      
      {/* 🚀 HERO BANNER SECTION */}
      <div style={{ 
        background: 'linear-gradient(135deg, #232f3e 0%, #131921 100%)', 
        color: 'white', 
        padding: '40px 20px', 
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔥 Mega Summer Carnival is Live!</h1>
        <p style={{ fontSize: '1.2rem', color: '#febd69', marginBottom: '20px' }}>Up to 60% OFF on Electronics, Footwear, Fashion & More</p>
        
        {/* 🔍 SEARCH BAR INPUT */}
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <input 
            type="text" 
            placeholder="Search for laptops, shoes, watches, fashion..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px',
              fontSize: '1rem',
              borderRadius: '8px',
              border: 'none',
              outline: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

        {/* 📂 CATEGORY QUICK-LINK CARDS */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#111' }}>Shop by Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
            {['All', 'Electronics', 'Footwear', 'Fashion', 'Accessories'].map((cat) => (
              <div 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  backgroundColor: selectedCategory === cat ? '#232f3e' : '#fff', 
                  color: selectedCategory === cat ? '#fff' : '#333',
                  padding: '20px', 
                  borderRadius: '8px', 
                  textAlign: 'center', 
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  fontWeight: 'bold',
                  transition: '0.2s'
                }}
              >
                {cat}
              </div>
            ))}
          </div>
        </div>

        {/* ⚡ PRODUCT GRID SECTION WITH SORT DROPDOWN */}
        <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px', flexWrap: 'wrap', gap: '15px' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#111' }}>
              {searchQuery ? `Search Results for "${searchQuery}"` : (selectedCategory === 'All' ? 'Trending Products' : `${selectedCategory} Collection`)}
            </h2>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: '#555', fontSize: '0.95rem' }}>Found ({sortedProducts.length}) items</span>
              
              {/* 📊 SORT SELECTOR */}
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none', cursor: 'pointer', fontWeight: 'bold' }}
              >
                <option value="featured">Sort by: Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {sortedProducts.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#555', fontSize: '1.1rem' }}>No products found matching your search.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {sortedProducts.map((product) => (
                <div 
                  key={product._id} 
                  style={{ 
                    border: '1px solid #e7e7e7', 
                    borderRadius: '8px', 
                    padding: '15px', 
                    backgroundColor: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }}
                >
                  <div>
                    <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px', overflow: 'hidden' }}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                      />
                    </div>
                    <h3 style={{ fontSize: '1rem', color: '#0f1111', marginBottom: '8px', height: '40px', overflow: 'hidden' }}>
                      {product.name}
                    </h3>
                    <div style={{ color: '#b12704', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '15px' }}>
                      ₹{product.price}
                    </div>
                  </div>

                  <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
                    <button style={{ 
                      width: '100%', 
                      padding: '10px', 
                      backgroundColor: '#ffd814', 
                      border: '1px solid #fcd200', 
                      borderRadius: '8px', 
                      cursor: 'pointer', 
                      fontWeight: 'bold',
                      boxShadow: '0 2px 5px rgba(213,217,217,.5)'
                    }}>
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Home;