import { useRef } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import './Products.css';

const Products = ({ products, onOpenCartDrawer, categoryName, additionalClass, isCategorySelected }) => {
  const containerRef = useRef(null);

  const scrollLeft = () => {
    const cardWidth = containerRef.current.clientWidth / 3; // 33.33% of the container width
    containerRef.current.scrollBy({
      left: -cardWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    const cardWidth = containerRef.current.clientWidth / 3; // 33.33% of the container width
    containerRef.current.scrollBy({
      left: cardWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      {products.length > 0 ? (
        isCategorySelected ? (
          <div className="products-grid">
            {products.map(product => (
              <div className="product-card" key={product.id}>
                <ProductCard product={product} onOpenCartDrawer={onOpenCartDrawer} additionalClass={additionalClass} />
              </div>
            ))}
          </div>
        ) : (
          <div className="products-wrapper">
            <button className="scroll-button left" onClick={scrollLeft}>
              &lt;
            </button>
            <div className="products-container" ref={containerRef}>
              {products.map(product => (
                <div className="product-card" key={product.id}>
                  <ProductCard product={product} onOpenCartDrawer={onOpenCartDrawer} additionalClass={additionalClass} />
                </div>
              ))}
            </div>
            <button className="scroll-button right" onClick={scrollRight}>
              &gt;
            </button>
          </div>
        )
      ) : (
        <p>No products found in {categoryName} category.</p>
      )}
    </div>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  onOpenCartDrawer: PropTypes.func.isRequired,
  categoryName: PropTypes.string.isRequired,
  additionalClass: PropTypes.string,
  isCategorySelected: PropTypes.bool,
};


export default Products;



