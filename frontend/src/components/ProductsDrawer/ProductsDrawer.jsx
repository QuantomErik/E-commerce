import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api';
import './ProductsDrawer.css';
import { FaTimes } from 'react-icons/fa';

const ProductsDrawer = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (category) => {
    const isExpanded = expandedCategories[category.id];

    if (isExpanded) {
      setExpandedCategories(prevState => ({
        ...prevState,
        [category.id]: false
      }));
    } else {
      setExpandedCategories(prevState => ({
        ...prevState,
        [category.id]: true
      }));
      if (!products[category.id]) {
        try {
          const response = await api.get(`/api/products/?category=${category.id}`);
          setProducts(prevState => ({
            ...prevState,
            [category.id]: response.data
          }));
        } catch (error) {
          console.error('Failed to fetch products:', error);
        }
      }
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <div
        className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'} bg-white w-80 border border-gray-300`}
      >
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center"
        >
          <FaTimes />
        </button>
        <h2 className="mb-4 text-xl font-semibold">Products</h2>

        <hr className="section-divider" />

        <ul>
          <li className="products-drawer-category mb-2">
            <Link to="/products" onClick={onClose} className="hover:underline">All Products</Link>
          </li>

          
          {categories.map(category => (
            <li key={category.id} className="products-drawer-category mb-2">
              <button
                onClick={() => handleCategoryClick(category)}
                className="text-left w-full hover:underline"
              >
                {category.name}
              </button>
              {expandedCategories[category.id] && (
                <ul className="pl-4 mt-2">
                  {(products[category.id] || []).map(product => (
                    <li key={product.id} className="mb-1">
                      <Link to={`/products/${product.id}`} onClick={onClose} className="products-drawer-category hover:underline">
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProductsDrawer;
