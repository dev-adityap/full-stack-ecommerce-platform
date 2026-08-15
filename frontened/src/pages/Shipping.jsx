import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Shipping = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const submitOrderHandler = async (e) => {
    e.preventDefault();

    if (!address || !city || !postalCode || !country) {
      alert('Please fill in all shipping address fields.');
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item.product
        })),
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        totalPrice,
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place order');
      }

      alert('🎉 Order placed successfully!');
      clearCart(); // Clear the shopping cart
      navigate('/orders'); // Redirect to order history
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '20px' }}>Checkout & Shipping</h1>

        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <form onSubmit={submitOrderHandler}>
            
            <h2 style={{ fontSize: '1.3rem', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              Shipping Address
            </h2>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Street Address</label>
              <input 
                type="text" 
                placeholder="Enter street address" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>City</label>
              <input 
                type="text" 
                placeholder="Enter city" 
                value={city} 
                onChange={(e) => setCity(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Postal Code</label>
                <input 
                  type="text" 
                  placeholder="Enter postal code" 
                  value={postalCode} 
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Country</label>
                <input 
                  type="text" 
                  placeholder="Enter country" 
                  value={country} 
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
                />
              </div>
            </div>

            <h2 style={{ fontSize: '1.3rem', marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              Payment Method
            </h2>

            <div style={{ marginBottom: '25px', display: 'flex', gap: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Cash on Delivery" 
                  checked={paymentMethod === 'Cash on Delivery'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery (COD)
              </label>
            </div>

            <div style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #eee' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                <span>Total Order Amount:</span>
                <span style={{ color: '#b12704' }}>₹{totalPrice}</span>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#ffd814', 
                border: '1px solid #fcd200', 
                borderRadius: '8px', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 2px 5px rgba(213,217,217,.5)'
              }}
            >
              {loading ? 'Processing Order...' : 'Place Order'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;