import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function Account() {
  const [activeTab, setActiveTab] = useState('orders');
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy order history data
  const orders = [
    { 
      id: 'ORD-8492', 
      date: '12 Aug 2026', 
      total: 72998, 
      status: 'Delivered', 
      items: [
        { name: 'Acer Aspire 5', price: 54999, qty: 1 },
        { name: 'Wireless Earbuds Pro', price: 17999, qty: 1 }
      ],
      shippingAddress: '123 Main Street, Mumbai, 400001',
      paymentMethod: 'Credit Card (Paid)'
    },
    { 
      id: 'ORD-7120', 
      date: '03 Jul 2026', 
      total: 2499, 
      status: 'Processing', 
      items: [
        { name: 'Barcelona Home Jersey 2025/26', price: 2499, qty: 1 }
      ],
      shippingAddress: '45 Park Avenue, Delhi, 110001',
      paymentMethod: 'Cash on Delivery (COD)'
    }
  ];

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully.');
    navigate('/');
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#1f2937', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      
      {/* Account Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '20px', 
        backgroundColor: 'white', 
        padding: '30px', 
        borderRadius: '12px', 
        border: '1px solid #e5e7eb',
        marginBottom: '30px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ 
          width: '70px', 
          height: '70px', 
          borderRadius: '50%', 
          backgroundColor: '#2563eb', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '1.75rem', 
          fontWeight: 'bold' 
        }}>
          {user ? user.name.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            {user ? user.name : 'Valued Customer'}
          </h1>
          <p style={{ color: '#6b7280', margin: '4px 0 0 0' }}>
            {user ? user.email : 'user@example.com'} | +91 98765 43210
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveTab('orders')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'orders' ? '#0f172a' : 'transparent',
            color: activeTab === 'orders' ? 'white' : '#4b5563',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          My Orders
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'profile' ? '#0f172a' : 'transparent',
            color: activeTab === 'profile' ? 'white' : '#4b5563',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Profile Details
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          style={{
            padding: '10px 20px',
            backgroundColor: activeTab === 'settings' ? '#0f172a' : 'transparent',
            color: activeTab === 'settings' ? 'white' : '#4b5563',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Settings
        </button>
      </div>

      {/* Tab Content: Orders */}
      {activeTab === 'orders' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a' }}>Order History</h2>
          {orders.map(order => (
            <div key={order.id} style={{ 
              backgroundColor: 'white', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: '700', color: '#0f172a' }}>{order.id}</span>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    backgroundColor: order.status === 'Delivered' ? '#dcfce7' : '#fef9c3',
                    color: order.status === 'Delivered' ? '#166534' : '#854d0e',
                    fontWeight: '700'
                  }}>
                    {order.status}
                  </span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>
                  Items: {order.items.map(i => i.name).join(', ')}
                </p>
                <p style={{ color: '#9ca3af', fontSize: '0.85rem', margin: '4px 0 0 0' }}>Placed on {order.date}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                  ₹{order.total.toLocaleString('en-IN')}
                </div>
                <button 
                  onClick={() => setSelectedOrder(order)}
                  style={{ padding: '6px 14px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Profile */}
      {activeTab === 'profile' && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>Personal Information</h2>
          <form onSubmit={(e) => { e.preventDefault(); showToast('Profile updated successfully!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600' }}>Full Name</label>
              <input type="text" defaultValue={user ? user.name : 'John Doe'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600' }}>Email Address</label>
              <input type="email" defaultValue={user ? user.email : 'john.doe@example.com'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600' }}>Phone Number</label>
              <input type="text" defaultValue="+91 98765 43210" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
            <button type="submit" style={{ padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', width: 'fit-content' }}>
              Save Changes
            </button>
          </form>
        </div>
      )}

      {/* Tab Content: Settings */}
      {activeTab === 'settings' && (
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>Account Settings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked />
              <span>Receive promotional emails and discount offers</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked />
              <span>Send SMS alerts for order delivery updates</span>
            </label>
            <button 
              onClick={handleLogout}
              style={{ padding: '10px 20px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', width: 'fit-content', marginTop: '10px' }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}

      {/* Order Details Modal Popup */}
      {selectedOrder && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '600px',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            boxSizing: 'border-box'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #f3f4f6', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                Invoice — {selectedOrder.id}
              </h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', fontWeight: 'bold', cursor: 'pointer', color: '#6b7280' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '20px', fontSize: '0.9rem', color: '#4b5563', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div><strong>Order Date:</strong> {selectedOrder.date}</div>
              <div><strong>Payment:</strong> {selectedOrder.paymentMethod}</div>
              <div style={{ gridColumn: 'span 2' }}><strong>Shipping Address:</strong> {selectedOrder.shippingAddress}</div>
            </div>

            <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>Items Ordered</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px', maxHeight: '180px', overflowY: 'auto' }}>
              {selectedOrder.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f9fafb', borderRadius: '6px', fontSize: '0.9rem' }}>
                  <span>{item.name} (x{item.qty})</span>
                  <span style={{ fontWeight: '600' }}>₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f3f4f6', paddingTop: '16px', marginBottom: '24px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a' }}>Total Amount</span>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: '#2563eb' }}>₹{selectedOrder.total.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => { showToast('Invoice PDF downloaded successfully!'); setSelectedOrder(null); }}
                style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}
              >
                Download Invoice PDF
              </button>
              <button 
                onClick={() => setSelectedOrder(null)}
                style={{ padding: '10px 20px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Account;