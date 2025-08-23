import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          🏢 ApartmentBooking
        </Link>

        {/* Navigation */}
        <nav className="space-x-6">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/apartments" className="hover:text-gray-200">Apartments</Link>
          <Link to="/bookings" className="hover:text-gray-200">My Bookings</Link>
          <Link to="/profile" className="hover:text-gray-200">Profile</Link>
          <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
