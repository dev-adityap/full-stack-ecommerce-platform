import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ fontFamily: 'sans-serif', backgroundColor: '#131921', color: '#fff', marginTop: 'auto' }}>
      {/* Back to top button */}
      <div 
        onClick={scrollToTop} 
        style={{ backgroundColor: '#232f3e', padding: '15px', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.95rem', borderBottom: '1px solid #3a4553' }}
      >
        Back to top
      </div>

      {/* Main Footer Links */}
      <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', fontSize: '0.95rem' }}>
          
          {/* About Section */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#febd69' }}>About</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#dddddd' }}>
              <li>
                <Link to="/about" style={{ color: '#dddddd', textDecoration: 'none' }}>About Us</Link>
              </li>
              <li>
                <Link to="/our-story" style={{ color: '#dddddd', textDecoration: 'none' }}>Our Story</Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#dddddd', textDecoration: 'none' }}>Contact Us</Link>
              </li>
              <li>
                <Link to="/feedback" style={{ color: '#dddddd', textDecoration: 'none' }}>Customer Feedback & Reviews</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support Section */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#febd69' }}>Customer Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#dddddd' }}>
              <li>
                <Link to="/help" style={{ color: '#dddddd', textDecoration: 'none' }}>Help Center</Link>
              </li>
              <li>
                <Link to="/shipping-info" style={{ color: '#dddddd', textDecoration: 'none' }}>Shipping & Delivery</Link>
              </li>
              <li>
                <Link to="/returns" style={{ color: '#dddddd', textDecoration: 'none' }}>Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/faqs" style={{ color: '#dddddd', textDecoration: 'none' }}>FAQs</Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#febd69' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', color: '#dddddd' }}>
              <li>
                <Link to="/privacy" style={{ color: '#dddddd', textDecoration: 'none' }}>Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" style={{ color: '#dddddd', textDecoration: 'none' }}>Terms & Conditions</Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright bar */}
      <div style={{ backgroundColor: '#0f1111', padding: '20px', textAlign: 'center', fontSize: '0.85rem', color: '#999', borderTop: '1px solid #232f3e' }}>
        © 2026, NexusStore.com. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;