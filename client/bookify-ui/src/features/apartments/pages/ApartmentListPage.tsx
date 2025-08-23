// src/features/apartments/pages/ApartmentListPage.tsx
import { useEffect, useState } from "react";
import { getApartments, type Apartment } from "../api/apartmentApi";
import ApartmentCard from "../components/ApartmentCard";

const ApartmentListPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getApartments();
      setApartments(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading apartments...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Available Apartments
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment.id} apartment={apartment} />
        ))}
      </div>
    </div>
  );
};

export default ApartmentListPage;
