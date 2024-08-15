import BreadCrumb from '../BreadCrumb/BreadCrumb';

const GiftCards = () => {
  return (
    <div className="container mx-auto my-10 p-5">
      <BreadCrumb />
    <div className="container mx-auto my-10 p-5 border border-gray-300 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Gift Cards</h1>
      <p>Purchase and manage your gift cards here.</p>
      <div className="mt-4">
        
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Available Gift Cards</h2>
          <p>$50 Gift Card</p>
          <button className="mt-2 text-blue-600">Buy Now</button>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Your Gift Cards</h2>
          <p>No Gift cards found.</p>
        </div>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Add Gift Card</button>
    </div>
    </div>
  );
};

export default GiftCards;
