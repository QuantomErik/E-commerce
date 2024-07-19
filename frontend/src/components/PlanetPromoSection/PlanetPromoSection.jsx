import React from 'react';
import './PlanetPromoSection.css'; // Ensure this file is created for custom styles if needed

const PlanetPromoSection = ({ imageSrc }) => {
  return (
    <div className="promo-section">
      <div className="promo-text">
        <h2>Explore the Universe!</h2>
        <p>Discover and own a piece of the cosmos. Our store offers a unique collection of planets, star constellations, and moons that you can call your own. Perfect for enthusiasts and collectors alike!</p>
      </div>
      <div className="promo-image">
        <img src={imageSrc} alt="Promo" />
      </div>
    </div>
  );
}

export default PlanetPromoSection;
