// src/components/Footer/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-column">
        <h4>About Us</h4>
        <p>We are a leading eCommerce site offering a wide range of products at the best prices. Our mission is to provide a seamless online shopping experience.</p>
      </div>
      <div className="footer-column">
        <h4>Information</h4>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/terms">Terms & Conditions</Link></li>
          <li><Link to="/privacy">Privacy Policy</Link></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Support</h4>
        <ul>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/shipping">Shipping & Returns</Link></li>
          <li><Link to="/support">Customer Support</Link></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>FAQ</h4>
        <ul>
          <li><Link to="/faq#payment">Payment Methods</Link></li>
          <li><Link to="/faq#shipping">Shipping Information</Link></li>
          <li><Link to="/faq#returns">Returns & Refunds</Link></li>
        </ul>
      </div>
      <div className="footer-column">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
