import React from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';

const YourAddresses = () => {
  return (
    <div className="container mx-auto my-10 p-5">
      <BreadCrumb />
      <div className="container mx-auto my-10 p-5 border border-gray-300 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Your Addresses</h1>
        <p>Manage your shipping addresses here.</p>
        <div className="mt-4">
          {/* Sample address list */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Home</h2>
            <p>123 Main St, Springfield, IL 62704</p>
            <button className="mt-2 text-blue-600">Edit</button>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Work</h2>
            <p>456 Elm St, Springfield, IL 62701</p>
            <button className="mt-2 text-blue-600">Edit</button>
          </div>
        </div>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Add New Address</button>
      </div>
    </div>
  );
};

export default YourAddresses;
