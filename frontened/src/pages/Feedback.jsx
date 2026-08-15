import React, { useState, useEffect } from 'react';

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('5');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/feedback');
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to fetch reviews');
      setReviews(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage(false);

    // Form Validation
    if (!name.trim()) {
      setErrorMessage('Customer Name is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!rating) {
      setErrorMessage('Please select a rating.');
      return;
    }
    if (!comment.trim()) {
      setErrorMessage('Customer Comment/Review is required.');
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          rating: Number(rating),
          comment: comment.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to submit review');

      setName('');
      setEmail('');
      setRating('5');
      setComment('');
      setSuccessMessage(true);
      fetchReviews(); // Refresh reviews from MongoDB

      setTimeout(() => {
        setSuccessMessage(false);
      }, 4000);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#eaeded', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', color: '#111', marginBottom: '10px' }}>Customer Feedback & Reviews</h1>
        <p style={{ color: '#555', marginBottom: '30px' }}>We value your experience! Please share your thoughts and feedback with us.</p>

        {/* Success & Error Messages */}
        {successMessage && (
          <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', border: '1px solid #c3e6cb' }}>
            ✓ Thank you! Your review has been successfully saved to the database.
          </div>
        )}
        {errorMessage && (
          <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontWeight: 'bold', border: '1px solid #f5c6cb' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Feedback Form Card */}
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px', color: '#111' }}>
            Submit Your Review
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Name:</label>
              <input 
                type="text" 
                placeholder="Enter your name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Email:</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Rating:</label>
              <select 
                value={rating} 
                onChange={(e) => setRating(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', fontSize: '1rem', fontWeight: 'bold', backgroundColor: '#fff', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5 - Excellent)</option>
                <option value="4">⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value="3">⭐⭐⭐ (3 - Average)</option>
                <option value="2">⭐⭐ (2 - Poor)</option>
                <option value="1">⭐ (1 - Terrible)</option>
              </select>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>Your Review:</label>
              <textarea 
                rows="4" 
                placeholder="Write your experience here..." 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ccc', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
              />
            </div>

            <button 
              type="submit"
              disabled={submitting}
              style={{ 
                padding: '12px 30px', 
                backgroundColor: '#ffd814', 
                border: '1px solid #fcd200', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                cursor: submitting ? 'not-allowed' : 'pointer', 
                fontSize: '1.05rem',
                boxShadow: '0 2px 5px rgba(213,217,217,.5)'
              }}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>

        {/* Customer Reviews List */}
        <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px', color: '#111' }}>
            Customer Reviews ({reviews.length})
          </h2>

          {loading ? (
            <p style={{ color: '#555', textAlign: 'center', padding: '20px' }}>Loading reviews from database...</p>
          ) : reviews.length === 0 ? (
            <p style={{ color: '#555', textAlign: 'center', padding: '20px' }}>No reviews in the database yet. Be the first to submit one!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {reviews.map((rev) => (
                <div key={rev._id} style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '1.05rem', color: '#333' }}>{rev.name}</span>
                    <span style={{ color: '#777', fontSize: '0.85rem' }}>{rev.createdAt?.substring(0, 10)}</span>
                  </div>
                  <div style={{ color: '#ffa41c', marginBottom: '8px', fontSize: '1.1rem' }}>
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                  <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Feedback;