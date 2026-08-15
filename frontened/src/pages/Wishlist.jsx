import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const moveToCartHandler = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.product);
  };

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '20px' }}>My Wishlist ❤️</h1>

        {wishlistItems.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h2>Your Wishlist is Empty</h2>
            <p style={{ color: '#555', margin: '15px 0' }}>Save items you love to your wishlist while browsing.</p>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '12px 25px', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Explore Products
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {wishlistItems.map((item) => (
              <div 
                key={item.product} 
                style={{ 
                  backgroundColor: '#fff', 
                  padding: '20px', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                  flexWrap: 'wrap',
                  gap: '15px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '1 1 300px' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '6px', padding: '5px' }} />
                  <div>
                    <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#007185', fontWeight: 'bold', fontSize: '1.1rem' }}>
                      {item.name}
                    </Link>
                    <div style={{ color: '#b12704', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '5px' }}>
                      ₹{item.price}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <button 
                    onClick={() => moveToCartHandler(item)}
                    style={{ padding: '10px 20px', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(213,217,217,.5)' }}
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => removeFromWishlist(item.product)}
                    style={{ padding: '10px 15px', backgroundColor: 'transparent', border: '1px solid #cc0c39', color: '#cc0c39', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;