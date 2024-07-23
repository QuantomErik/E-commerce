import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import api from '../../api';
import './BestSellers.css';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [sortOption, setSortOption] = useState('popularity');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/best-sellers/', { params: { sort: sortOption } });
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching best sellers:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleAddToCart = (product) => {
    // Implement add to cart functionality
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="best-sellers-container">
      <h1 className="text-2xl font-bold mb-4">Best Sellers</h1>
      <div className="sort-options">
        <label htmlFor="sort" className="sort-label">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange} className="sort-select">
          <option value="popularity">Popularity</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onOpenCartDrawer={handleAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default BestSellers;
