import { useEffect, useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import PropTypes from 'prop-types';
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

  if (loading) return <p>Loading today&apos;s deals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="todays-deals-container">
      <h2 className="text-2xl font-bold mb-4">Today&apos;s Deals</h2>
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

// Define PropTypes
TodaysDeals.propTypes = {
  onOpenCartDrawer: PropTypes.func.isRequired,
};

export default TodaysDeals;






