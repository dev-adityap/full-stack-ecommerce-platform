import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const InfoPage = () => {
  const location = useLocation();
  const path = location.pathname;

  let title = 'Information';
  let content = null;

  switch (path) {
    case '/about':
      title = 'About Us';
      content = (
        <div>
          <h3 style={{ color: '#232f3e', marginBottom: '15px' }}>Welcome to NexusStore</h3>
          <p style={{ lineHeight: '1.7', color: '#333', marginBottom: '15px' }}>
            NexusStore is a modern, full-stack e-commerce web application built to deliver a seamless and intuitive online shopping experience. 
            From browsing products and live search to cart management, secure checkout, and order fulfillment tracking, NexusStore replicates 
            the robust architecture of industry-leading platforms.
          </p>
          <h4 style={{ color: '#232f3e', marginTop: '20px', marginBottom: '10px' }}>Meet the Creator</h4>
          <p style={{ lineHeight: '1.7', color: '#333' }}>
            This platform was conceptualized and developed by <strong>Aditya Panna</strong>, a dedicated B.Tech Computer Science and Engineering (CSE) 
            undergraduate student who is deeply passionate about software engineering, modern web technologies, and thriving to master full-stack development. 
            Every module of this application reflects hands-on learning, architectural precision, and a commitment to building production-grade software.
          </p>
        </div>
      );
      break;

    case '/our-story':
      title = 'Our Story';
      content = (
        <div>
          <h3 style={{ color: '#232f3e', marginBottom: '15px' }}>The Journey Behind NexusStore</h3>
          <p style={{ lineHeight: '1.7', color: '#333', marginBottom: '15px' }}>
            NexusStore started as an ambitious academic and personal project to bridge the gap between theoretical computer science concepts 
            and real-world production web applications. As a B.Tech CSE student, Aditya Panna wanted to move beyond basic coding assignments 
            and build a complete ecosystem encompassing React frontend workflows, Node/Express APIs, and MongoDB database management.
          </p>
          <p style={{ lineHeight: '1.7', color: '#333' }}>
            What began as a foundational database project evolved iteratively into a fully-featured e-commerce platform complete with authentication, 
            admin dashboard controls, live search, and responsive design.
          </p>
        </div>
      );
      break;

    case '/contact':
      title = 'Contact Us';
      content = (
        <div>
          <h3 style={{ color: '#232f3e', marginBottom: '15px' }}>Get in Touch</h3>
          <p style={{ lineHeight: '1.7', color: '#333', marginBottom: '15px' }}>
            Have questions about NexusStore, feedback on the application, or want to connect regarding tech and development? Reach out directly!
          </p>
          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e7e7e7', maxWidth: '500px' }}>
            <p style={{ margin: '0 0 10px 0', fontSize: '1.05rem' }}><strong>Owner & Developer:</strong> Aditya Panna</p>
            <p style={{ margin: '0 0 10px 0', fontSize: '1.05rem' }}><strong>Role:</strong> B.Tech CSE Student & Full-Stack Developer</p>
            <p style={{ margin: '0', fontSize: '1.05rem' }}><strong>Direct Email:</strong> <a href="mailto:adityapanna009@gmail.com" style={{ color: '#007185', fontWeight: 'bold', textDecoration: 'none' }}>adityapanna009@gmail.com</a></p>
          </div>
        </div>
      );
      break;

    case '/help':
      title = 'Help Center';
      content = (
        <div>
          <h3 style={{ color: '#232f3e', marginBottom: '15px' }}>How can we help you?</h3>
          <p style={{ lineHeight: '1.7', color: '#333', marginBottom: '15px' }}>
            Welcome to the NexusStore Help Center. Whether you need assistance placing an order, tracking your shipment, or managing your account, 
            we have you covered.
          </p>
          <ul style={{ lineHeight: '1.8', color: '#333', paddingLeft: '20px' }}>
            <li>Use the top navigation bar to access your <strong>Cart</strong> or view <strong>My Orders</strong>.</li>
            <li>Log in to your account to securely save your shipping address and checkout preferences.</li>
            <li>Explore our <Link to="/faqs" style={{ color: '#007185', fontWeight: 'bold' }}>FAQs</Link> for answers to common questions.</li>
          </ul>
        </div>
      );
      break;

    case '/shipping-info':
      title = 'Shipping & Delivery';
      content = (
        <div>
          <h3 style={{ color: '#232f3e', marginBottom: '15px' }}>Shipping Information</h3>
          <p style={{ lineHeight: '1.7', color: '#333', marginBottom: '15px' }}>
            At NexusStore, we strive to get your orders delivered quickly and securely.
          </p>
          <ul style={{ lineHeight: '1.8', color: '#333', paddingLeft: '20px' }}>
            <li><strong>Free Standard Delivery:</strong> Available on all orders across supported regions.</li>
            <li><strong>Processing Time:</strong> Orders are processed within 24-48 hours of placement.</li>
            <li><strong>Order Tracking:</strong> You can track the fulfillment status of your purchases anytime via the <strong>My Orders</strong> page.</li>
          </ul>
        </div>
      );
      break;

    case '/returns':
      title = 'Returns & Refunds';
      content = (
        <div>
          <h3 style={{ color: '#232f3e', marginBottom: '15px' }}>Returns & Refund Policy</h3>
          <p style={{ lineHeight: '1.7', color: '#333', marginBottom: '15px' }}>
            We want you to be completely satisfied with your purchase from NexusStore.
          </p>
          <ul style={{ lineHeight: '1.8', color: '#333', paddingLeft: '20px' }}>
            <li><strong>7-Day Return Window:</strong> Eligible items can be returned within 7 days of delivery.</li>
            <li><strong>Condition:</strong> Items must be unused, in their original packaging, and accompanied by proof of purchase.</li>
            <li><strong>Refund Processing:</strong> Once inspected and approved, refunds are processed back to your original payment method.</li>
          </ul>
        </div>
      );
      break;

    case '/faqs':
      title = 'Frequently Asked Questions (FAQs)';
      content = (
        <div>
          <h3 style={{ color: '#232f3e', marginBottom: '15px' }}>Common Questions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', lineHeight: '1.6' }}>
            <div>
              <strong>Q: How do I track my order?</strong>
              <p style={{ margin: '5px 0 0 0', color: '#555' }}>A: Log in to your account and navigate to the "My Orders" page to check real-time delivery statuses.</p>
            </div>
            <div>
              <strong>Q: What payment methods are supported?</strong>
              <p style={{ margin: '5px 0 0 0', color: '#555' }}>A: Currently, we support Cash on Delivery (COD) with secure order placement.</p>
            </div>
            <div>
              <strong>Q: Who built NexusStore?</strong>
              <p style={{ margin: '5px 0 0 0', color: '#555' }}>A: NexusStore was built by Aditya Panna, a B.Tech CSE student specializing in full-stack development.</p>
            </div>
          </div>
        </div>
      );
      break;

    case '/privacy':
      title = 'Privacy Policy';
      content = (
        <div>
          <h3 style={{ color: '#232f3e', marginBottom: '15px' }}>Your Privacy Matters</h3>
          <p style={{ lineHeight: '1.7', color: '#333', marginBottom: '15px' }}>
            NexusStore is committed to protecting your personal data and privacy. This policy outlines how we collect, use, and safeguard your information.
          </p>
          <p style={{ lineHeight: '1.7', color: '#333' }}>
            We collect information when you register, place an order, or submit feedback. This data is used solely to fulfill your orders, 
            improve your user experience, and maintain platform security. We never sell or share your personal data with unauthorized third parties.
          </p>
        </div>
      );
      break;

    case '/terms':
      title = 'Terms & Conditions';
      content = (
        <div>
          <h3 style={{ color: '#232f3e', marginBottom: '15px' }}>Terms of Service</h3>
          <p style={{ lineHeight: '1.7', color: '#333', marginBottom: '15px' }}>
            Welcome to NexusStore. By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
          </p>
          <ul style={{ lineHeight: '1.8', color: '#333', paddingLeft: '20px' }}>
            <li>All content on this platform is the property of NexusStore and its creator, Aditya Panna.</li>
            <li>Users must provide accurate information when creating accounts and placing orders.</li>
            <li>We reserve the right to update product availability, pricing, and platform features as needed.</li>
          </ul>
        </div>
      );
      break;

    default:
      title = 'Page Not Found';
      content = <p>The page you are looking for does not exist.</p>;
  }

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
          {title}
        </h1>
        {content}
      </div>
    </div>
  );
};

export default InfoPage;