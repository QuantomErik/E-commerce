import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Products from '../Products/Products';
import PlanetPromoSection from '../PlanetPromoSection/PlanetPromoSection';
import MoonPromoSection from '../MoonPromoSection/MoonPromoSection';
import ConstellationPromoSection from '../ConstellationPromoSection/ConstellationPromoSection';
import api from '../../api';
import '../../App.css'

function Home({ onOpenCartDrawer }) {
  const [firstRowProducts, setFirstRowProducts] = useState([]);
  const [secondRowProducts, setSecondRowProducts] = useState([]);
  const [thirdRowProducts, setThirdRowProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products/');
        console.log('Fetch Products Response:', response);
        const allProducts = response.data.map(product => ({
          ...product,
          price: parseFloat(product.price), // Ensure price is a number
        }));

        setFirstRowProducts(allProducts.filter(product => product.category.name === "Planets"));
        setSecondRowProducts(allProducts.filter(product => product.category.name === "Moons"));
        setThirdRowProducts(allProducts.filter(product => product.category.name === "Constellations"));

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
        console.error('Fetch Products Error:', err);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <PlanetPromoSection imageSrc="/ecommerce/images/PlanetPromo.jpg"/>
      <Products products={firstRowProducts} onOpenCartDrawer={onOpenCartDrawer} categoryName="Planets" />
      <MoonPromoSection imageSrc="/ecommerce/images/forest-ice-blue-moon.jpeg"/>
      <Products products={secondRowProducts} onOpenCartDrawer={onOpenCartDrawer} categoryName="Moons" />
      <ConstellationPromoSection imageSrc="/ecommerce/images/Panther-constellation2.png"/>
      <Products products={thirdRowProducts} onOpenCartDrawer={onOpenCartDrawer} categoryName="Constellations" />
    </div>
  );
}

Home.propTypes = {
  onOpenCartDrawer: PropTypes.func.isRequired,
};

export default Home;
