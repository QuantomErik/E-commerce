/* import React from 'react';

function YourOrders() {
    return (
        <div className="container mx-auto my-10 p-5 border border-gray-300 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
            <p>Here you can view all your past orders, track current orders, and manage your order history.</p>
        </div>
    );
}

export default YourOrders; */


// src/components/YourOrders.jsx

// src/components/YourOrders.jsx

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import api from '../../api';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        try {
          const response = await api.get('/api/orders/');
          console.log('Fetched Orders:', response.data);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
          console.error('Response Data:', error.response.data); // Log response data
        }
      };

      fetchOrders();
    }
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto my-10 p-5 border border-gray-300 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.id} className="mb-4">
            <h2 className="text-xl font-semibold">Order {order.id}</h2>
            <p>Placed on: {new Date(order.created_at).toLocaleDateString()}</p>
            <p>Total Amount: ${order.total_amount}</p>
            <ul className="mt-2">
              {order.items.map(item => (
                <li key={item.product.id} className="border-b border-gray-300 py-2">
                  <div className="flex justify-between">
                    <span>{item.product.name}</span>
                    <span>{item.quantity} x ${item.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>You have no orders.</p>
      )}
    </div>
  );
};

export default YourOrders;


