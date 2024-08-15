import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, openCartDrawer) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : null;

      if (existingProduct) {
        toast.info(`Increased quantity of ${product.name} in the cart.`);
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        toast.success(`${product.name} added to the cart.`);
        return [...prevCart, { ...product, quantity, discountedPrice }];
      }
    });

    if (openCartDrawer) {
      openCartDrawer();
    }
  };

  const addBundleToCart = (bundle, openCartDrawer) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      bundle.forEach((product) => {
        const existingProduct = newCart.find((item) => item.id === product.id);
        const discountedPrice = product.discount > 0 ? product.price * (1 - product.discount / 100) : null;

        if (existingProduct) {
          existingProduct.quantity += 1;
        } else {
          newCart.push({ ...product, quantity: 1, discountedPrice });
        }
      });
      toast.success('Bundle added to the cart.');
      return newCart;
    });

    if (openCartDrawer) {
      openCartDrawer();
    }
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((product) =>
        product.id === productId ? { ...product, quantity: Math.max(1, quantity) } : product
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, addBundleToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};




