/* import React, { useContext } from 'react';
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

      <div className="text-box px-5 pb-3">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">{product.name}</h5>
        </a>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-4">
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
 */

/* import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../Cart/CartContext';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCard = ({ product, onOpenCartDrawer }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, onOpenCartDrawer);
  };

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
          onClick={handleAddToCart}
          className="add-to-cart-button text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to cart
        </button>
      </div>

      <div className="text-box px-5 pb-3">
        <a href="#">
          <h5 className="card-title font-semibold tracking-tight text-gray-900">{product.name}</h5>
        </a>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-4">
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
  onOpenCartDrawer: PropTypes.func.isRequired,
};

export default ProductCard; */



/* import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../Cart/CartContext';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onOpenCartDrawer, additionalClass }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, onOpenCartDrawer);
  };

  return (
    <div className={`card-container w-full bg-white border-gray-200 shadow mb-10 relative group ${additionalClass}`}>
      <div className="relative">
        <a href="#">
          <img
            className="card w-full object-cover"
            src={product.image_url}
            alt={product.name}
          />
        </a>
        <button
          onClick={handleAddToCart}
          className="add-to-cart-button text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to cart
        </button>
      </div>

      <div className="text-box px-5 pb-3">
        <a href="#">
          <h5 className="card-title font-semibold tracking-tight text-gray-900">{product.name}</h5>
        </a>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-4">
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
  onOpenCartDrawer: PropTypes.func.isRequired,
  additionalClass: PropTypes.string, 
};

ProductCard.defaultProps = {
  additionalClass: '', 
};

export default ProductCard; */


/* import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../Cart/CartContext';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onOpenCartDrawer, additionalClass, discount }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, onOpenCartDrawer);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const discountedPrice = product.discount ? calculateDiscountedPrice(product.price, product.discount) : product.price;

  return (
    <div className={`card-container w-full bg-white border-gray-200 shadow mb-10 relative group ${additionalClass}`}>
      <div className="relative">
      {discount && <div className="discount-badge">{discount}</div>}
        <a href="#">
          <img
            className="card w-full object-cover"
            src={product.image_url}
            alt={product.name}
          />
        </a>
        <button
          onClick={handleAddToCart}
          className="add-to-cart-button text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to cart
        </button>
      </div>

      <div className="text-box px-5 pb-3">
        <a href="#">
          <h5 className="card-title font-semibold tracking-tight text-gray-900">{product.name}</h5>
        </a>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-4">
          {product.discount && (
            <>
              <span className="card-original-price line-through text-gray-500 mr-2">${product.price}</span>
              <span className="card-discounted-price font-bold text-red-500">${discountedPrice.toFixed(2)}</span>
              <p className="product-discount text-red-500"> {product.discount}% off</p>
            </>
          )}
          {!product.discount && (
            <span className="card-price font-bold text-gray-900">${product.price}</span>
          )}
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
    discount: PropTypes.number, 
  }).isRequired,
  onOpenCartDrawer: PropTypes.func.isRequired,
  additionalClass: PropTypes.string,
  discount: PropTypes.string,
};

ProductCard.defaultProps = {
  additionalClass: '',
};

export default ProductCard; */


/* import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext } from '../Cart/CartContext';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onOpenCartDrawer, additionalClass }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, onOpenCartDrawer);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const discountedPrice = product.discount ? calculateDiscountedPrice(product.price, product.discount) : product.price;

  return (
    <div className={`card-container w-full bg-white border-gray-200 shadow mb-10 relative group ${additionalClass}`}>
      <div className="relative">
        {product.discount && <div className="discount-badge">{product.discount}% off</div>}
        <a href="#">
          <img
            className="card w-full object-cover"
            src={product.image_url}
            alt={product.name}
          />
        </a>
        <button
          onClick={handleAddToCart}
          className="add-to-cart-button text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to cart
        </button>
      </div>

      <div className="text-box px-5 pb-3">
        <a href="#">
          <h5 className="card-title font-semibold tracking-tight text-gray-900">{product.name}</h5>
        </a>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-4">
          {product.discount ? (
            <>
              <span className="card-original-price line-through text-gray-900 mr-2">${product.price}</span>
              <span className="card-discounted-price font-bold text-red-500">${discountedPrice}</span>
            </>
          ) : (
            <span className="card-price font-bold text-gray-900">${product.price}</span>
          )}
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
    discount: PropTypes.number, 
  }).isRequired,
  onOpenCartDrawer: PropTypes.func.isRequired,
  additionalClass: PropTypes.string,
};

ProductCard.defaultProps = {
  additionalClass: '',
};

export default ProductCard; */


/* import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../Cart/CartContext';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onOpenCartDrawer, additionalClass }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, onOpenCartDrawer);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const discountedPrice = product.discount ? calculateDiscountedPrice(product.price, product.discount) : product.price;

  return (
    <div className={`card-container w-full bg-white border-gray-200 shadow mb-10 relative group ${additionalClass}`}>
      <div className="relative">
        {product.discount && <div className="discount-badge">{product.discount}% off</div>}
        <Link to={`/products/${product.id}`}>
          <img
            className="card w-full object-cover"
            src={product.image_url}
            alt={product.name}
          />
        </Link>
        <button
          onClick={handleAddToCart}
          className="add-to-cart-button text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to cart
        </button>
      </div>

      <div className="text-box px-5 pb-3">
        <Link to={`/products/${product.id}`}>
          <h5 className="card-title font-semibold tracking-tight text-gray-900">{product.name}</h5>
        </Link>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-4">
          {product.discount ? (
            <>
              <span className="card-original-price line-through text-gray-900 mr-2">${product.price}</span>
              <span className="card-discounted-price font-bold text-red-500">${discountedPrice}</span>
            </>
          ) : (
            <span className="card-price font-bold text-gray-900">${product.price}</span>
          )}
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
    discount: PropTypes.number, 
  }).isRequired,
  onOpenCartDrawer: PropTypes.func.isRequired,
  additionalClass: PropTypes.string,
};

ProductCard.defaultProps = {
  additionalClass: '',
};

export default ProductCard; */


import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../Cart/CartContext';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onOpenCartDrawer, additionalClass, buttonSize, badgeClass }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1, onOpenCartDrawer);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const discountedPrice = product.discount ? calculateDiscountedPrice(product.price, product.discount) : product.price;

  return (
    <div className={`card-container w-full bg-white border-gray-200 shadow mb-10 relative group ${additionalClass}`}>
      <div className="relative">
       {/*  {product.discount && <div className="discount-badge">{product.discount}% off</div>} */}
       {product.discount && <div className={`discount-badge ${badgeClass}`}>{product.discount}% off</div>}
        <Link to={`/products/${product.id}`}>
          <img
            className="card w-full object-cover"
            src={product.image_url}
            alt={product.name}
          />
        </Link>
        <button
          onClick={handleAddToCart}
          /* className="add-to-cart-button text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300" */
          className={`add-to-cart-button text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${buttonSize}`}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to cart
        </button>
      </div>

      <div className="text-box px-5 pb-3">
        <Link to={`/products/${product.id}`}>
          <h5 className="card-title font-semibold tracking-tight text-gray-900">{product.name}</h5>
        </Link>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-4">
          {product.discount ? (
            <>
              <span className="card-original-price line-through text-gray-900 mr-2">${product.price}</span>
              <span className="card-discounted-price font-bold text-red-500">${discountedPrice}</span>
            </>
          ) : (
            <span className="card-price font-bold text-gray-900">${product.price}</span>
          )}
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
    discount: PropTypes.number, 
  }).isRequired,
  onOpenCartDrawer: PropTypes.func.isRequired,
  additionalClass: PropTypes.string,
  buttonSize: PropTypes.string,
  badgeClass: PropTypes.string,
};

ProductCard.defaultProps = {
  additionalClass: '',
  buttonSize: '',
  badgeClass: '',
};

export default ProductCard;






