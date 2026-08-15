import React, { useContext } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import OrderHistory from './pages/OrderHistory';
import AdminOrders from './pages/AdminOrders';
import Feedback from './pages/Feedback';
import InfoPage from './pages/InfoPage';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import { CartContext } from './context/CartContext';
import { AuthContext } from './context/AuthContext';
import { WishlistProvider, WishlistContext } from './context/WishlistContext';

function MainApp() {
  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const { userInfo, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#eaeded' }}>
      {/* NAVBAR */}
      <nav style={{ padding: '15px 30px', backgroundColor: '#2874f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'sans-serif', flexWrap: 'wrap', gap: '15px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
          NexusStore
        </Link>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* 🏠 Home Button Link */}
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
            🏠 Home
          </Link>

          {/* Wishlist Link */}
          <Link to="/wishlist" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
            ❤️ Wishlist ({wishlistItems.length})
          </Link>

          <Link to="/cart" style={{ color: 'white', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 'bold' }}>
            🛒 Cart ({cartItems.length})
          </Link>
          
          {userInfo ? (
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link to="/admin/orders" style={{ color: '#ffdf00', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
                🛠️ Admin Dashboard
              </Link>
              
              <Link to="/orders" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
                📦 My Orders
              </Link>

              <Link to="/profile" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '1rem' }}>
                👤 Profile ({userInfo.name})
              </Link>
              
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
      
      {/* ROUTES */}
      <main style={{ flex: '1' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          {/* Footer Info Routes */}
          <Route path="/about" element={<InfoPage />} />
          <Route path="/our-story" element={<InfoPage />} />
          <Route path="/contact" element={<InfoPage />} />
          <Route path="/help" element={<InfoPage />} />
          <Route path="/shipping-info" element={<InfoPage />} />
          <Route path="/returns" element={<InfoPage />} />
          <Route path="/faqs" element={<InfoPage />} />
          <Route path="/privacy" element={<InfoPage />} />
          <Route path="/terms" element={<InfoPage />} />
        </Routes>
      </main>

      {/* GLOBAL FOOTER */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <WishlistProvider>
      <MainApp />
    </WishlistProvider>
  );
}

export default App;