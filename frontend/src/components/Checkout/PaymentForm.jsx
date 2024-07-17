import React, { useState, useContext } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { CartContext } from '../Cart/CartContext';

const PaymentForm = ({ amount, cartItems, onOrderCreation }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cardholderName, setCardholderName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { clearCart } = useContext(CartContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Starting payment process');
    console.log(`Amount to be charged: ${amount}`); // Debug statement

    if (!stripe || !elements) {
      console.log('Stripe.js has not loaded');
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
      billing_details: {
        name: cardholderName,
        email: email,
      },
    });

    if (error) {
      console.log('Error creating payment method:', error.message);
      setErrorMessage(error.message);
      return;
    }

    console.log('Payment method created:', paymentMethod);

    const response = await fetch('https://www.erikyang.se/ecommerce/api/create-payment-intent/', {
    /* const response = await fetch('/api/create-payment-intent/', { */
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        payment_method: paymentMethod.id,
        amount: amount,
      }),
    });

    const paymentIntentData = await response.json();

    console.log('Payment intent response:', paymentIntentData);

    if (paymentIntentData.error) {
      console.log('Error from backend:', paymentIntentData.error);
      setErrorMessage(paymentIntentData.error);
      return;
    }

    const { client_secret, status } = paymentIntentData;

    console.log('Payment intent status:', status);

    if (status === 'requires_confirmation' || status === 'requires_action') {
      const { error: confirmError } = await stripe.confirmCardPayment(client_secret);

      if (confirmError) {
        console.log('Error confirming payment:', confirmError.message);
        setErrorMessage(confirmError.message);
        return;
      }

      console.log('Payment confirmed successfully');
      setSuccessMessage('Payment successful!');
      setErrorMessage('');

      // Call the order creation function
      await onOrderCreation();

      // Redirect to the success page with order details
      navigate('/success', { state: { cartItems, totalAmount: amount } });
    } else if (status === 'succeeded') {
      console.log('Payment already succeeded');
      setSuccessMessage('Payment already succeeded!');
      await onOrderCreation();
      navigate('/success', { state: { cartItems, totalAmount: amount } });
    } else {
      console.log('Unexpected status:', status);
      setErrorMessage('Unexpected status: ' + status);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="card-number-element" className="block text-gray-700">Card Number</label>
        <CardNumberElement id="card-number-element" className="p-2 border border-gray-300 rounded-md w-full" />
      </div>
      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label htmlFor="card-expiry-element" className="block text-gray-700">MM/YY</label>
          <CardExpiryElement id="card-expiry-element" className="p-2 border border-gray-300 rounded-md w-full" />
        </div>
        <div className="flex-1">
          <label htmlFor="card-cvc-element" className="block text-gray-700">CVC</label>
          <CardCvcElement id="card-cvc-element" className="p-2 border border-gray-300 rounded-md w-full" />
        </div>
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <div className="mb-4">
        <label htmlFor="cardholderName" className="block text-gray-700">Cardholder Name</label>
        <input
          type="text"
          id="cardholderName"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={!stripe}
      >
        Pay ${amount}
      </button>
    </form>
  );
};

export default PaymentForm;
