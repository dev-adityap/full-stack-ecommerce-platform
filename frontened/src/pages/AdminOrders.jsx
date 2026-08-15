import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchAllOrders = async () => {
    try {
      const response = await fetch('https://nexusstore-backend-z4v0.onrender.com/api/orders', {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch admin orders');
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      return;
    }
    fetchAllOrders();
  }, [userInfo, navigate]);

  const deliverHandler = async (orderId) => {
    try {
      const response = await fetch(`https://nexusstore-backend-z4v0.onrender.com/api/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update order status');
      
      // Refresh orders list
      fetchAllOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>Loading admin dashboard...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '20px' }}>🛠️ Admin Dashboard - All Store Orders</h1>

        {orders.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h2>No orders placed on the platform yet.</h2>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.reverse().map((order) => (
              <div key={order._id} style={{ border: '1px solid #d5d9d9', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                
                {/* Header */}
                <div style={{ backgroundColor: '#f0f2f2', padding: '15px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', borderBottom: '1px solid #d5d9d9', color: '#565959', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ textTransform: 'uppercase', marginBottom: '5px' }}>Order ID</div>
                      <div style={{ color: '#111', fontWeight: 'bold' }}>{order._id}</div>
                    </div>
                    <div>
                      <div style={{ textTransform: 'uppercase', marginBottom: '5px' }}>Customer</div>
                      <div style={{ color: '#111' }}>{order.user?.name || 'Customer'}</div>
                    </div>
                    <div>
                      <div style={{ textTransform: 'uppercase', marginBottom: '5px' }}>Total Amount</div>
                      <div style={{ color: '#b12704', fontWeight: 'bold' }}>₹{order.totalPrice}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '5px' }}>
                    <div style={{ textTransform: 'uppercase', marginBottom: '5px' }}>Date</div>
                    <div style={{ color: '#111' }}>{order.createdAt?.substring(0, 10)}</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                  <div>
                    <h4 style={{ marginBottom: '10px', color: '#111' }}>Ordered Items:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {order.orderItems.map((item, idx) => (
                        <div key={idx} style={{ fontSize: '0.95rem', color: '#333' }}>
                          • {item.name} (Qty: {item.qty}) - ₹{item.price * item.qty}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: '15px', fontSize: '0.95rem', color: '#555' }}>
                      <strong>Shipping Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city} - {order.shippingAddress?.postalCode}
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '200px' }}>
                    <div style={{ fontWeight: 'bold', color: order.isDelivered ? '#007600' : '#cc0c39', fontSize: '1.1rem' }}>
                      {order.isDelivered ? `✓ Delivered (${order.deliveredAt?.substring(0, 10)})` : '⏳ Pending Fulfillment'}
                    </div>

                    {!order.isDelivered && (
                      <button 
                        onClick={() => deliverHandler(order._id)}
                        style={{ 
                          padding: '10px 20px', 
                          backgroundColor: '#ffd814', 
                          border: '1px solid #fcd200', 
                          borderRadius: '6px', 
                          cursor: 'pointer', 
                          fontWeight: 'bold',
                          boxShadow: '0 2px 5px rgba(213,217,217,.5)'
                        }}
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;