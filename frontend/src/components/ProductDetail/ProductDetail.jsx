import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
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
    // Implement add to cart functionality
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
