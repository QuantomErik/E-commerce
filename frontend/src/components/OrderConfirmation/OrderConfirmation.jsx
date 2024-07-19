import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import api from '../../api';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrder = async () => {
        try {
          const response = await api.get(`/api/orders/${orderId}/`);
          setOrder(response.data);
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      };

      fetchOrder();
    }
  }, [isAuthenticated, orderId]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">Order Details</h1>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Order Confirmation</h1>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Items Purchased</h2>
          <ul className="divide-y divide-gray-300">
            {order.items.map((item) => (
              <li key={item.product.id} className="flex justify-between py-2">
                <span className="font-medium">{item.product.name}</span>
                <span>
                  ${item.price} x {item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">Total: ${order.total_amount}</p>
          </div>
        </div>
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="mb-2">
            <span className="font-medium">Email:</span> {order.email}
          </div>
          <div className="mb-2">
            <span className="font-medium">Cardholder Name:</span> {order.cardholder_name}
          </div>
          <div className="mb-2">
            <span className="font-medium">Card Number:</span> {order.masked_card_number}
          </div>
        </div>
        <Link to="/your-orders" className="mt-8 block text-center text-blue-600 underline">
          Return to Your Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
