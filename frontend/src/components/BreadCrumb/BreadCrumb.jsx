// src/components/Breadcrumb/Breadcrumb.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BreadCrumb.css';

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);


  // Function to capitalize the first letter and replace hyphens with spaces
  const formatBreadcrumb = (string) => {
    return string.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <nav className="breadcrumb">
      <ul className="breadcrumb-list">
        <li>
          <Link to="/your-account">Your Account</Link>
        </li>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <li key={to}>
              {/* <Link to={to}>{value}</Link> */}
              <Link to={to}>{formatBreadcrumb(value)}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BreadCrumb;
