/* import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import ProductDetailInfoCard from '../ProductDetailInfoCard/ProductDetailInfoCard';
import './ProductDetail.css';

const ProductDetail = ({ onOpenCartDrawer }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [buyWithProducts, setBuyWithProducts] = useState([]);
  const [viewedWithProducts, setViewedWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const responseBuyWith = await api.get(`/api/products/${id}/buy-with/`);
        setBuyWithProducts(responseBuyWith.data);
        const responseViewedWith = await api.get(`/api/products/${id}/viewed-with/`);
        setViewedWithProducts(responseViewedWith.data);
      } catch (err) {
        console.error('Failed to fetch related products', err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  const handleAddToCart = () => {
    
    onOpenCartDrawer();
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        <p>Price: ${product.price}</p>
        {product.discount && <p>Discount: {product.discount}%</p>}
        {product.discount && (
          <p>Discounted Price: ${(product.price - (product.price * product.discount) / 100).toFixed(2)}</p>
        )}
        <button onClick={handleAddToCart} className="add-to-cart-button">
          Add to Cart
        </button>
      </div>

      <ProductDetailInfoCard product={product} />

      <hr className="section-divider" />

      <div className="buyitwith-products-section">
        <h2>Buy it with</h2>
        <div className="related-products-grid">
          {buyWithProducts.map(buyProduct => (
            <ProductCard key={buyProduct.id} product={buyProduct} onOpenCartDrawer={onOpenCartDrawer} additionalClass="related-products-card"/>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      <div className="related-products-section">
        <h2>Customers who viewed this item also viewed</h2>
        <div className="related-products-grid">
          {viewedWithProducts.map(viewedProduct => (
            <ProductCard key={viewedProduct.id} product={viewedProduct} onOpenCartDrawer={onOpenCartDrawer} additionalClass="related-products-card"/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
 */

/* import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import ProductDetailInfoCard from '../ProductDetailInfoCard/ProductDetailInfoCard';
import './ProductDetail.css';

const ProductDetail = ({ onOpenCartDrawer }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [buyWithProducts, setBuyWithProducts] = useState([]);
  const [viewedWithProducts, setViewedWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const responseBuyWith = await api.get(`/api/products/${id}/buy-with/`);
        setBuyWithProducts(responseBuyWith.data);
        const responseViewedWith = await api.get(`/api/products/${id}/viewed-with/`);
        setViewedWithProducts(responseViewedWith.data);
      } catch (err) {
        console.error('Failed to fetch related products', err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  const handleAddToCart = () => {
   
    onOpenCartDrawer();
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <div className="product-detail-text">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          {product.discount && <p>Discount: {product.discount}%</p>}
          {product.discount && (
            <p>Discounted Price: ${(product.price - (product.price * product.discount) / 100).toFixed(2)}</p>
          )}
          <button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
        <ProductDetailInfoCard product={product} />
      </div>
      <hr className="section-divider" />

      <div className="buyitwith-products-section">
        <h2>Buy it with</h2>
        <div className="related-products-grid">
          {buyWithProducts.map(buyProduct => (
            <ProductCard key={buyProduct.id} product={buyProduct} onOpenCartDrawer={onOpenCartDrawer} additionalClass="related-products-card"/>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      <div className="related-products-section">
        <h2>Customers who viewed this item also viewed</h2>
        <div className="related-products-grid">
          {viewedWithProducts.map(viewedProduct => (
            <ProductCard key={viewedProduct.id} product={viewedProduct} onOpenCartDrawer={onOpenCartDrawer} additionalClass="related-products-card"/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
 */



/* import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import ProductDetailInfoCard from '../ProductDetailInfoCard/ProductDetailInfoCard';
import './ProductDetail.css';

const ProductDetail = ({ onOpenCartDrawer, showToast }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [buyWithProducts, setBuyWithProducts] = useState([]);
  const [viewedWithProducts, setViewedWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const responseBuyWith = await api.get(`/api/products/${id}/buy-with/`);
        setBuyWithProducts(responseBuyWith.data);
        const responseViewedWith = await api.get(`/api/products/${id}/viewed-with/`);
        setViewedWithProducts(responseViewedWith.data);
      } catch (err) {
        console.error('Failed to fetch related products', err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <div className="product-detail-text">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          
        </div>
        <ProductDetailInfoCard product={product} onOpenCartDrawer={onOpenCartDrawer} showToast={showToast} />
      </div>
      <hr className="section-divider" />

      <div className="buyitwith-products-section">
        <h2>Buy it with</h2>
        <div className="related-products-grid">
          {buyWithProducts.map(buyProduct => (
            <ProductCard key={buyProduct.id} product={buyProduct} onOpenCartDrawer={onOpenCartDrawer} additionalClass="related-products-card"/>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      <div className="related-products-section">
        <h2>Customers who viewed this item also viewed</h2>
        <div className="related-products-grid">
          {viewedWithProducts.map(viewedProduct => (
            <ProductCard key={viewedProduct.id} product={viewedProduct} onOpenCartDrawer={onOpenCartDrawer} additionalClass="related-products-card"/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; */


import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import ProductDetailInfoCard from '../ProductDetailInfoCard/ProductDetailInfoCard';
import './ProductDetail.css';

const ProductDetail = ({ onOpenCartDrawer, showToast }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [buyWithProducts, setBuyWithProducts] = useState([]);
  const [viewedWithProducts, setViewedWithProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details');
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const responseBuyWith = await api.get(`/api/products/${id}/buy-with/`);
        setBuyWithProducts(responseBuyWith.data);
        const responseViewedWith = await api.get(`/api/products/${id}/viewed-with/`);
        setViewedWithProducts(responseViewedWith.data);
      } catch (err) {
        console.error('Failed to fetch related products', err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <div className="product-detail-image">
        <img src={product.image_url} alt={product.name} />
      </div>
      <div className="product-detail-info">
        <div className="product-detail-text">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          {product.discovery_date && <p>Discovery Date: {product.discovery_date}</p>}
          {product.distance_to_earth && <p>Distance to Earth: {product.distance_to_earth} km</p>}
          {product.size && <p>Size: {product.size}</p>}
          {product.mass && <p>Mass: {product.mass}</p>}
          {product.orbital_period && <p>Orbital Period: {product.orbital_period}</p>}
          {product.surface_temperature && <p>Surface Temperature: {product.surface_temperature}</p>}
          {product.gravity && <p>Gravity: {product.gravity}</p>}
          {product.composition && <p>Composition: {product.composition}</p>}
          {product.constellation && <p>Constellation: {product.constellation}</p>}
          {product.orbital_distance && <p>Orbital Distance: {product.orbital_distance} AU</p>}
          {product.atmosphere && <p>Atmosphere: {product.atmosphere}</p>}
          {product.moons && <p>Moons: {product.moons}</p>}
          {product.rotation_period && <p>Rotation Period: {product.rotation_period}</p>}
          {product.magnetic_field && <p>Magnetic Field: {product.magnetic_field}</p>}
          {product.rings && <p>Rings: {product.rings}</p>}
          {product.habitable && <p>Habitable: {product.habitable ? 'Yes' : 'No'}</p>}
          {product.parent_planet && <p>Parent Planet: {product.parent_planet}</p>}
          {product.orbital_distance_from_planet && <p>Orbital Distance from Parent Planet: {product.orbital_distance_from_planet} AU</p>}
          {product.surface_features && <p>Surface Features: {product.surface_features}</p>}
          {product.tidal_effects && <p>Tidal Effects: {product.tidal_effects}</p>}
          {product.geological_activity && <p>Geological Activity: {product.geological_activity}</p>}
          {product.main_stars && <p>Main Stars: {product.main_stars}</p>}
          {product.best_viewing_time && <p>Best Viewing Time: {product.best_viewing_time}</p>}
          {product.mythology && <p>Mythology: {product.mythology}</p>}
          {product.quadrant && <p>Quadrant: {product.quadrant}</p>}
          {product.area && <p>Area: {product.area}</p>}
          {product.visibility && <p>Visibility: {product.visibility}</p>}
        </div>
        <ProductDetailInfoCard product={product} onOpenCartDrawer={onOpenCartDrawer} showToast={showToast} />
      </div>
      <hr className="section-divider" />

      <div className="buyitwith-products-section">
        <h2>Buy it with</h2>
        <div className="related-products-grid">
          {buyWithProducts.map(buyProduct => (
            <ProductCard key={buyProduct.id} product={buyProduct} onOpenCartDrawer={onOpenCartDrawer} additionalClass="related-products-card"/>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      <div className="related-products-section">
        <h2>Customers who viewed this item also viewed</h2>
        <div className="related-products-grid">
          {viewedWithProducts.map(viewedProduct => (
            <ProductCard key={viewedProduct.id} product={viewedProduct} onOpenCartDrawer={onOpenCartDrawer} additionalClass="related-products-card"/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;




