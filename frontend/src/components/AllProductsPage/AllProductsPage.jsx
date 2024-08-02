/* import React, { useEffect, useState } from 'react';
import api from '../../api';
import Products from '../Products/Products';
import './AllProductsPage.css';

const AllProductsPage = ({ onOpenCartDrawer }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products/', {
          params: {
            search,
            category: selectedCategory,
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
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories/');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
      }
    };

    fetchProducts();
    fetchCategories();
  }, [search, selectedCategory]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const categorizedProducts = {
    Planets: products.filter(product => product.category.name === 'Planets'),
    Moons: products.filter(product => product.category.name === 'Moons'),
    Constellations: products.filter(product => product.category.name === 'Constellations'),
  };

  return (
    <div>
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory === '' || categorizedProducts.Planets.length > 0 ? (
        <Products
          products={categorizedProducts.Planets}
          onOpenCartDrawer={onOpenCartDrawer}
          categoryName="Planets"
          additionalClass="all-products-page-height"
        />
      ) : null}

      {selectedCategory === '' || categorizedProducts.Moons.length > 0 ? (
        <Products
          products={categorizedProducts.Moons}
          onOpenCartDrawer={onOpenCartDrawer}
          categoryName="Moons"
          additionalClass="all-products-page-height"
        />
      ) : null}

      {selectedCategory === '' || categorizedProducts.Constellations.length > 0 ? (
        <Products
          products={categorizedProducts.Constellations}
          onOpenCartDrawer={onOpenCartDrawer}
          categoryName="Constellations"
          additionalClass="all-products-page-height"
        />
      ) : null}
    </div>
  );
};

export default AllProductsPage;


 */


/* import React, { useEffect, useState } from 'react';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import './AllProductsPage.css';

const AllProductsPage = ({ onOpenCartDrawer }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products/', {
          params: {
            search,
            category: selectedCategory,
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
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories/');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
      }
    };

    fetchProducts();
    fetchCategories();
  }, [search, selectedCategory]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category.id === parseInt(selectedCategory))
    : products;

  return (
    <div className="all-products-page">
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="all-products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onOpenCartDrawer={onOpenCartDrawer}
            additionalClass="all-products-page-height"
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage; */

/* import React, { useEffect, useState } from 'react';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import './AllProductsPage.css';

const AllProductsPage = ({ onOpenCartDrawer }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('created_at');
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(10000);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products with params:", {
          search,
          category: selectedCategory,
          sort: sortOption,
          min_price: minPrice,
          max_price: maxPrice
        });

        const response = await api.get('/api/all-products/', {
          params: {
            search,
            category: selectedCategory,
            sort: sortOption,
            min_price: minPrice,
            max_price: maxPrice,
          },
        });

        console.log('Fetched products:', response.data);
        setProducts(response.data.map(product => ({
          ...product,
          price: parseFloat(product.price),
        })));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error('Fetch products error:', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories/');
        console.log('Fetched categories:', response.data);
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Fetch categories error:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [search, selectedCategory, sortOption, minPrice, maxPrice]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-products-page">
      <div className="search-filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="created_at">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="distance_to_sun">Distance to Sun: Closest</option>
          <option value="distance_to_sun-desc">Distance to Sun: Farthest</option>
        </select>
        <div className="price-filter">
          <input
            type="range"
            min="0"
            max="10000"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="price-slider"
          />
          <input
            type="range"
            min="0"
            max="10000"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="price-slider"
          />
          <div className="price-values">
            <span>Min: ${minPrice}</span>
            <span>Max: ${maxPrice}</span>
          </div>
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
  );
};

export default AllProductsPage; */



/* import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './AllProductsPage.css';

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
  };

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-products-page">
      <h1 className="headline">Products</h1>
      <div className="content">
        <div className="sidebar">
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
            <h4>Sort By</h4>
            <select value={sortOption} onChange={handleSortChange}>
              <option value="created_at">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="distance_to_sun">Distance to Sun: Closest</option>
              <option value="distance_to_sun-desc">Distance to Sun: Farthest</option>
            </select>
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
            <button className="apply-button" onClick={handleApplyChanges}>Apply Price Range</button>
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

export default AllProductsPage; */

/* import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './AllProductsPage.css';

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
      <div className="content">
        <div className={`sidebar ${isFilterDropdownOpen ? 'open' : ''}`}>
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
            <button className="apply-button" onClick={handleApplyChanges}>Apply Price Range</button>
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

export default AllProductsPage; */


/* import React, { useEffect, useState, useCallback } from 'react';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './AllProductsPage.css';
import { FaFilter } from 'react-icons/fa'; // Import the filter icon
import { FaTimes } from 'react-icons/fa'; // Import the times icon

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
      <div className="content">
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
            <button className="apply-button" onClick={handleApplyChanges}>Apply Price Range</button>
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
 */


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
            <button className="apply-button" onClick={handleApplyChanges}>Apply Price Range</button>
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






/* import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './AllProductsPage.css';
import { FaFilter } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const AllProductsPage = ({ onOpenCartDrawer }) => {
  const location = useLocation();
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
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
    fetchProducts();
  }, [fetchProducts, location.search]);

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
            <button className="apply-button" onClick={handleApplyChanges}>Apply Price Range</button>
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
 */

















