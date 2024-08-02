import React from 'react';
import './MoonPromoSection.css';
import { Link } from 'react-router-dom';

const MoonPromoSection = ({ imageSrc }) => {
  return (
    <div className="moon-promo-section">
      <div className="moon-promo-image">
        <img src={imageSrc} alt="Moon Promo" />
      </div>
      <div className="moon-promo-text">
        <h2>Discover Our Moons!</h2>
        <p>Explore the beauty of our unique moons. Whether you're looking to add a celestial touch to your collection or searching for a special gift, our moons are the perfect choice. Each one is a piece of art, capturing the essence of the night sky.</p>
        <Link to="/products" className="learn-more-link">Learn more</Link>
        
      </div>
    </div>
  );
}

export default MoonPromoSection;
