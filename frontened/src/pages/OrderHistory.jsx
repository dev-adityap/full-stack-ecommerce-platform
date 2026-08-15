import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!userInfo) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch('https://nexusstore-backend-z4v0.onrender.com/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message || 'Failed to fetch orders');
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo, navigate]);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.2rem' }}>Loading your orders...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '20px' }}>Your Orders</h1>

        {orders.length === 0 ? (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <h2>No orders found 📦</h2>
            <p style={{ color: '#555', margin: '15px 0' }}>You haven't placed any orders yet.</p>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '12px 25px', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {orders.reverse().map((order) => (
              <div key={order._id} style={{ border: '1px solid #d5d9d9', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
                
                {/* 💳 Order Header */}
                <div style={{ backgroundColor: '#f0f2f2', padding: '15px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', borderBottom: '1px solid #d5d9d9', color: '#565959', fontSize: '0.9rem' }}>
                  <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ textTransform: 'uppercase', marginBottom: '5px' }}>Order Placed</div>
                      <div style={{ color: '#111' }}>{order.createdAt ? order.createdAt.substring(0, 10) : 'Today'}</div>
                    </div>
                    <div>
                      <div style={{ textTransform: 'uppercase', marginBottom: '5px' }}>Total</div>
                      <div style={{ color: '#111' }}>₹{order.totalPrice}</div>
                    </div>
                    <div>
                      <div style={{ textTransform: 'uppercase', marginBottom: '5px' }}>Ship To</div>
                      <div style={{ color: '#007185' }}>{order.shippingAddress?.city || 'User'}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', marginTop: '5px' }}>
                    <div style={{ textTransform: 'uppercase', marginBottom: '5px' }}>Order # {order._id.substring(0, 10)}...</div>
                  </div>
                </div>

                {/* 📦 Order Body (Items & Status) */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: order.isDelivered ? '#007600' : '#c45100' }}>
                    {order.isDelivered ? `✓ Delivered on ${order.deliveredAt?.substring(0, 10)}` : '⏳ Processing - Arriving soon'}
                  </h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {order.orderItems.map((item, index) => (
                      <div key={index} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'contain', border: '1px solid #eee', borderRadius: '4px', padding: '5px' }} />
                        <div>
                          <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#007185', fontWeight: 'bold' }}>
                            {item.name}
                          </Link>
                          <div style={{ color: '#555', fontSize: '0.9rem', marginTop: '5px' }}>
                            Qty: {item.qty} | Price: ₹{item.price}
                          </div>
                        </div>
                      </div>
                    ))}
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

export default OrderHistory;