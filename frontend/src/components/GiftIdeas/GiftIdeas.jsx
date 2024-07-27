/* import React, { useEffect, useState } from 'react';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import './GiftIdeas.css';

const GiftIdeas = ({ onOpenCartDrawer }) => {
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
  const constellationCluster = getCategoryProducts('Constellations').slice(0, 3);

  const calculateBundlePrice = (bundle) => {
    return bundle.reduce((total, product) => total + product.price, 0);
  };

  const renderBundle = (title, bundle, description) => (
    <div className="bundle-container">
      <h2 className="bundle-title">{title}</h2>
      <div className="bundle-content">
        <div className="bundle-products">
          {bundle.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenCartDrawer={onOpenCartDrawer}
              additionalClass="horizontal-card"
            />
          ))}
        </div>
        <div className="bundle-details">
          <p>{description}</p>
          <p className="bundle-price">Total Price: ${calculateBundlePrice(bundle).toFixed(2)}</p>
          <button className="add-bundle-button" onClick={() => bundle.forEach(product => onOpenCartDrawer(product))}>
            Add Bundle to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-2xl font-bold mb-6">Gift Ideas</h1>
      {renderBundle(
        'Celestial Bundle',
        celestialBundle,
        'A perfect combination of a planet, a moon, and a constellation to bring the cosmos to your loved ones.'
      )}
      {renderBundle(
        'Moon Trio',
        moonTrio,
        'Three distinct and enchanting moons that capture the magic of the night sky.'
      )}
      {renderBundle(
        'Planet Pack',
        planetPack,
        'Explore three unique planets that showcase the diversity and beauty of our solar system.'
      )}
      {renderBundle(
        'Constellation Cluster',
        constellationCluster,
        'A cluster of three constellations that tell timeless stories written in the stars.'
      )}
    </div>
  );
};

export default GiftIdeas;
 */


import React, { useEffect, useState } from 'react';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import './GiftIdeas.css';

const GiftIdeas = ({ onOpenCartDrawer }) => {
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
  const constellationCluster = getCategoryProducts('Constellations').slice(0, 3);

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
          <button className="add-bundle-button" onClick={() => bundle.forEach(product => onOpenCartDrawer(product))}>
            Add Bundle to Cart
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="gift-ideas-container">
      <h1 className="text-2xl font-bold mb-6">Gift Ideas</h1>
      {renderBundle(
        'Celestial Bundle',
        celestialBundle,
        'A perfect combination of a planet, a moon, and a constellation to bring the cosmos to your loved ones.'
      )}
      {renderBundle(
        'Moon Trio',
        moonTrio,
        'Three distinct and enchanting moons that capture the magic of the night sky.'
      )}
      {renderBundle(
        'Planet Pack',
        planetPack,
        'Explore three unique planets that showcase the diversity and beauty of our solar system.'
      )}
      {renderBundle(
        'Constellation Cluster',
        constellationCluster,
        'A cluster of three constellations that tell timeless stories written in the stars.'
      )}
    </div>
  );
};

export default GiftIdeas;
