// src/components/BuyAgain/BuyAgain.jsx

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthContext';
import { CartContext } from '../Cart/CartContext';
import api from '../../api';
import ProductCard from '../ProductCard/ProductCard'; // Assuming you have a reusable ProductCard component
import './BuyAgain.css'; // Create a CSS file to handle styles

const BuyAgain = ({ onOpenCartDrawer }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); // State for loading indicator
  const { isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext); // Use addToCart from CartContext

  useEffect(() => {
    if (isAuthenticated) {
      const fetchProducts = async () => {
        setLoading(true); // Set loading to true before fetching
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
          setLoading(false); // Set loading to false after fetching is complete
        }
      };

      fetchProducts();
    }
  }, [isAuthenticated]);

  return (
    <div className="buy-again-container container mx-auto my-10 p-5 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Buy Again</h1>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div> {/* Loader element */}
        </div>
      ) : products.length > 0 ? (
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onOpenCartDrawer={onOpenCartDrawer} />
          ))}
        </div>
      ) : (
        <p>You have no products to buy again.</p>
      )}
    </div>
  );
};

export default BuyAgain;
