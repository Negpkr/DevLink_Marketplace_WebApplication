import React, { useState } from 'react';

function NewsletterSignUp() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3010/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setMessage('Subscription successful. Welcome email sent.');
      } else {
        setMessage('Error subscribing. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setMessage('Error subscribing. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div>
      <div class="email-bar">
        <span>SIGN UP FOR OUR DAILY INSIDER</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            class="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" class="subscribe-btn" disabled={isLoading}>{isLoading ? 'Subscribing...' : 'Subscribe'}</button>
        </form>
      </div>
      <tag >{message}</tag>
    </div>
  );
}

export default NewsletterSignUp;
