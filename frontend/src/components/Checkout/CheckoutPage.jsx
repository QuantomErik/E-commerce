/* import React, { useContext } from 'react';
import { CartContext } from '../Cart/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './Checkout.css';

const stripePromise = loadStripe('pk_test_51PZJITL1uQnSO6RdmlYKBQxfEc4KgkP7as0Ae5sTA9q5ggSPH4PJr8hW1BLyvlKNrYPFLi2Kab10nM1wOr1VB38a003uN4bhf3');

const CheckoutPage = () => {
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => total + (Number(product.price) * product.quantity), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen flex">
      <div className="cart-items bg-gray-200">
        <h1 className="text-2xl font-bold mb-4 mt-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-300">
              {cart.map((product) => (
                <li key={product.id} className="flex items-center py-4">
                  <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover mr-4 rounded-lg" />
                  <div className="flex-grow">
                    <p className="product-name text-lg font-semibold">{product.name}</p>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                  <div className="flex items-center ml-4">
                    <div className="gauge border border-gray-300 rounded p-1 flex items-center">
                      <button onClick={() => updateQuantity(product.id, product.quantity - 1)} className="text-gray-500 mr-2 ml-1">
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="px-2">{product.quantity}</span>
                      <button onClick={() => updateQuantity(product.id, product.quantity + 1)} className="text-gray-500 ml-2 mr-1">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="text-gray-500 ml-4 trash-icon">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-xl font-semibold">Subtotal: ${calculateSubtotal()}</p>
            </div>
          </>
        )}
      </div>
      <div className="payment-information bg-white p-8">
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
        <Elements stripe={stripePromise}>
          <PaymentForm amount={calculateSubtotal()} cartItems={cart} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;
 */

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';
import './Checkout.css';

const stripePromise = loadStripe('pk_test_51PZJITL1uQnSO6RdmlYKBQxfEc4KgkP7as0Ae5sTA9q5ggSPH4PJr8hW1BLyvlKNrYPFLi2Kab10nM1wOr1VB38a003uN4bhf3');

const CheckoutPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const calculateSubtotal = () => {
    return cart.reduce((total, product) => total + (Number(product.price) * product.quantity), 0).toFixed(2);
  };

  /* const createOrder = async (cartItems, totalAmount) => { */
  const createOrder = async (cartItems, totalAmount, email, cardholderName, maskedCardNumber) => {
    try {
      /* const response = await api.post('https://www.erikyang.se/ecommerce/api/orders/create_order/', { */
      const response = await api.post('/api/orders/create_order/', {
        cart_items: cartItems,
        total_amount: totalAmount,
        email: email,
        cardholder_name: cardholderName,
        masked_card_number: maskedCardNumber,
      });
      return response;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleOrderCreation = async (email, cardholderName, maskedCardNumber) => {
    try {
      const cartItems = cart.map(item => ({
        product: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      const totalAmount = calculateSubtotal();

      const response = await createOrder(cartItems, totalAmount, email, cardholderName, maskedCardNumber);
      console.log('Order created successfully:', response.data);

      clearCart();
      /* navigate('/success', { state: { order: response.data } }); */
      navigate('/success', {
        state: {
            cartItems,
            totalAmount,
            email,
            cardholderName,
            maskedCardNumber,
            orderId: response.data.id // Pass the order ID to navigate to OrderConfirmation
        }
    });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="cart-items bg-gray-200">
        <h1 className="text-2xl font-bold mb-4 mt-4">Your Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-300">
              {cart.map((product) => (
                <li key={product.id} className="flex items-center py-4">
                  <img src={product.image_url} alt={product.name} className="w-16 h-16 object-cover mr-4 rounded-lg" />
                  <div className="flex-grow">
                    <p className="product-name text-lg font-semibold">{product.name}</p>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                  <div className="flex items-center ml-4">
                    <div className="gauge border border-gray-300 rounded p-1 flex items-center">
                      <button onClick={() => updateQuantity(product.id, product.quantity - 1)} className="text-gray-500 mr-2 ml-1">
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span className="px-2">{product.quantity}</span>
                      <button onClick={() => updateQuantity(product.id, product.quantity + 1)} className="text-gray-500 ml-2 mr-1">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="text-gray-500 ml-4 trash-icon">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <p className="text-xl font-semibold">Subtotal: ${calculateSubtotal()}</p>
            </div>
          </>
        )}
      </div>
      <div className="payment-information bg-white p-8">
        <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
        <Elements stripe={stripePromise}>
          <PaymentForm amount={calculateSubtotal()} cartItems={cart} onOrderCreation={handleOrderCreation} />
        </Elements>
      </div>
    </div>
  );
};

export default CheckoutPage;


