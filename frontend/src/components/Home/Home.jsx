
import { Link } from 'react-router-dom';
import Products from '../Products/Products';
import Carousell from '../Carousell/Carousell';
import Footer from '../Footer/Footer';
import '../../App.css'

function Home({ onOpenCartDrawer }) {
  return (
    <div>
      <Carousell />
      <Products onOpenCartDrawer={onOpenCartDrawer} /> {/* Pass the prop here */}
    </div>
  );
}

export default Home;
