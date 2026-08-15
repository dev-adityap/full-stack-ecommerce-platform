import React, { useState } from 'react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit and debit cards (Visa, MasterCard, RuPay), UPI, Net Banking, and Cash on Delivery (COD) across India.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard delivery typically takes 3 to 5 business days depending on your location. Express delivery options are available at checkout.'
    },
    {
      question: 'What is your return and refund policy?',
      answer: 'We offer a 7-day hassle-free return policy on all unused and unopened items in their original packaging. Refunds are processed within 3-5 business days.'
    },
    {
      question: 'How can I track my order?',
      answer: 'You can easily track your order by clicking on "Track Order" in the footer or by visiting your Account dashboard and viewing order history.'
    },
    {
      question: 'Are the products covered under warranty?',
      answer: 'Yes! All electronic items and laptops come with a standard 1-year manufacturer warranty. You can check specific warranty details on individual product pages.'
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif", color: '#1f2937', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>Frequently Asked Questions</h1>
      <p style={{ color: '#6b7280', marginBottom: '40px', fontSize: '1.1rem' }}>Find quick answers to common questions about shopping, shipping, and returns.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <button 
              onClick={() => toggleAccordion(index)}
              style={{ width: '100%', padding: '20px', backgroundColor: 'white', border: 'none', textAlign: 'left', fontSize: '1.05rem', fontWeight: '700', color: '#0f172a', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <span>{faq.question}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2563eb' }}>
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div style={{ padding: '0 20px 20px 20px', color: '#4b5563', fontSize: '0.95rem', lineHeight: '1.6', borderTop: '1px solid #f3f4f6', paddingTop: '14px' }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;