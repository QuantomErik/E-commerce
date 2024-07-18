import React, { useState } from 'react';
import BreadCrumb from '../BreadCrumb/BreadCrumb';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div className="container mx-auto my-10 p-5">
      <BreadCrumb />
    <div className="container mx-auto my-10 p-5 border border-gray-300 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p>Fill out the form below to get in touch with us.</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Message</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default ContactUs;
