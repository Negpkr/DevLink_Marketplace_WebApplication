import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const CheckoutForm = () => {
    const nav = useNavigate();
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
            const response = await fetch('http://localhost:3010/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token.id }),
            });

            if (response.ok) {
                console.log('Payment Successful');
                nav("/payment_receipt");
            } else {
                console.error('Payment Failed! Please Try Again Later!');
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
