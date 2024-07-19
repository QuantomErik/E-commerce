/* import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
          <p>No order details available.</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Order Confirmation</h1>
        <p className="text-lg mb-4 text-center">Thank you for your purchase!</p>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Items Purchased</h2>
          <ul className="divide-y divide-gray-300">
            {state.cartItems.map((item) => (
              <li key={item.id} className="flex justify-between py-2">
                <span className="font-medium">{item.name}</span>
                <span>
                  ${item.price} x {item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">Total: ${state.totalAmount}</p>
          </div>
        </div>
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Order Details</h2>
          <p className="font-medium">Email: {state.email}</p>
          <p className="font-medium">Cardholder Name: {state.cardholderName}</p>
          <p className="font-medium">Card Number: {state.maskedCardNumber}</p>
        </div>
        <Link to="/" className="mt-6 block text-center text-blue-600 underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
 */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return (
      <div className="success-container">
        <div className="success-card text-center">
          <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
          <p>No order details available.</p>
          <Link to="/" className="success-link">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <h1 className="text-3xl font-bold mb-6 success-header">Order Confirmation</h1>
        <p className="text-lg mb-4 success-subtitle">Thank you for your purchase!</p>
        <div className="success-section">
          <h2 className="text-xl font-semibold mb-4">Items Purchased</h2>
          <ul className="divide-y divide-gray-300">
            {state.cartItems.map((item) => (
              <li key={item.id} className="success-item">
                <span className="font-medium">{item.name}</span>
                <span>
                  ${item.price} x {item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">Total: ${state.totalAmount}</p>
          </div>
        </div>
        <div className="mt-6 success-section">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="mb-2">
            <span className="font-medium">Email:</span> {state.email}
          </div>
          <div className="mb-2">
            <span className="font-medium">Cardholder Name:</span> {state.cardholderName}
          </div>
          <div className="mb-2">
            <span className="font-medium">Card Number:</span> {state.maskedCardNumber}
          </div>
        </div>
        <Link to="/" className="success-link">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;

