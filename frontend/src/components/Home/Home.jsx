
import { Link } from 'react-router-dom';
import Products from '../Products/Products';
import Carousell from '../Carousell/Carousell';
import '../../App.css'

function Home() {
  return (
    <div>
      {/* <h1>Welcome to the Home Page</h1>
      <p>This is a simple landing page for the eCommerce site.</p> */}
      {/* <div>
        <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
      </div> */}
      <Carousell />
      <Products />  {/* This line includes the Products component on the home page */}
    </div>
  );
}

export default Home;
