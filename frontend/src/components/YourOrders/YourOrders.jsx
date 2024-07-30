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

/* import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import api from '../../api';
import './YourOrders.css';

const YourOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const response = await api.get('/api/orders/');
          console.log('Fetched Orders:', response.data);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
          console.error('Response Data:', error.response.data);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [isAuthenticated]);

  return (
    <div className="orders-container container mx-auto my-10 p-5 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : orders.length > 0 ? (
        orders.map(order => (
          <div key={order.id} className="order-card mb-4 p-4 border border-gray-300 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            <p className="text-gray-600">Placed on: {new Date(order.created_at).toLocaleDateString()}</p>
            <p className="text-gray-600">Total Amount: ${order.total_amount}</p>
            <ul className="mt-4">
              {order.items.map(item => (
                <li key={item.product.id} className="order-item border-b border-gray-300 py-2">
                  <div className="flex justify-between">
                    <span className="text-gray-800">{item.product.name}</span>
                    <span className="text-gray-800">{item.quantity} x ${item.price}</span>
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

export default YourOrders; */

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { CartContext } from '../Cart/CartContext';
import api from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import './YourOrders.css';

const YourOrders = ({ onOpenCartDrawer }) => { 
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); 
  const { isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext); 

  useEffect(() => {
    if (isAuthenticated) {
      const fetchOrders = async () => {
        setLoading(true); 
        try {
          const response = await api.get('/api/orders/');
          console.log('Fetched Orders:', response.data);
          setOrders(response.data);
        } catch (error) {
          console.error('Error fetching orders:', error);
          console.error('Response Data:', error.response.data); 
        } finally {
          setLoading(false); 
        }
      };

      fetchOrders();
    }
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto my-10 ">
      <BreadCrumb />

      <div className="orders-container mx-auto my-10 rounded shadow-md">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold relative">
            Your Orders
            <span className="underline-active"></span>
          </h1>
          <Link to="/buy-again" className="buy-again-link text-xl font-bold relative">
            Buy Again
          </Link>
        </div>
        <div className="underline-container">
          <span className="underline-full"></span>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div> 
          </div>
        ) : orders.length > 0 ? (
          orders.map(order => (
            <div key={order.id} className="order-card mb-4 border border-gray-300 rounded shadow-md">
             
              <div className="order-header flex justify-between">
                <div>
                  <p className="order-placed-text text-gray-600">ORDER PLACED</p>
                  <p className="order-placed-date font-semibold">{new Date(order.created_at).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="order-total-text text-gray-600">TOTAL</p>
                  <p className="order-total-amount font-semibold">${order.total_amount}</p>
                </div>
                <div className="order-id">
                  <p className="text-gray-600">ORDER # {order.id}</p>
                  <Link to={`/order-confirmation/${order.id}`} className="view-order-details-button font-semibold hover:underline">
                    View order details
                  </Link>
                </div>
              </div>
              <ul className="mt-2">
                {order.items.map(item => (
                  <li key={item.product.id} className="order-item border-b border-gray-300 py-2 flex items-center">
                    <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-cover mr-4 rounded-lg" />
                    <div className="flex-grow">
                      <span className="text-gray-800">{item.product.name}</span>
                      <span className="block text-gray-600">{item.quantity} x ${item.price}</span>
                    </div>
                    <button
                      className="buy-again-btn ml-4 flex items-center text-blue-500 hover:text-blue-700"
                      onClick={() => addToCart(item.product, onOpenCartDrawer)} 
                    >
                      <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                      Buy it again
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>You have no orders.</p>
        )}
      </div>
    </div>
  );
};

YourOrders.propTypes = {
  onOpenCartDrawer: PropTypes.func.isRequired,
};

export default YourOrders;












