import React, { useEffect, useState, useRef } from 'react';
import api from '../../api';  // Adjust path as necessary
import ProductCard from '../ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const [firstRowProducts, setFirstRowProducts] = useState([]);
  const [secondRowProducts, setSecondRowProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);

  useEffect(() => {
    const fetchFirstRowProducts = async () => {
      try {
        const response = await api.get('/api/first-row-products/');
        setFirstRowProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch first row products');
        setLoading(false);
        console.error(err);
      }
    };

    const fetchSecondRowProducts = async () => {
      try {
        const response = await api.get('/api/second-row-products/');
        setSecondRowProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch second row products');
        setLoading(false);
        console.error(err);
      }
    };

    fetchFirstRowProducts();
    fetchSecondRowProducts();
  }, []);

  const scrollLeft = (ref) => {
    const cardWidth = ref.current.clientWidth / 4; // 25% of the container width
    ref.current.scrollBy({
      left: -cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = (ref) => {
    const cardWidth = ref.current.clientWidth / 4; // 25% of the container width
    ref.current.scrollBy({
      left: cardWidth,
      behavior: 'smooth',
    });
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Planets</h1>
      <div className="products-wrapper">
        <div className="products-container w-full" ref={containerRef1}>
          {firstRowProducts.map(product => (
            <div className="product-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <button className="scroll-button" onClick={() => scrollLeft(containerRef1)}>
            &lt;
          </button>
          <button className="scroll-button" onClick={() => scrollRight(containerRef1)}>
            &gt;
          </button>
        </div>
      </div>

      <h1>Moons</h1>
      <div className="products-wrapper">
        <div className="products-container w-full" ref={containerRef2}>
          {secondRowProducts.map(product => (
            <div className="product-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className="scroll-buttons">
          <button className="scroll-button" onClick={() => scrollLeft(containerRef2)}>
            &lt;
          </button>
          <button className="scroll-button" onClick={() => scrollRight(containerRef2)}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
