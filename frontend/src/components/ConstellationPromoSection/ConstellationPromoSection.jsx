import React from 'react';
import './ConstellationPromoSection.css';
import { Link } from 'react-router-dom';

const ConstellationPromoSection = ({ imageSrc }) => {
  return (
    <div className="constellation-promo-section">
      <div className="constellation-promo-text">
        <h2>Explore Our Constellations!</h2>
        <p>Dive into the beauty of the night sky with our exclusive collection of constellations. Perfect for astronomy lovers and those who appreciate the wonders of the universe.</p>
        <Link to="/products" className="learn-more-link">Learn more</Link>
      </div>
      <div className="constellation-promo-image">
        <img src={imageSrc} alt="Constellation Promo" />
      </div>
    </div>
  );
}

export default ConstellationPromoSection;
