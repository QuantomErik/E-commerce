import { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../Cart/CartContext';
import PropTypes from 'prop-types';

const ProductCard = ({
  product,
  onOpenCartDrawer,
  additionalClass = '',
  buttonSize = '',
  badgeClass = '',
}) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, 1, onOpenCartDrawer);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const discountedPrice = product.discount
    ? calculateDiscountedPrice(product.price, product.discount)
    : product.price;

  return (
    <div
      className={`card-container w-full bg-white border-gray-200 shadow mb-10 relative group ${additionalClass}`}
    >
      <div className="relative">
        {product.discount && (
          <div className={`discount-badge ${badgeClass}`}>
            {product.discount}% off
          </div>
        )}
        <Link to={`/products/${product.id}`}>
          <img
            className="card w-full object-cover"
            src={product.image_url}
            alt={product.name}
          />
        </Link>
        <button
          onClick={handleAddToCart}
          className={`add-to-cart-button text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium text-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${buttonSize}`}
        >
          <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
          Add to cart
        </button>
      </div>

      <div className="text-box px-5 pb-3">
        <Link to={`/products/${product.id}`}>
          <h5 className="card-title font-semibold tracking-tight text-gray-900">
            {product.name}
          </h5>
        </Link>
        <p className="card-description text-gray-700">{product.description}</p>
        <div className="card-details mt-4">
          {product.discount ? (
            <>
              <span className="card-original-price line-through text-gray-900 mr-2">
                ${product.price}
              </span>
              <span className="card-discounted-price font-bold text-red-500">
                ${discountedPrice}
              </span>
            </>
          ) : (
            <span className="card-price font-bold text-gray-900">
              ${product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
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

export default ProductCard;
