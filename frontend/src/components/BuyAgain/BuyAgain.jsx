/* import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { CartContext } from '../Cart/CartContext';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
import './BuyAgain.css';

const BuyAgain = ({ onOpenCartDrawer }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await api.get('/api/orders/');
          const orders = response.data;

          // Extract unique products
          const uniqueProductsMap = new Map();
          orders.forEach(order => {
            order.items.forEach(item => {
              if (!uniqueProductsMap.has(item.product.id)) {
                uniqueProductsMap.set(item.product.id, item.product);
              }
            });
          });

          setProducts([...uniqueProductsMap.values()]);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto my-10 p-5">
      <BreadCrumb />

      <div className="buy-again-container mx-auto my-10 p-5 rounded shadow-md">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold relative">
            Buy Again
            <span className="underline-active"></span>
          </h1>
          <Link to="/your-orders" className="your-orders-link text-xl font-bold relative">
            Your Orders
          </Link>
        </div>
        <div className="underline-container">
          <span className="underline-full"></span>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onOpenCartDrawer={onOpenCartDrawer} />
            ))}
          </div>
        ) : (
          <p>You have no products to buy again.</p>
        )}
      </div>
    </div>
  );
};

export default BuyAgain;
 */

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { CartContext } from '../Cart/CartContext';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { Link } from 'react-router-dom';
import './BuyAgain.css';

const BuyAgain = ({ onOpenCartDrawer }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await api.get('/api/orders/'); // Adjust the endpoint as needed
          const orders = response.data;

          // Extract unique products
          const uniqueProductsMap = new Map();
          orders.forEach(order => {
            order.items.forEach(item => {
              if (!uniqueProductsMap.has(item.product.id)) {
                uniqueProductsMap.set(item.product.id, item.product);
              }
            });
          });

          setProducts([...uniqueProductsMap.values()]);
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [isAuthenticated]);

  return (
    <div className="container mx-auto my-10 p-5">
      <BreadCrumb />

      <div className="buy-again-container mx-auto my-10 p-5 rounded shadow-md">
        <div className="flex items-center mb-4">
          <h1 className="text-xl font-bold relative">
            Buy Again
            <span className="underline-active"></span>
          </h1>
          <Link to="/your-orders" className="your-orders-link text-xl font-bold relative">
            Your Orders
          </Link>
        </div>
        <div className="underline-container">
          <span className="underline-full"></span>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="loader"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="products-grid grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onOpenCartDrawer={onOpenCartDrawer} additionalClass="buy-again-height" />
            ))}
          </div>
        ) : (
          <p>You have no products to buy again.</p>
        )}
      </div>
    </div>
  );
};

export default BuyAgain;
