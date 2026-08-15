import React, { useState } from 'react';
import { useToast } from '../context/ToastContext';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    showToast('Support message sent successfully! We will get back to you soon.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#1f2937', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>Contact Support</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px', fontSize: '1.1rem' }}>Have questions about your order or our products? Our team is here to help 24/7.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', alignItems: 'start' }}>
        
        {/* Left: Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>📧 Email Support</h3>
            <p style={{ color: '#4b5563', margin: 0, fontSize: '0.95rem' }}>support@nexusstore.com</p>
          </div>

          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>📞 Helpline</h3>
            <p style={{ color: '#4b5563', margin: 0, fontSize: '0.95rem' }}>+91 (800) 555-NEXUS (Mon - Sat)</p>
          </div>

          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', marginBottom: '6px' }}>📍 Headquarters</h3>
            <p style={{ color: '#4b5563', margin: 0, fontSize: '0.95rem' }}>Nexus Tower, Cyber City, Mumbai, India</p>
          </div>
        </div>

        {/* Right: Support Form */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '20px', color: '#0f172a' }}>Send Us a Message</h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Your Name</label>
              <input 
                type="text" 
                required 
                placeholder="John Doe" 
                value={name} 
                onChange={e => setName(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="john@example.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '600' }}>Message / Inquiry</label>
              <textarea 
                required 
                rows="4"
                placeholder="How can we assist you today?" 
                value={message} 
                onChange={e => setMessage(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>

            <button 
              type="submit" 
              style={{ padding: '12px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem', marginTop: '6px' }}
            >
              Submit Ticket
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Contact;