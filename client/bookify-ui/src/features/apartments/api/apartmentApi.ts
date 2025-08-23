// src/features/apartments/api/apartmentApi.ts

export interface Apartment {
  id: number;
  title: string;
  location: string;
  pricePerNight: number;
  availableFrom: string;
  availableTo: string;
  image: string;
}

export const getApartments = async (): Promise<Apartment[]> => {
  // Mock Data (later replace with API call using Axios)
  return [
    {
      id: 1,
      title: "Luxury Apartment in Noida",
      location: "Noida, India",
      pricePerNight: 2500,
      availableFrom: "2025-09-01",
      availableTo: "2025-09-15",
      image: "https://picsum.photos/400/200?random=1",
    },
    {
      id: 2,
      title: "Cozy 2BHK in Bangalore",
      location: "Bangalore, India",
      pricePerNight: 1800,
      availableFrom: "2025-09-05",
      availableTo: "2025-09-20",
      image: "https://picsum.photos/400/200?random=2",
    },
    {
      id: 3,
      title: "Sea View Apartment in Goa",
      location: "Goa, India",
      pricePerNight: 3500,
      availableFrom: "2025-09-10",
      availableTo: "2025-09-25",
      image: "https://picsum.photos/400/200?random=3",
    },
  ];
};
