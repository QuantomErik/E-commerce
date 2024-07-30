/* import React, { useEffect, useState } from 'react';
import { fetchDeals } from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import './TodaysDeals.css';

const TodaysDeals = ({ onOpenCartDrawer }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDeals = async () => {
      try {
        const data = await fetchDeals();
        setDeals(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch deals');
        setLoading(false);
      }
    };
    getDeals();
  }, []);

  if (loading) return <p>Loading today's deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="todays-deals-container">
      <h2 className="text-2xl font-bold mb-4">Today's Deals</h2>
      <div className="deals-grid">
        {deals.map(deal => (
          <ProductCard key={deal.product.id} product={deal.product} onOpenCartDrawer={onOpenCartDrawer} />
        ))}
      </div>
    </div>
  );
};

export default TodaysDeals;
 */


// TodaysDeals.jsx
/* import React, { useEffect, useState } from 'react';
import { fetchDeals } from '../../api';
import ProductCard from '../ProductCard/ProductCard';
import './TodaysDeals.css';

const TodaysDeals = ({ onOpenCartDrawer }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDeals = async () => {
      try {
        const data = await fetchDeals();
        setDeals(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch deals');
        setLoading(false);
      }
    };
    getDeals();
  }, []);

  if (loading) return <p>Loading today's deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="todays-deals-container">
      <h2 className="text-2xl font-bold mb-4">Today's Deals</h2>
      <div className="deals-grid">
        {deals.map(deal => (
          <ProductCard key={deal.id} product={deal} onOpenCartDrawer={onOpenCartDrawer} />
        ))}
      </div>
    </div>
  );
};

export default TodaysDeals; */


/* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import api from '../../api';
import './TodaysDeals.css';

const TodaysDeals = ({ onOpenCartDrawer }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await api.get('/api/todays-deals/');
        setDeals(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching deals:', err);
        setError('Failed to fetch deals');
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  if (loading) return <p>Loading today's deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="todays-deals-container">
      <h2 className="text-2xl font-bold mb-4">Today's Deals</h2>
      <div className="deals-grid">
        {deals.map(deal => (
          <ProductCard key={deal.id} product={deal} onOpenCartDrawer={onOpenCartDrawer} additionalClass="todays-deals" />
        ))}
      </div>
    </div>
  );
};

export default TodaysDeals; */


import React, { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import api from '../../api';
import './TodaysDeals.css';

const TodaysDeals = ({ onOpenCartDrawer }) => {
  const [deals, setDeals] = useState([]);
  const [sortOption, setSortOption] = useState('created_at');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await api.get('/api/todays-deals/', { params: { sort: sortOption } });
        setDeals(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching deals:', err);
        setError('Failed to fetch deals');
        setLoading(false);
      }
    };
    fetchDeals();
  }, [sortOption]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (loading) return <p>Loading today's deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="todays-deals-container">
      <h2 className="text-2xl font-bold mb-4">Today's Deals</h2>
      <div className="sort-options">
        <label htmlFor="sort" className="sort-label">Sort by:</label>
        <select id="sort" value={sortOption} onChange={handleSortChange} className="sort-select">
          <option value="created_at">Newest</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="discount-asc">Discount: Low to High</option>
          <option value="discount-desc">Discount: High to Low</option>
        </select>
      </div>
      <div className="deals-grid">
        {deals.map(deal => (
          <ProductCard key={deal.id} product={deal} onOpenCartDrawer={onOpenCartDrawer} additionalClass="todays-deals" />
        ))}
      </div>
    </div>
  );
};

export default TodaysDeals;






