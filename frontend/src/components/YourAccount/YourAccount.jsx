/* import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faAddressBook, faEnvelope, faGift } from '@fortawesome/free-solid-svg-icons';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import './YourAccount.css'

const YourAccount = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="your-account-container mx-auto my-10 p-5">
      
      <h1 className="text-2xl font-bold mb-4">Your Account</h1>
      <div className="your-account-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="your-account-card cursor-pointer p-4 border border-gray-300 rounded shadow-md hover:bg-gray-100"
          onClick={() => handleCardClick('/your-orders')}
        >
          <FontAwesomeIcon icon={faBox} size="3x" className="mb-2 text-blue-500" />
          <h2 className="text-xl font-bold">Your Orders</h2>
          <p className="text-gray-600">View and manage your orders</p>
        </div>

        <div
          className="your-account-card cursor-pointer p-4 border border-gray-300 rounded shadow-md hover:bg-gray-100"
          onClick={() => handleCardClick('/your-addresses')}
        >
          <FontAwesomeIcon icon={faAddressBook} size="3x" className="mb-2 text-blue-500" />
          <h2 className="text-xl font-bold">Your Addresses</h2>
          <p className="text-gray-600">Manage your shipping addresses</p>
        </div>

        <div
          className="your-account-card cursor-pointer p-4 border border-gray-300 rounded shadow-md hover:bg-gray-100"
          onClick={() => handleCardClick('/gift-cards')}
        >
          <FontAwesomeIcon icon={faGift} size="3x" className="mb-2 text-blue-500" />
          <h2 className="text-xl font-bold">Gift Cards</h2>
          <p className="text-gray-600">Purchase and manage gift cards</p>
        </div>

        <div
          className="your-account-card cursor-pointer p-4 border border-gray-300 rounded shadow-md hover:bg-gray-100"
          onClick={() => handleCardClick('/contact-us')}
        >
          <FontAwesomeIcon icon={faEnvelope} size="3x" className="mb-2 text-blue-500" />
          <h2 className="text-xl font-bold">Contact Us</h2>
          <p className="text-gray-600">Get in touch with our support</p>
        </div>
      </div>
    </div>
  );
};

export default YourAccount;
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faAddressBook, faEnvelope, faGift } from '@fortawesome/free-solid-svg-icons';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import './YourAccount.css'

const YourAccount = () => {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="container mx-auto my-10 p-5">
      {/* <BreadCrumb /> */}
      <h1 className="text-2xl font-bold mb-4">Your Account</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="your-account-card cursor-pointer p-4 border border-gray-300 shadow-md hover:bg-gray-100"
          onClick={() => handleCardClick('/your-orders')}
        >
          <FontAwesomeIcon icon={faBox} size="3x" className="mb-2 text-blue-500" />
          <h2 className="text-xl font-bold">Your Orders</h2>
          <p className="text-gray-600">View and manage your orders</p>
        </div>

        <div
          className="your-account-card cursor-pointer p-4 border border-gray-300 shadow-md hover:bg-gray-100"
          onClick={() => handleCardClick('/your-addresses')}
        >
          <FontAwesomeIcon icon={faAddressBook} size="3x" className="mb-2 text-blue-500" />
          <h2 className="text-xl font-bold">Your Addresses</h2>
          <p className="text-gray-600">Manage your shipping addresses</p>
        </div>

        <div
          className="your-account-card cursor-pointer p-4 border border-gray-300 shadow-md hover:bg-gray-100"
          onClick={() => handleCardClick('/gift-cards')}
        >
          <FontAwesomeIcon icon={faGift} size="3x" className="mb-2 text-blue-500" />
          <h2 className="text-xl font-bold">Gift Cards</h2>
          <p className="text-gray-600">Purchase and manage gift cards</p>
        </div>

        <div
          className="your-account-card cursor-pointer p-4 border border-gray-300 shadow-md hover:bg-gray-100"
          onClick={() => handleCardClick('/contact-us')}
        >
          <FontAwesomeIcon icon={faEnvelope} size="3x" className="mb-2 text-blue-500" />
          <h2 className="text-xl font-bold">Contact Us</h2>
          <p className="text-gray-600">Get in touch with our support</p>
        </div>
      </div>
    </div>
  );
};

export default YourAccount;
