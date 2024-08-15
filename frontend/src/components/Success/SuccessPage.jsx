import { useLocation, Link } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  const location = useLocation();
  const { state } = location;

  if (!state) {
    return (
      <div className="success-container">
        <div className="success-card text-center">
          <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
          <p>No order details available.</p>
          <Link to="/" className="success-link">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="success-container">
      <div className="success-card">
        <h1 className="text-3xl font-bold mb-6 success-header">Order Confirmation</h1>
        <p className="text-lg mb-4 success-subtitle">Thank you for your purchase!</p>
        <div className="success-section">
          <h2 className="text-xl font-semibold mb-4">Items Purchased</h2>
          <ul className="divide-y divide-gray-300">
            {state.cartItems.map((item) => (
              <li key={item.id} className="success-item">
                <span className="font-medium">{item.name}</span>
                <div>
                  {item.discountedPrice && item.discountedPrice !== item.price ? (
                    <>
                      <span className="line-through text-gray-600">${item.price}</span>
                      <span className="font-bold text-red-500 ml-2">${item.discountedPrice}</span>
                    </>
                  ) : (
                    <span>${item.price}</span>
                  )}
                  <span> x {item.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right">
            <p className="text-lg font-semibold">Total: ${state.totalAmount}</p>
          </div>
        </div>
        <div className="mt-6 success-section">
          <h2 className="text-xl font-semibold mb-4">Order Details</h2>
          <div className="mb-2">
            <span className="font-medium">Email:</span> {state.email}
          </div>
          <div className="mb-2">
            <span className="font-medium">Cardholder Name:</span> {state.cardholderName}
          </div>
          <div className="mb-2">
            <span className="font-medium">Card Number:</span> {state.maskedCardNumber}
          </div>
        </div>
        <Link to="/" className="success-link">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;



