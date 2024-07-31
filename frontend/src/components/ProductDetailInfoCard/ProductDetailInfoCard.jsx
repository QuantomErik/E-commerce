/* import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';
import './ProductDetailInfoCard.css';



const ProductDetailInfoCard = ({ product }) => {
  const [address, setAddress] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get('/api/addresses/');
        setAddress(response.data[0]); 
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddToCart = () => {
    
  };

  const handleBuyNow = () => {
   
  };


  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const price = parseFloat(product.price); 
  const discountedPrice = product.discount ? calculateDiscountedPrice(price, product.discount) : null;



  return (
    <div className="product-detail-info-card">
     


      <div className="price">
        {discountedPrice ? (
          <>
            <span className="original-price">${price.toFixed(2)}</span>
            <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
          </>
        ) : (
          <span>${price.toFixed(2)}</span>
        )}
      </div>



      <div className="delivery-address">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span>Deliver to: {address ? `${address.street_address}, ${address.city}` : 'Fetching address...'}</span>
      </div>
      <div className="stock-status">In Stock</div>
      <div className="quantity-selector">
        <label htmlFor="quantity">Quantity:</label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        >
          {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>
      <button className="add-to-basket-button" onClick={handleAddToCart}>
        Add to basket
      </button>
      <button className="buy-now-button" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetailInfoCard;
 */



import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';
import api from '../../api';
import './ProductDetailInfoCard.css';

const ProductDetailInfoCard = ({ product, onOpenCartDrawer, showToast }) => {
  const [address, setAddress] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await api.get('/api/addresses/');
        setAddress(response.data[0]); // Assuming the first address is the default shipping address
      } catch (error) {
        console.error('Error fetching addresses:', error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onOpenCartDrawer();
    showToast(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const price = parseFloat(product.price);
  const discountedPrice = product.discount ? calculateDiscountedPrice(price, product.discount) : null;

  return (
    <div className="product-detail-info-card">
      <div className="price">
        {discountedPrice ? (
          <>
            <span className="original-price">${price.toFixed(2)}</span>
            <span className="discounted-price">${discountedPrice.toFixed(2)}</span>
          </>
        ) : (
          <span>${price.toFixed(2)}</span>
        )}
      </div>
      <div className="delivery-address">
        <FontAwesomeIcon icon={faMapMarkerAlt} />
        <span>Deliver to: {address ? `${address.street_address}, ${address.city}` : 'No address found. Please log in to add delivery address.'}</span>
      </div>
      <div className="stock-status">In Stock</div>
      <div className="quantity-selector">
        <label htmlFor="quantity">Quantity:</label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        >
          {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
      </div>
      <button className="add-to-basket-button" onClick={handleAddToCart}>
        Add to basket
      </button>
      <button className="buy-now-button" onClick={handleBuyNow}>
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetailInfoCard;



