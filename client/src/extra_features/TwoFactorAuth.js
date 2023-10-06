import React, { useState } from 'react';

function TwoFactorAuthComponent(props) {
  const [errorMessage, setErrorMessage] = useState("");
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
        alert('Check your email for the 6-digit code to enable 2FA.');
      } else {
        // Handle any errors from the backend
        setErrorMessage(data.error || 'Failed to enable 2FA.');
      }
    } catch (error) {
      console.error('Error enabling 2FA:', error.message);
      setErrorMessage('Error enabling 2FA.');
    }
  };


  const verifyCode = async () => {
    try {

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

      //const data = await response.json();

      if (response.ok) {
        setVerified(true);
        props.onVerified(true);
      } else {
        setError('Failed to verify code.');
        props.onVerified(false);
      }
    } catch (error) {
      console.error('Error verifying code:', error.message);
      setError('Error verifying code.');
    }
  };

  return (
    <div>
      <button onClick={enable2FA}>Get 6-digit code from Email</button>
      {verified ? (
        <div>
          <p>2FA verification successful!</p>
          {/* Render secure content */}
        </div>
      ) : (
        <div>
          <h2>Two-Factor Authentication</h2>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <label>
            6-Digit Code:
            <input
              type="text"
              value={EnteredCode}
              onChange={(e) => setEnteredCode(e.target.value)}
            />
          </label>
          <br />
          <button onClick={verifyCode}>Verify</button>
        </div>
      )}
      {errorMessage && <p className="error"> {errorMessage} </p>}
    </div>
  );
}

export default TwoFactorAuthComponent;

