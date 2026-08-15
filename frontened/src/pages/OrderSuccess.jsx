import React from 'react';
import { Link } from 'react-router-dom';

function OrderSuccess() {
  const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div style={{ 
      fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", 
      color: '#1f2937', 
      maxWidth: '600px', 
      margin: '60px auto', 
      textAlign: 'center',
      backgroundColor: 'white',
      padding: '40px',
      borderRadius: '16px',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
    }}>
      {/* Success Icon */}
      <div style={{ 
        width: '80px', 
        height: '80px', 
        backgroundColor: '#dcfce7', 
        color: '#16a34a', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontSize: '2.5rem', 
        margin: '0 auto 20px auto',
        fontWeight: 'bold'
      }}>
        ✓
      </div>

      <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '10px' }}>
        Order Placed Successfully!
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.05rem', marginBottom: '25px' }}>
        Thank you for your purchase. We have received your order and are getting it ready for shipment.
      </p>

      {/* Order Reference Box */}
      <div style={{ 
        backgroundColor: '#f8fafc', 
        padding: '20px', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0', 
        marginBottom: '30px',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Order Reference:</span>
          <span style={{ fontWeight: '700', color: '#0f172a' }}>{orderId}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Estimated Delivery:</span>
          <span style={{ fontWeight: '600', color: '#16a34a' }}>3 - 5 Business Days</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Payment Status:</span>
          <span style={{ fontWeight: '600', color: '#2563eb' }}>Confirmed</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link 
          to="/account" 
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#f1f5f9', 
            color: '#334155', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            fontWeight: '600' 
          }}
        >
          View Orders
        </Link>
        <Link 
          to="/shop" 
          style={{ 
            padding: '12px 24px', 
            backgroundColor: '#2563eb', 
            color: 'white', 
            borderRadius: '8px', 
            textDecoration: 'none', 
            fontWeight: '700',
            boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
          }}
        >
          Continue Shopping
        </Link>
      </div>

    </div>
  );
}

export default OrderSuccess;