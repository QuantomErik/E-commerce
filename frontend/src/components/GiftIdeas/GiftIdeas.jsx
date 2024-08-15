import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import { CartContext } from '../Cart/CartContext';
import './GiftIdeas.css';

const GiftIdeas = ({ onOpenCartDrawer }) => {
  const { addBundleToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products/');
        setProducts(response.data.map(product => ({
          ...product,
          price: parseFloat(product.price),
        })));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading gift ideas...</p>;
  if (error) return <p>{error}</p>;

  const getCategoryProducts = (categoryName) => {
    return products.filter(product => product.category.name === categoryName);
  };

  const celestialBundle = [
    getCategoryProducts('Planets')[0],
    getCategoryProducts('Moons')[0],
    getCategoryProducts('Constellations')[0],
  ];

  const moonTrio = getCategoryProducts('Moons').slice(0, 3);
  const planetPack = getCategoryProducts('Planets').slice(0, 3);
  const constellationCluster = getCategoryProducts('Constellations').slice(2, 5);

  const calculateBundlePrice = (bundle) => {
    return bundle.reduce((total, product) => total + product.price, 0);
  };

  const renderBundle = (title, bundle, description) => (
    <div className="bundle-container">
      <h2 className="bundle-title">{title}</h2>
      <div className="bundle-content">
        <div className="bundle-products gift-ideas-size">
          {bundle.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenCartDrawer={onOpenCartDrawer}
              additionalClass="gift-ideas-size"
            />
          ))}
        </div>
        <div className="bundle-details">
          <p>{description}</p>
          <p className="bundle-price">Total Price: ${calculateBundlePrice(bundle).toFixed(2)}</p>
        </div>
        <button className="add-bundle-button" onClick={() => addBundleToCart(bundle, onOpenCartDrawer)}>
          Add Bundle to Cart
        </button>
      </div>
    </div>
  );

  return (
    <div className="gift-ideas-container">
      <h1 className="text-2xl font-bold mb-6">Gift Ideas</h1>
      {renderBundle(
        'Celestial Bundle',
        celestialBundle,
        'A perfect combination of a planet, a moon, and a constellation to bring the cosmos to your loved ones. This bundle captures the grandeur of the universe in a single package, making it an extraordinary gift for astronomy enthusiasts and dreamers alike. Each piece is carefully selected to represent the beauty and mystery of the night sky.'
      )}
      {renderBundle(
        'Moon Trio',
        moonTrio,
        'Three distinct and enchanting moons that capture the magic of the night sky. This trio offers a mesmerizing glimpse into the lunar landscape, perfect for those who are fascinated by the moon\'s phases and its serene presence. Each moon in this collection has its own unique charm, making this bundle a thoughtful gift for moon lovers.'
      )}
      {renderBundle(
        'Planet Pack',
        planetPack,
        'Explore three unique planets that showcase the diversity and beauty of our solar system. This pack includes a selection of vibrant and detailed planetary models, providing an educational and visually stunning experience. Ideal for both young and adult space enthusiasts, this bundle is a journey through the wonders of our celestial neighborhood.'
      )}
      {renderBundle(
        'Constellation Cluster',
        constellationCluster,
        'A cluster of three constellations that tell timeless stories written in the stars. This bundle brings the ancient myths and legends of the night sky to life, making it a perfect gift for those who appreciate the storytelling aspect of astronomy. Each constellation is beautifully crafted, offering a glimpse into the rich tapestry of our galaxy.'
      )}
    </div>
  );
};

// Define PropTypes
GiftIdeas.propTypes = {
  onOpenCartDrawer: PropTypes.func.isRequired,
};

export default GiftIdeas;


