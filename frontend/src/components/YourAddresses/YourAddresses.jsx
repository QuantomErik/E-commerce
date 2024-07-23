import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import './YourAddresses.css';
import api from '../../api'; // Ensure this points to your api module

const YourAddresses = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get('/api/addresses/');
        setAddresses(response.data);
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddAddress = () => {
    navigate('/your-addresses/new-address');
  };

  const handleEditAddress = (id) => {
    navigate(`/your-addresses/edit-address/${id}`);
  };

  const handleRemoveAddress = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await api.delete(`/api/addresses/${id}/`);
        setAddresses(addresses.filter(address => address.id !== id));
      } catch (error) {
        console.error('Error deleting address:', error);
      }
    }
  };

  return (
    <div className="container mx-auto my-10 p-5">
      <BreadCrumb />
      <div className="addresses-container mx-auto my-10 p-5">
        <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
        <p>Manage your shipping addresses here.</p>
        <div className="mt-4 grid your-addresses-grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            className="add-card flex flex-col items-center justify-center cursor-pointer"
            onClick={handleAddAddress}
          >
            <div className="text-4xl text-blue-600">+</div>
            <p className="mt-2 text-blue-600">Add Address</p>
          </div>
          {addresses.map((address) => (
            <div key={address.id} className="address-card">
              <h2 className="text-xl font-semibold">{address.address_type}</h2>
              <p>{address.street_address}, {address.city}, {address.postcode}, {address.country}</p>
              <div className="button-group mt-2">
                <button
                  className="text-custom-color mr-2"
                  onClick={() => handleEditAddress(address.id)}
                >
                  Edit
                </button>
                <span className="separator">|</span>
                <button
                  className="text-custom-color ml-2"
                  onClick={() => handleRemoveAddress(address.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourAddresses;
