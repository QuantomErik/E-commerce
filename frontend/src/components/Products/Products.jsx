import React, { useEffect, useState, useRef } from 'react';
import api from '../../api';  // Adjust path as necessary
import ProductCard from '../ProductCard/ProductCard';
import './Products.css';

const Products = () => {
  const [firstRowProducts, setFirstRowProducts] = useState([]);
  const [secondRowProducts, setSecondRowProducts] = useState([]);
  const [thirdRowProducts, setThirdRowProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);
  const containerRef3 = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products/', {
          params: {
            search,
            category: selectedCategory,
          },
        });
        const allProducts = response.data;
        /* setFirstRowProducts(allProducts.slice(0, 9));
        setSecondRowProducts(allProducts.slice(9, 14)); */
        setFirstRowProducts(allProducts.filter(product => product.category.name === "Planets"));
        setSecondRowProducts(allProducts.filter(product => product.category.name === "Moons"));
        setThirdRowProducts(allProducts.filter(product => product.category.name === "Constellations"));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error(err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories/');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [search, selectedCategory]);

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
      
      {/* <h1>Planets</h1> */}
      <div className="products-wrapper">
        <button className="scroll-button left" onClick={() => scrollLeft(containerRef1)}>
          &lt;
        </button>
        <div className="products-container" ref={containerRef1}>
          {firstRowProducts.map(product => (
            <div className="product-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scrollRight(containerRef1)}>
          &gt;
        </button>
      </div>


      {/* <h1>Moons</h1> */}
      <div className="products-wrapper">
        <button className="scroll-button left" onClick={() => scrollLeft(containerRef2)}>
          &lt;
        </button>
        <div className="products-container" ref={containerRef2}>
          {secondRowProducts.map(product => (
            <div className="product-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scrollRight(containerRef2)}>
          &gt;
        </button>
      </div>


      <div className="products-wrapper">
        <button className="scroll-button left" onClick={() => scrollLeft(containerRef3)}>
          &lt;
        </button>
        <div className="products-container" ref={containerRef3}>
          {thirdRowProducts.map(product => (
            <div className="product-card" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={() => scrollRight(containerRef3)}>
          &gt;
        </button>
      </div>



    </div>
  );
};

export default Products;
