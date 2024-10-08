import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import ProductDetailInfoCard from '../ProductDetailInfoCard/ProductDetailInfoCard';
import './ProductDetail.css';
import PropTypes from 'prop-types';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faSun, faGlobe, faRuler, faWeight, faThermometerHalf, faBalanceScale, faMountain, faStar } from '@fortawesome/free-solid-svg-icons';

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

      <div className="product-detail-text">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
      </div>

      <hr className="section-divider" />

      <div className="product-detail-main">
        <div className="product-detail-image">
          <img src={product.image_url} alt={product.name} />
        </div>
        
        <div className="product-detail-info">
          <ProductDetailInfoCard product={product} onOpenCartDrawer={onOpenCartDrawer} showToast={showToast} />
        </div>
      </div>

      <hr className="section-divider" />

      <div className="product-detail-parameters">
        {product.age && <p><FontAwesomeIcon icon={faCalendarAlt} style={{ color: 'green' }} /> Age: {product.age}</p>}
        {product.distance_to_sun && <p><FontAwesomeIcon icon={faSun} style={{ color: 'green' }} /> Distance to Sun: {product.distance_to_sun} AU</p>}
        {product.distance_to_earth && <p><FontAwesomeIcon icon={faGlobe} style={{ color: 'green' }} /> Distance to Earth: {product.distance_to_earth}</p>}
        {product.size && <p><FontAwesomeIcon icon={faRuler} style={{ color: 'green' }} /> Size: {product.size}</p>}
        {product.mass && <p><FontAwesomeIcon icon={faWeight} style={{ color: 'green' }} /> Mass: {product.mass}</p>}
        {product.surface_temperature && <p><FontAwesomeIcon icon={faThermometerHalf} style={{ color: 'green' }} /> Surface Temperature: {product.surface_temperature}</p>}
        {product.gravity && <p><FontAwesomeIcon icon={faBalanceScale} style={{ color: 'green' }} /> Gravity: {product.gravity}</p>}
        {product.surface_features && <p><FontAwesomeIcon icon={faMountain} style={{ color: 'green' }} /> Surface Features: {product.surface_features}</p>}

        {product.constellation_detail && (
          <>
            <p><FontAwesomeIcon icon={faGlobe} style={{ color: 'gold' }} /> Distance to Earth: {product.constellation_detail.distance_to_earth}</p>
            <p>
              <FontAwesomeIcon icon={faRuler} style={{ color: 'gold' }} /> Size: {product.constellation_detail.size}{' '}
              <span data-tooltip-id="size-tooltip" data-tooltip-content="Size of the constellation in square degrees, which is a measure of area on the sky." style={{cursor: 'pointer', color: 'blue'}}>ℹ️</span>
              <ReactTooltip id="size-tooltip" place="top" type="dark" effect="solid" className="custom-tooltip"/>
            </p>
            <p><FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} /> Brightest Star: {product.constellation_detail.brightest_star}</p>
            <p><FontAwesomeIcon icon={faCalendarAlt} style={{ color: 'gold' }} /> Best Viewing Time: {product.constellation_detail.best_viewing_time}</p>
            <p><FontAwesomeIcon icon={faStar} style={{ color: 'gold' }} /> Number of Stars: {product.constellation_detail.number_of_stars}</p>
          </>
        )}
      </div>

      <hr className="section-divider" />

      <div className="buyitwith-products-section">
        <h2>Buy it with</h2>
        <div className="related-products-grid">
          {buyWithProducts.map(buyProduct => (
            <ProductCard key={buyProduct.id} product={buyProduct} onOpenCartDrawer={onOpenCartDrawer}
             additionalClass="related-products-card"
             buttonSize="related-products-button"
             badgeClass="related-products-badge" />
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      <div className="related-products-section">
        <h2>Customers who viewed this item also viewed</h2>
        <div className="related-products-grid">
          {viewedWithProducts.map(viewedProduct => (
            <ProductCard key={viewedProduct.id} product={viewedProduct} onOpenCartDrawer={onOpenCartDrawer}
             additionalClass="related-products-card"
             buttonSize="related-products-button"
             badgeClass="related-products-badge" />
          ))}
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  onOpenCartDrawer: PropTypes.func.isRequired,
  showToast: PropTypes.func,
};

export default ProductDetail;









