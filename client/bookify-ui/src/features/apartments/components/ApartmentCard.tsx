// src/features/apartments/components/ApartmentCard.tsx

import { Link } from "react-router-dom";
import type { Apartment } from "../models/Apartment";
//import type { Apartment } from "../api/apartmentApi";

interface ApartmentCardProps {
  apartment: Apartment;
}

const ApartmentCard = ({ apartment }: ApartmentCardProps) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition">
        <Link to={`/apartments/${apartment.id}`}>
      <img
        src={apartment.image}
        alt={apartment.title}
        className="w-full h-48 object-cover"
      />
      </Link>
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold text-blue-600">{apartment.title}</h2>
        <p className="text-gray-600">{apartment.location}</p>
        <p className="font-bold text-gray-800">₹{apartment.pricePerNight} / night</p>
        <p className="text-sm text-gray-500">
          Available: {apartment.availableFrom} → {apartment.availableTo}
        </p>
        <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default ApartmentCard;
