import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../Cart/CartContext';
import './ProductCard.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="card-container w-full bg-white border-gray-200 shadow mb-10 relative group">
      <div className="relative">
        <a href="#">
          <img
            className="card w-full object-cover"
            src={product.image_url}
            alt={product.name}
          />
        </a>
        <button
  onClick={() => addToCart(product)}
  className="add-to-cart-button text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg px-5 py-2.5 text-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
>
  Add to cart
</button>
      </div>

      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">{product.name}</h5>
        </a>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-5">
          <span className="card-price font-bold text-gray-900">${product.price}</span>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image_url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
