import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://nexusstore-backend-z4v0.onrender.com/api/products/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Product not found');
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>Loading product details...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red', fontSize: '1.2rem' }}>Error: {error}</div>;
  if (!product) return null;

  const addToCartHandler = () => {
    addToCart(product, qty);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000);
  };

  const buyNowHandler = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <Link to="/" style={{ textDecoration: 'none', color: '#007185', fontWeight: 'bold', display: 'inline-block', marginBottom: '20px' }}>
          ← Back to Results
        </Link>

        {successMessage && (
          <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', border: '1px solid #c3e6cb' }}>
            ✓ Added to Cart Successfully! <Link to="/cart" style={{ color: '#155724', textDecoration: 'underline', marginLeft: '10px' }}>Go to Cart</Link>
          </div>
        )}

        <div style={{ 
          backgroundColor: '#fff', 
          padding: '30px', 
          borderRadius: '8px', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '40px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fcfcfc', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
            <img src={product.image} alt={product.name} style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} />
          </div>

          <div>
            <span style={{ fontSize: '0.9rem', color: '#555', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
              {product.brand || 'Nexus Brand'}
            </span>
            <h1 style={{ fontSize: '1.8rem', color: '#0f1111', margin: '10px 0 15px 0' }}>{product.name}</h1>
            
            <div style={{ fontSize: '1.8rem', color: '#b12704', fontWeight: 'bold', marginBottom: '15px' }}>
              ₹{product.price}
            </div>

            <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee', padding: '15px 0', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', color: '#111' }}>About this item</h3>
              <p style={{ color: '#565959', lineHeight: '1.6', fontSize: '1rem' }}>{product.description}</p>
            </div>

            {/* Changed from countInStock to stock */}
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: product.stock > 0 ? '#007600' : '#cc0c39', marginBottom: '15px' }}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </div>
          </div>

          <div style={{ border: '1px solid #d5d9d9', borderRadius: '8px', padding: '20px', height: 'fit-content', backgroundColor: '#f8f9fa' }}>
            <div style={{ fontSize: '1.5rem', color: '#b12704', fontWeight: 'bold', marginBottom: '15px' }}>
              ₹{product.price}
            </div>

            <div style={{ fontSize: '0.9rem', color: '#007600', marginBottom: '15px', fontWeight: 'bold' }}>
              FREE delivery available.
            </div>

            {/* Changed from countInStock to stock */}
            {product.stock > 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ fontWeight: 'bold' }}>Quantity:</span>
                <select 
                  value={qty} 
                  onChange={(e) => setQty(Number(e.target.value))}
                  style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d5d9d9', outline: 'none', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  {[...Array(product.stock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>{x + 1}</option>
                  ))}
                </select>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* Changed from countInStock to stock */}
              <button 
                onClick={addToCartHandler}
                disabled={product.stock === 0}
                style={{ width: '100%', padding: '12px', backgroundColor: product.stock === 0 ? '#ccc' : '#ffd814', border: '1px solid #fcd200', borderRadius: '8px', cursor: product.stock === 0 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
              >
                Add to Cart
              </button>

              <button 
                onClick={buyNowHandler}
                disabled={product.stock === 0}
                style={{ width: '100%', padding: '12px', backgroundColor: product.stock === 0 ? '#ccc' : '#ffa41c', border: '1px solid #ff8f00', borderRadius: '8px', cursor: product.stock === 0 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
              >
                Buy Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;