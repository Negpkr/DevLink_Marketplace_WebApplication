import React, { useState } from 'react';

function TwoFactorAuthComponent(props) {

  const [Message, setMessage] = useState("");
  const [verificationCode, setVerificationCode] = useState('');
  const [EnteredCode, setEnteredCode] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(null);

  const enable2FA = async () => {
    try {
      // Make a POST request to the backend to enable 2FA
      const response = await fetch('http://localhost:3010/api/enable-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: props.Email }),
      });

      const data = await response.json();
      setVerificationCode(data)

      if (response.ok) {
        // 2FA setup successful
        // Show a message to check email for the 6-digit code
        setMessage('Check your email for the 6-digit code to enable 2FA.');
      } else {
        // Handle any errors from the backend
        alert(data.error || 'Failed to enable 2FA.');
      }
    } catch (error) {
      console.error('Error enabling 2FA:', error.message);
      alert('Error enabling 2FA.');
    }
  };

  const verifyCode = async () => {
    try {
      if (EnteredCode == '') {
        alert('Plase enter the code!');
        return;
      }
      // Make a POST request to the backend to verify the code
      const response = await fetch('http://localhost:3010/api/verify-2fa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify
          ({
            code: EnteredCode,
            savedCode: verificationCode
          })
      });

      if (response.ok) {
        setVerified(true);
        props.onVerified(true);
      } else {
        alert('Failed to verify code.');
        props.onVerified(false);
      }
    } catch (error) {
      console.error('Error verifying code:', error.message);
      alert('Error verifying code.');
    }
  };

  return (
    <div>
      <h3>Two-Factor Authentication</h3>
      <br />
      {verified ? (
        <div>
          <p>2FA verification successful!</p>
        </div>
      ) : (
        <div className='form_auth'>
          <button onClick={enable2FA}>Get 6-digit code from Email</button>
          <br></br>
          <label>
            6-Digit Code:
            <input
              required
              type="text"
              value={EnteredCode}
              onChange={(e) => setEnteredCode(e.target.value)} />
          </label>
          <br />
          <button onClick={verifyCode}>Verify</button>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
      {Message && <p className="message" style={{ color: 'green' }}> {Message} </p>}
    </div>
  );
}

export default TwoFactorAuthComponent;

