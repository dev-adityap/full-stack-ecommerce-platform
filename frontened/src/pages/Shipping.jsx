import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Shipping = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    return Number(String(price).replace(/[^0-9.-]+/g, '')) || 0;
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parsePrice(item.price);
    const qty = Number(item.qty || item.quantity || 1);
    return acc + price * qty;
  }, 0);

  const submitHandler = async (e) => {
    e.preventDefault();

    const orderData = {
      orderItems: cartItems.map((item) => ({
        product: item._id || item.id || item.product,
        name: item.name,
        image: item.image,
        price: parsePrice(item.price),
        qty: Number(item.qty || item.quantity || 1),
      })),
      shippingAddress: { address, city, postalCode, country },
      paymentMethod,
      totalPrice,
    };

    try {
      const response = await fetch('https://nexusstore-backend-z4v0.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to place order');

      navigate(`/order/${data._id || ''}`);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#0f1111' }}>Checkout & Shipping</h1>

        <form onSubmit={submitHandler}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Street Address</label>
            <input 
              type="text" required placeholder="Enter street address" value={address} onChange={(e) => setAddress(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d5d9d9', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>City</label>
            <input 
              type="text" required placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d5d9d9', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Postal Code</label>
            <input 
              type="text" required placeholder="Enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d5d9d9', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Country</label>
            <input 
              type="text" required placeholder="Enter country" value={country} onChange={(e) => setCountry(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d5d9d9', boxSizing: 'border-box' }}
            />
          </div>

          {/* Payment Method Selection */}
          <div style={{ marginBottom: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '1.1rem' }}>Payment Method</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="PayPal" 
                  checked={paymentMethod === 'PayPal'} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                />
                PayPal or Credit Card
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="COD" 
                  checked={paymentMethod === 'COD'} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                />
                Cash on Delivery (COD)
              </label>
            </div>
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            Total Order Amount: <span style={{ color: '#b12704' }}>₹{totalPrice}</span>
          </div>

          <button 
            type="submit"
            style={{ width: '100%', padding: '12px', backgroundColor: '#ffd814', border: '1px solid #fcd200', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;