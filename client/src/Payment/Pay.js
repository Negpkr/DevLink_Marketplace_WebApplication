import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from "../Payment/CheckoutForm";
import { Link } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3007/publishable_key_config")
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
      <div >
        <h1>Payment Portal</h1>
        <Elements stripe={stripePromise}>
          <CheckoutForm setStatus={setStatus} />
        </Elements>
      </div>

      <div className='reciept'>
        {status ? (
          <section >
            <h3>Your Payment Was successful!</h3>
            <Link className='link' to='/post_job'> Return to Post Job Page! </Link>
          </section>
        ) : (
          <section >
            <p>If you can not see successful message, your payment has been failed!</p>
            <p>In case of unsuccessful payment! please try with another card or try again later!</p>
            <p>Thank You!</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default Payment;
