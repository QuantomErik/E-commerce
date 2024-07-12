import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../Cart/CartContext';
import { AuthContext } from '../Auth/AuthContext';
import CartDrawer from '../Cart/CartDrawer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    // Close dropdown on successful login
    if (isAuthenticated) {
      setIsDropdownOpen(false);
    }
  }, [isAuthenticated]);

  return (
    <nav className="bg-white border-gray-200">
      <div className="nav flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="md:hidden inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className={`flex-grow ${isOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`} id="mobile-menu">
          <ul className="test flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <Link to="/" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/bestsellers" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white">Best Sellers</Link>
            </li>
            <li>
              <Link to="/todaysdeals" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white">Todays Deals</Link>
            </li>
            <li>
              <Link to="/giftcards" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white">Gift Cards</Link>
            </li>
            <li>
              <Link to="/giftideas" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white">Gift Ideas</Link>
            </li>
            
            <li>
              <Link to="/giftideas" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white">Gift Ideas</Link>
            </li>
            
          </ul>
        </div>

        <div className="navbar-icon flex items-center space-x-5">
          <div className="relative">
            <button 
              onClick={handleUserIconClick} 
              className="text-gray-900 hover:text-blue-700"
            >
              <FontAwesomeIcon icon={faUser} size="lg" />
            </button>
            {isDropdownOpen && isAuthenticated && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg" style={{ zIndex: 1000 }}>
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <button 
            onClick={() => setIsDrawerOpen(true)} 
            className="text-gray-900 hover:text-blue-700 relative"
          >
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 inline-block w-4 h-4 bg-red-600 text-white text-xs font-bold text-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </nav>
  );
};

export default Navbar;
