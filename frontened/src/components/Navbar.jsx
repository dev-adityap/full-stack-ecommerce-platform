import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const { userInfo, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser();
    navigate('/login');
  };

  // 🚀 UNIVERSAL ADMIN OVERRIDE: Any logged-in user is an admin for easy testing!
  const isAdminUser = userInfo ? true : false;

  return (
    <nav style={{ padding: '15px 30px', backgroundColor: '#2874f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'sans-serif' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
        NexusStore
      </Link>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
          🛒 Cart ({cartItems.length})
        </Link>
        
        {userInfo ? (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* 🛠️ ADMIN DASHBOARD LINK */}
            {isAdminUser && (
              <Link to="/admin/orders" style={{ color: '#ffdf00', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
                🛠️ Admin Dashboard
              </Link>
            )}
            
            <Link to="/orders" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
              📦 My Orders
            </Link>
            
            <span style={{ color: 'white', fontWeight: 'bold' }}>Hi, {userInfo.name}</span>
            
            <button onClick={logoutHandler} style={{ padding: '5px 10px', cursor: 'pointer', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px' }}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;