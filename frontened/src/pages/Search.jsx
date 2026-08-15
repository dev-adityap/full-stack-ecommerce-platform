import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.category.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#1f2937', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>
        Search Results for "{searchParams.get('q') || ''}"
      </h1>
      <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '1.1rem' }}>
        Found {filteredProducts.length} matching products
      </p>

      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#6b7280', fontSize: '1.1rem' }}>
          No products found matching your search. Try searching for "Laptop", "Jersey", or "Watch".
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;