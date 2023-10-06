import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "./CheckoutForm";
import './Payment.css';

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3010/publishable_key_config")
      .then(async (r) => {
        const responseText = await r.text();
        const { publishableKey } = JSON.parse(responseText);
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <div className='payment'>
      <h1>Payment Portal</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default Payment;
