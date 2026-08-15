import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

function OrderTracking() {
  const [orderIdInput, setOrderIdInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const { showToast } = useToast();

  // Mock order database for lookup
  const mockOrders = {
    'ORD-8492': { id: 'ORD-8492', date: '12 Aug 2026', total: 72998, status: 'Delivered', items: 'Acer Aspire 5, Wireless Earbuds Pro', courier: 'BlueDart Express' },
    'ORD-7120': { id: 'ORD-7120', date: '03 Jul 2026', total: 2499, status: 'Processing', items: 'Barcelona Home Jersey 2025/26', courier: 'Delhivery Ground' }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    const query = orderIdInput.trim().toUpperCase();
    if (!query) return;

    if (mockOrders[query]) {
      setTrackedOrder(mockOrders[query]);
      showToast('Order details retrieved successfully!');
    } else {
      setTrackedOrder(null);
      showToast('Order ID not found. Try "ORD-8492" or "ORD-7120"', 'error');
    }
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#1f2937', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>Track Your Order</h1>
      <p style={{ color: '#6b7280', marginBottom: '30px', fontSize: '1.1rem' }}>Enter your order reference ID to check real-time shipping progress.</p>

      {/* Search Input Box */}
      <form onSubmit={handleTrack} style={{ display: 'flex', gap: '12px', marginBottom: '40px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <input 
          type="text" 
          placeholder="Enter Order ID (e.g. ORD-8492)" 
          value={orderIdInput}
          onChange={e => setOrderIdInput(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '1rem', outline: 'none' }}
        />
        <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
          Track Order
        </button>
      </form>

      {/* Tracked Order Result Card */}
      {trackedOrder && (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f3f4f6', paddingBottom: '16px', marginBottom: '20px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: '600' }}>Order Reference</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', margin: '2px 0 0 0' }}>{trackedOrder.id}</h2>
            </div>
            <span style={{ 
              fontSize: '0.85rem', 
              padding: '6px 14px', 
              borderRadius: '20px', 
              backgroundColor: trackedOrder.status === 'Delivered' ? '#dcfce7' : '#fef9c3',
              color: trackedOrder.status === 'Delivered' ? '#166534' : '#854d0e',
              fontWeight: '700'
            }}>
              {trackedOrder.status}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
            <div>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Items Included:</span>
              <p style={{ fontWeight: '600', color: '#111827', margin: '4px 0 0 0' }}>{trackedOrder.items}</p>
            </div>
            <div>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Courier Partner:</span>
              <p style={{ fontWeight: '600', color: '#111827', margin: '4px 0 0 0' }}>{trackedOrder.courier}</p>
            </div>
            <div>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Order Date:</span>
              <p style={{ fontWeight: '600', color: '#111827', margin: '4px 0 0 0' }}>{trackedOrder.date}</p>
            </div>
            <div>
              <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>Total Amount:</span>
              <p style={{ fontWeight: '600', color: '#111827', margin: '4px 0 0 0' }}>₹{trackedOrder.total.toLocaleString('en-IN')}</p>
            </div>
          </div>

          {/* Timeline Progress */}
          <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '1.05rem', color: '#0f172a' }}>Shipping Progress</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4b5563', fontSize: '0.9rem', fontWeight: '600' }}>
              <span style={{ color: '#2563eb' }}>✓ Order Placed</span>
              <span style={{ color: '#2563eb' }}>✓ Packed</span>
              <span style={{ color: trackedOrder.status === 'Delivered' ? '#2563eb' : '#9ca3af' }}>{trackedOrder.status === 'Delivered' ? '✓' : '○'} Shipped</span>
              <span style={{ color: trackedOrder.status === 'Delivered' ? '#16a34a' : '#9ca3af' }}>{trackedOrder.status === 'Delivered' ? '✓ Delivered' : '○ Out for Delivery'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderTracking;