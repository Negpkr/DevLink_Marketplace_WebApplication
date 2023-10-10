import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './Payment.css';

const CheckoutForm = ({ setStatus }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            setError(error.message);
        } else {
            const response = await fetch('http://localhost:3007/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token.id }),
            });

            if (response.ok) {
                console.log('Payment Successful');
                setStatus(true);
            } else {
                console.error('Payment Failed! Please Try Again Later!');
                setStatus(false);
            }
        }
    };

    return (
        <div className="checkout-form">
            <h4>Notice: The payment amount for posting each job is $10!</h4>
            <form id="payment-form">
                <label>
                    Please Enter Your Card details:
                    <CardElement className="card-element" />
                </label>
                <div role="alert" className="error-message">{error}</div>
                <button type="submit" onClick={handleSubmit} className="pay-button">
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
