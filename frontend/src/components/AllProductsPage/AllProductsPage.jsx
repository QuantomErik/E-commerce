import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './AllProductsPage.css';
import { FaFilter } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const AllProductsPage = ({ onOpenCartDrawer }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('created_at');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [tempSearch, setTempSearch] = useState('');
  const [tempPriceRange, setTempPriceRange] = useState([0, 10000]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/all-products/', {
        params: {
          search,
          category: selectedCategory,
          sort: sortOption,
          min_price: priceRange[0],
          max_price: priceRange[1],
        },
      });

      setProducts(response.data.map(product => ({
        ...product,
        price: parseFloat(product.price),
      })));
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  }, [search, selectedCategory, sortOption, priceRange]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories/');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, selectedCategory, sortOption]);

  const handleApplyChanges = () => {
    setSearch(tempSearch);
    setPriceRange(tempPriceRange);
    setIsFilterDropdownOpen(false);
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleFilterDropdown = () => {
    setIsFilterDropdownOpen(!isFilterDropdownOpen);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-products-page">
      <h1 className="headline">Products</h1>
      <div className="top-bar">
        <div className="filter-header">Filter</div>
        <button className="filter-button" onClick={toggleFilterDropdown}>
          <FaFilter /> Filter
        </button>
        <div className="sort-container">
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortOption} onChange={handleSortChange}>
            <option value="created_at">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="distance_to_sun">Distance to Sun: Closest</option>
            <option value="distance_to_sun-desc">Distance to Sun: Farthest</option>
          </select>
        </div>
      </div>
      <div className="all-products-content">
        <div className={`sidebar ${isFilterDropdownOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <span>Filter</span>
            <button className="close-button" onClick={toggleFilterDropdown}>
              <FaTimes />
            </button>
          </div>
          <div className="sidebar-section">
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
            />
          </div>
          <div className="sidebar-section">
            <h4>Categories</h4>
            <ul>
              <li className={!selectedCategory ? 'active' : ''} onClick={() => handleCategoryClick('')}>All Categories</li>
              {categories.map(category => (
                <li
                  key={category.id}
                  className={selectedCategory === category.id ? 'active' : ''}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="sidebar-section">
            <h4>Price Range</h4>
            <Slider
              range
              max={10000}
              min={0}
              step={1000}
              value={tempPriceRange}
              onChange={(value) => setTempPriceRange(value)}
            />
            <div className="price-values">
              <span>Min: ${tempPriceRange[0]}</span>
              <span>Max: ${tempPriceRange[1]}</span>
            </div>
          </div>
          <div className="sidebar-section">
            <button className="apply-button" onClick={handleApplyChanges}>Apply Filter</button>
          </div>
        </div>
        <div className="all-products-grid">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenCartDrawer={onOpenCartDrawer}
              additionalClass="all-products-page-height"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;

















