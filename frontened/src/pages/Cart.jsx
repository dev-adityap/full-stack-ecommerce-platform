import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  // Calculate total items and subtotal price
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const subtotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const checkoutHandler = () => {
    if (!userInfo) {
      navigate('/login?redirect=/shipping');
    } else {
      navigate('/shipping');
    }
  };

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '20px' }}>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h2>Your Cart is Empty 🛒</h2>
            <p style={{ color: '#555', margin: '15px 0' }}>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '12px 25px', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Shop Now
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px', alignItems: 'start' }}>
            
            {/* 📦 CART ITEMS LIST */}
            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                Cart Items ({totalItems})
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cartItems.map((item) => (
                  <div key={item.product} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0', paddingBottom: '20px', gap: '15px', flexWrap: 'wrap' }}>
                    
                    {/* Product Image & Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', flex: '1 1 250px' }}>
                      <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #eee' }} />
                      <div>
                        <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#007185', fontWeight: 'bold', fontSize: '1rem' }}>
                          {item.name}
                        </Link>
                        <div style={{ color: '#b12704', fontWeight: 'bold', marginTop: '5px' }}>₹{item.price}</div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button 
                        onClick={() => addToCart(item, item.qty - 1)}
                        disabled={item.qty <= 1}
                        style={{ padding: '5px 12px', backgroundColor: '#f0f2f2', border: '1px solid #d5d9d9', borderRadius: '4px', cursor: item.qty <= 1 ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 'bold', fontSize: '1rem', minWidth: '20px', textAlign: 'center' }}>{item.qty}</span>
                      <button 
                        onClick={() => addToCart(item, item.qty + 1)}
                        disabled={item.qty >= item.countInStock}
                        style={{ padding: '5px 12px', backgroundColor: '#f0f2f2', border: '1px solid #d5d9d9', borderRadius: '4px', cursor: item.qty >= item.countInStock ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}
                      >
                        +
                      </button>
                    </div>

                    {/* Item Total */}
                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', minWidth: '80px', textAlign: 'right' }}>
                      ₹{item.price * item.qty}
                    </div>

                    {/* Delete Button */}
                    <button 
                      onClick={() => removeFromCart(item.product)}
                      style={{ background: 'none', border: 'none', color: '#cc0c39', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 💳 ORDER SUMMARY BOX */}
            <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                Order Summary
              </h2>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '1.05rem' }}>
                <span>Subtotal ({totalItems} items):</span>
                <span style={{ fontWeight: 'bold' }}>₹{subtotalPrice}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.05rem', color: '#007600' }}>
                <span>Delivery:</span>
                <span style={{ fontWeight: 'bold' }}>FREE</span>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                <span>Total:</span>
                <span style={{ color: '#b12704' }}>₹{subtotalPrice}</span>
              </div>

              <button 
                onClick={checkoutHandler}
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  backgroundColor: '#ffd814', 
                  border: '1px solid #fcd200', 
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  fontWeight: 'bold',
                  fontSize: '1.05rem',
                  boxShadow: '0 2px 5px rgba(213,217,217,.5)'
                }}
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;