const HomePage = () => {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to Apartment Booking
      </h1>
      <p className="text-lg text-gray-600">
        Find and book the best apartments with ease.
      </p>

      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Explore Apartments
      </button>
    </div>
  );
};

export default HomePage;
