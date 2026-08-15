import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function ProductCard({ product, id, name, price }) {
  const { addToCart } = useContext(CartContext);

  const currentProduct = product || { id, name, price, price: price || 0 };

  const handleAddToCart = () => {
    addToCart(currentProduct);
    showToast(`Added ${currentProduct.name} to cart!`); // <-- Trigger toast
  };

  return (
    <div className="product-card" style={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      <style>{`
        .product-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.15);
        }
        .cart-btn {
          transition: background-color 0.2s ease;
        }
        .cart-btn:hover {
          background-color: #1d4ed8;
        }
        .product-img-wrapper {
          overflow: hidden;
        }
        .product-image {
          transition: transform 0.3s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
      `}</style>

      {/* Dynamic Badges */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 1 }}>
        {currentProduct.discount > 0 && (
          <span style={{ backgroundColor: '#ef4444', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
            -{currentProduct.discount}%
          </span>
        )}
        {currentProduct.newArrival && (
          <span style={{ backgroundColor: '#3b82f6', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', padding: '4px 8px', borderRadius: '4px' }}>
            NEW
          </span>
        )}
      </div>

      {/* Product Image */}
      <Link to={`/product/${currentProduct.id}`} className="product-img-wrapper" style={{ display: 'block', height: '220px', backgroundColor: '#f9fafb' }}>
        <img 
          className="product-image"
          src={currentProduct.image || 'https://via.placeholder.com/300x220?text=No+Image'} 
          alt={currentProduct.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Link>

      {/* Card Content Area */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>
            {currentProduct.category || 'General'}
          </span>
          {currentProduct.rating && (
            <span style={{ fontSize: '0.85rem', color: '#eab308', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              ★ {currentProduct.rating} <span style={{ color: '#9ca3af', fontWeight: 'normal', marginLeft: '4px' }}>({currentProduct.reviewCount})</span>
            </span>
          )}
        </div>

        <Link to={`/product/${currentProduct.id}`} style={{ textDecoration: 'none', color: 'inherit', marginBottom: '8px' }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: '1.1rem', 
            fontWeight: '600', 
            lineHeight: '1.4',
            display: '-webkit-box', 
            WebkitLineClamp: 2, 
            WebkitBoxOrient: 'vertical', 
            overflow: 'hidden' 
          }}>
            {currentProduct.name}
          </h3>
        </Link>

        <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
          
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
              ₹{currentProduct.price.toLocaleString('en-IN')}
            </span>
            {currentProduct.originalPrice && currentProduct.originalPrice > currentProduct.price && (
              <span style={{ fontSize: '0.875rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                ₹{currentProduct.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button 
            className="cart-btn"
            onClick={() => addToCart(currentProduct)}
            style={{ 
              width: '100%', 
              padding: '10px 0', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              fontSize: '0.95rem', 
              fontWeight: '600', 
              cursor: 'pointer'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;