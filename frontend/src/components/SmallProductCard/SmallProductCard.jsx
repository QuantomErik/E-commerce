// src/components/SmallProductCard/SmallProductCard.jsx

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../Cart/CartContext';
import './SmallProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SmallProductCard = ({ product, onOpenCartDrawer }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, onOpenCartDrawer);
  };

  return (
    <div className="small-card-container">
      <div className="relative">
        <a href="#">
          <img
            className="card"
            src={product.image_url}
            alt={product.name}
          />
        </a>
        <button
          onClick={handleAddToCart}
          className="add-to-cart-button"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to cart
        </button>
      </div>

      <div className="text-box">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">{product.name}</h5>
        </a>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-4">
          <span className="card-price font-bold text-gray-900">${product.price}</span>
        </div>
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
};

SmallProductCard.propTypes = {
  product: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onOpenCartDrawer: PropTypes.func.isRequired,
};

export default SmallProductCard;
