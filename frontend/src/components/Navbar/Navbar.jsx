import { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../Cart/CartContext';
import { AuthContext } from '../Auth/AuthContext';
import CartDrawer from '../Cart/CartDrawer';
import ProductsDrawer from '../ProductsDrawer/ProductsDrawer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isProductsDrawerOpen, setIsProductsDrawerOpen] = useState(false); // State for products drawer
  const { cart } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      navigate('/login');
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      userIconRef.current &&
      !userIconRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      setIsDropdownOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAuthenticated]);

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white border-gray-200">
      <div className="nav flex flex-wrap items-center justify-between mx-auto p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="lg:hidden inline-flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        <div className={`flex-grow ${isOpen ? 'block' : 'hidden'} lg:block w-full lg:w-auto`} id="mobile-menu">
          <ul className="test flex flex-col items-center mt-4 lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium">
            <li>
              <Link to="/" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700  lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLinkClick}>Home</Link>
            </li>
            <li>
              <Link to="/best-sellers" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700  lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLinkClick}>Best Sellers</Link>
            </li>
            <li>
              <Link to="/todays-deals" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700  lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLinkClick}>Today&apos;s Deals</Link>
            </li>


            <li className="relative">
              <button
                onClick={() => setIsProductsDrawerOpen(true)}
                
                className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded inline-flex items-center"
              >
                Products
                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
            </li>

            
            <li>
              <Link to="/gift-cards" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700  lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLinkClick}>Gift Cards</Link>
            </li>
            <li>
              <Link to="/gift-ideas" className="nav-text block py-2 pr-4 pl-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700  lg:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleLinkClick}>Gift Ideas</Link>
            </li>
          </ul>
        </div>

        {!isOpen && (
          <div className="navbar-icon flex items-center space-x-5">
            {isAuthenticated && user && (
              <span className="navbar-username">{user.username}</span>
            )}
            <div className="relative">
              <button 
                ref={userIconRef}
                onClick={handleUserIconClick} 
                className="text-gray-900 hover:text-blue-700"
              >
                <FontAwesomeIcon icon={faUser} size="lg" />
              </button>
              {isDropdownOpen && isAuthenticated && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg"
                  style={{ zIndex: 1000 }}
                >
                  <Link
                    to="/your-account"
                    className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Your Account
                  </Link>
                  <Link
                    to="/your-orders"
                    className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Your Orders
                  </Link>
                  <Link
                    to="/buy-again"
                    className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100"
                    onClick={handleLinkClick}
                  >
                    Buy Again
                  </Link>
                  <button
                    onClick={() => {
                      handleLinkClick();
                      logout();
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-900 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={() => setIsCartDrawerOpen(true)} 
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
        )}
      </div>

      <CartDrawer isOpen={isCartDrawerOpen} onClose={() => setIsCartDrawerOpen(false)} />
      {/* <ProductsDrawer isOpen={isProductsDrawerOpen} onClose={() => setIsProductsDrawerOpen(false)} /> */}
      <ProductsDrawer isOpen={isProductsDrawerOpen} onClose={() => { setIsProductsDrawerOpen(false); handleLinkClick(); }} /> {/* Pass handleLinkClick to ProductsDrawer */}
    </nav>
  );
};

export default Navbar;













