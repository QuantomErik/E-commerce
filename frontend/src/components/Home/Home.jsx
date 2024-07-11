
import { Link } from 'react-router-dom';
import Products from '../Products/Products';
import Carousell from '../Carousell/Carousell';
import Footer from '../Footer/Footer';
import '../../App.css'

function Home() {
  return (
    <div>
     
      <Carousell />
      <Products />  {/* This line includes the Products component on the home page */}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
