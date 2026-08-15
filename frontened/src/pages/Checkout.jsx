import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

function Checkout() {
  const { cartItems, clearCart } = useContext(CartContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API processing delay
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      showToast('Payment successful! Order placed.', 'success');
      navigate('/order-success');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '15px' }}>Checkout Unavailable</h2>
        <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '1.1rem' }}>Your cart is empty. Add some items before proceeding to checkout.</p>
        <Link to="/shop" style={{ padding: '12px 28px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: '700' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#1f2937', maxWidth: '1200px', margin: '0 auto' }}>
      
      <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '30px' }}>
        <Link to="/cart" style={{ color: '#6b7280', textDecoration: 'none' }}>Cart</Link> / 
        <span style={{ color: '#111827', fontWeight: '600', margin: '0 6px' }}>Checkout</span>
      </div>

      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '30px', color: '#0f172a' }}>Secure Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>
        
        {/* Left: Forms */}
        <form id="checkout-form" onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Shipping Details */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>1. Shipping Information</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Full Name</label>
                <input type="text" required placeholder="John Doe" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Street Address</label>
                <input type="text" required placeholder="123 Tech Park, Block C" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>City</label>
                <input type="text" required placeholder="Mumbai" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Postal Code</label>
                <input type="text" required placeholder="400001" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>2. Payment Method</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px', border: paymentMethod === 'card' ? '2px solid #2563eb' : '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', backgroundColor: paymentMethod === 'card' ? '#eff6ff' : 'white' }}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Credit / Debit Card</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px', border: paymentMethod === 'upi' ? '2px solid #2563eb' : '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', backgroundColor: paymentMethod === 'upi' ? '#eff6ff' : 'white' }}>
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                <span style={{ fontWeight: '600', color: '#0f172a' }}>UPI / Net Banking</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px', border: paymentMethod === 'cod' ? '2px solid #2563eb' : '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', backgroundColor: paymentMethod === 'cod' ? '#eff6ff' : 'white' }}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                <span style={{ fontWeight: '600', color: '#0f172a' }}>Cash on Delivery (COD)</span>
              </label>
            </div>

            {/* Conditional Card Input Fields */}
            {paymentMethod === 'card' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid #f3f4f6', paddingTop: '20px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Card Number</label>
                  <input type="text" placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Expiry Date</label>
                  <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>CVV</label>
                  <input type="password" placeholder="123" maxLength="3" style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Right: Order Summary locked to the side */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', position: 'sticky', top: '100px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#0f172a', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', maxHeight: '250px', overflowY: 'auto' }}>
            {cartItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', alignItems: 'center' }}>
                <span style={{ color: '#4b5563', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingRight: '10px' }}>
                  {item.name} (x{item.quantity || 1})
                </span>
                <span style={{ fontWeight: '600', color: '#111827' }}>₹{(item.price * (item.quantity || 1)).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem', color: '#4b5563', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
            <span>Subtotal</span>
            <span style={{ fontWeight: '600', color: '#111827' }}>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.95rem', color: '#4b5563' }}>
            <span>Shipping</span>
            <span style={{ fontWeight: '600', color: '#111827' }}>₹{shipping.toLocaleString('en-IN')}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
            <span>Total to Pay</span>
            <span style={{ color: '#2563eb' }}>₹{total.toLocaleString('en-IN')}</span>
          </div>

          <button 
            type="submit"
            form="checkout-form"
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: isProcessing ? '#94a3b8' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              boxShadow: isProcessing ? 'none' : '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
              transition: 'all 0.2s'
            }}
          >
            {isProcessing ? 'Processing Payment...' : `Pay ₹${total.toLocaleString('en-IN')}`}
          </button>
          
          <p style={{ textAlign: 'center', margin: '12px 0 0 0', fontSize: '0.8rem', color: '#9ca3af' }}>
            🔒 Secured with 256-bit SSL encryption
          </p>
        </div>

      </div>
    </div>
  );
}

export default Checkout;