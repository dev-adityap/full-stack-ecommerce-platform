import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Safely calculate subtotal and quantities, preventing NaN
  const totalItems = cartItems.reduce((acc, item) => acc + Number(item.qty || item.quantity || 1), 0);
  const subtotal = cartItems.reduce((acc, item) => acc + Number(item.price || 0) * Number(item.qty || item.quantity || 1), 0);

  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#0f1111' }}>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Your cart is empty.</p>
            <Link to="/" style={{ color: '#007185', fontWeight: 'bold', textDecoration: 'none' }}>Go Shopping →</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '20px', alignItems: 'start' }}>
            
            {/* Cart Items List */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '1.3rem', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '20px' }}>
                Cart Items ({totalItems})
              </h2>

              {cartItems.map((item) => {
                const itemQty = Number(item.qty || item.quantity || 1);
                const itemPrice = Number(item.price || 0);
                const itemId = item._id || item.id || item.product;

                return (
                  <div key={itemId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '15px', marginBottom: '15px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
                    <div style={{ flex: 1, marginLeft: '20px' }}>
                      <Link to={`/product/${itemId}`} style={{ textDecoration: 'none', color: '#007185', fontWeight: 'bold' }}>
                        {item.name}
                      </Link>
                      <div style={{ color: '#b12704', fontWeight: 'bold', marginTop: '5px' }}>₹{itemPrice}</div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button 
                        onClick={() => addToCart(item, itemQty - 1)}
                        disabled={itemQty <= 1}
                        style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f0f2f2', border: '1px solid #d5d9d9', borderRadius: '4px' }}
                      >-</button>
                      <span style={{ fontWeight: 'bold' }}>{itemQty}</span>
                      <button 
                        onClick={() => addToCart(item, itemQty + 1)}
                        style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: '#f0f2f2', border: '1px solid #d5d9d9', borderRadius: '4px' }}
                      >+</button>
                    </div>

                    <div style={{ fontWeight: 'bold', marginLeft: '20px' }}>₹{itemPrice * itemQty}</div>

                    <button 
                      onClick={() => removeFromCart(itemId)}
                      style={{ background: 'none', border: 'none', color: '#cc0c39', cursor: 'pointer', marginLeft: '20px', fontWeight: 'bold' }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Order Summary Box */}
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Order Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-y', marginBottom: '10px' }}>
                <span>Subtotal ({totalItems} items):</span>
                <strong style={{ marginLeft: 'auto' }}>₹{subtotal}</strong>
              </div>
              <div style={{ display: 'flex', marginBottom: '15px', color: '#007600' }}>
                <span>Delivery:</span>
                <strong style={{ marginLeft: 'auto' }}>FREE</strong>
              </div>
              <div style={{ display: 'flex', fontSize: '1.2rem', fontWeight: 'bold', borderTop: '1px solid #eee', paddingTop: '15px', marginBottom: '20px' }}>
                <span>Total:</span>
                <span style={{ marginLeft: 'auto', color: '#b12704' }}>₹{subtotal}</span>
              </div>
              <button 
                onClick={checkoutHandler}
                style={{ width: '100%', padding: '12px', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
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