const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-200 mt-10">
      <div className="container mx-auto p-4 text-center">
        <p>© {new Date().getFullYear()} ApartmentBooking. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
