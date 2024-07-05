// src/components/Checkout/CheckoutPage.jsx
import React, { useContext } from 'react';
import { CartContext } from '../Cart/CartContext';

const CheckoutPage = () => {
  const { cart } = useContext(CartContext);

  // Function to calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, product) => total + Number(product.price), 0).toFixed(2);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((product) => (
              <li key={product.id} className="flex items-center justify-between my-2">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover mr-2" />
                <div className="flex-grow">
                  {product.name} - ${product.price}
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-semibold">Subtotal: ${calculateSubtotal()}</p>
            {/* Add more checkout fields and payment integration here */}
            <button
              className="mt-2 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {/* Add your payment logic here */}}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
