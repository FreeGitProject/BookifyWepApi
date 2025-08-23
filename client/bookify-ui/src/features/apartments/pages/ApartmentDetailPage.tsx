// src/features/apartments/pages/ApartmentDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApartments, type Apartment } from "../api/apartmentApi";

const ApartmentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartment = async () => {
      const apartments = await getApartments();
      const found = apartments.find((a) => a.id === Number(id));
      setApartment(found || null);
      setLoading(false);
    };
    fetchApartment();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading apartment...</p>;
  }

  if (!apartment) {
    return <p className="text-center text-red-500">Apartment not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <img
        src={apartment.image}
        alt={apartment.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-3xl font-bold text-blue-600">{apartment.title}</h1>
      <p className="text-gray-600">{apartment.location}</p>
      <p className="text-xl font-semibold mt-2">
        ₹{apartment.pricePerNight} / night
      </p>
      <p className="text-gray-500 mt-1">
        Available: {apartment.availableFrom} → {apartment.availableTo}
      </p>

      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full">
        Book This Apartment
      </button>
    </div>
  );
};

export default ApartmentDetailPage;
