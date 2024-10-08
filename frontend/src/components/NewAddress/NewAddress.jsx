import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import PropTypes from 'prop-types';
import './NewAddress.css';
import api from '../../api';

const NewAddress = ({ addNewAddress }) => {
  const navigate = useNavigate();
  const [addressType, setAddressType] = useState('');
  const [country, setCountry] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [city, setCity] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAddress = {
      address_type: addressType,
      country,
      full_name: fullName,
      phone_number: phoneNumber,
      street_address: streetAddress,
      postcode,
      city,
    };

    try {
      const response = await api.post('/api/addresses/', newAddress);
      /* const response = await api.post('https://erikyang.se/ecommerce/api/addresses/', newAddress); */
      addNewAddress(response.data);
      navigate('/your-addresses');
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <div className="container mx-auto my-10 p-5">
      <BreadCrumb />
      <div className="new-address-container mx-auto my-10 p-5 border border-gray-300 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add New Address</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="addressType">
              Address Type
            </label>
            <input
              type="text"
              id="addressType"
              value={addressType}
              onChange={(e) => setAddressType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., Home, Work"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
              Country/Region
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Country/Region</option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
             
            </select>
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="streetAddress">
              Street Address
            </label>
            <textarea
              id="streetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your street address"
              required
            ></textarea>
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="postcode">
              Postcode
            </label>
            <input
              type="text"
              id="postcode"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your postcode"
              required
            />
          </div>
          <div className="form-group mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your city"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

// Define PropTypes
NewAddress.propTypes = {
  addNewAddress: PropTypes.func.isRequired,
};

export default NewAddress;
