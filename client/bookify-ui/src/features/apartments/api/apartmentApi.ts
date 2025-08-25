// src/features/apartments/api/apartmentApi.ts

import type { Apartment } from "../models/Apartment";
import type { ApartmentDetail } from "../models/ApartmentDetail";



export const getApartments = async (): Promise<Apartment[]> => {
  // Mock Data (later replace with API call using Axios)
  return [
    {
      id: 1,
      title: "Skyline Penthouse Suite",
      location: "Manhattan, New York",
      price: 850,
      originalPrice: 1200,
      rating: 4.9,
      reviews: 127,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      maxGuests: 6,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
      amenities: ['wifi', 'pool', 'gym', 'parking', 'security'],
      featured: true,
      propertyType: 'penthouse',
      host: 'Premium Host'
    },
    {
      id: 2,
      title: "Modern Loft Downtown",
      location: "SoHo, New York",
      price: 620,
      rating: 4.8,
      reviews: 89,
      bedrooms: 2,
      bathrooms: 1,
      area: 1200,
      maxGuests: 4,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      amenities: ['wifi', 'gym', 'security'],
      featured: false,
      propertyType: 'loft',
      host: 'Sarah Johnson'
    },
    {
      id: 3,
      title: "Luxury Waterfront Vista",
      location: "Brooklyn, New York",
      price: 750,
      rating: 4.9,
      reviews: 156,
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      maxGuests: 5,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
      amenities: ['wifi', 'pool', 'parking', 'security'],
      featured: true,
      propertyType: 'apartment',
      host: 'Mike Chen'
    },
    {
      id: 4,
      title: "Urban Studio Retreat",
      location: "Chelsea, New York",
      price: 480,
      rating: 4.7,
      reviews: 73,
      bedrooms: 1,
      bathrooms: 1,
      area: 800,
      maxGuests: 2,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
      amenities: ['wifi', 'gym', 'security'],
      featured: false,
      propertyType: 'studio',
      host: 'Emma Davis'
    },
    {
      id: 5,
      title: "Executive Garden Suite",
      location: "Upper East Side, New York",
      price: 920,
      rating: 5.0,
      reviews: 201,
      bedrooms: 4,
      bathrooms: 3,
      area: 2200,
      maxGuests: 8,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
      amenities: ['wifi', 'pool', 'gym', 'parking', 'security'],
      featured: true,
      propertyType: 'suite',
      host: 'Alex Rodriguez'
    },
    {
      id: 6,
      title: "Minimalist City Flat",
      location: "Tribeca, New York",
      price: 680,
      rating: 4.8,
      reviews: 94,
      bedrooms: 2,
      bathrooms: 1,
      area: 1100,
      maxGuests: 4,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
      amenities: ['wifi', 'parking', 'security'],
      featured: false,
      propertyType: 'apartment',
      host: 'Lisa Park'
    }
  ];
};


export const getApartmentById = async (id: number): Promise<ApartmentDetail | null> => {
  // Mock Data (later replace with API call using Axios)
  
  // Create a mapping of apartment details by ID
  const apartmentDetails: { [key: number]: ApartmentDetail } = {
    1: {
      id: 1,
      title: "Skyline Penthouse Suite",
      location: "Manhattan, New York",
      address: "432 Park Avenue, New York, NY 10022",
      price: 850,
      originalPrice: 1200,
      rating: 4.9,
      reviews: 127,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      maxGuests: 6,
      propertyType: 'penthouse',
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop"
      ],
      amenities: [
        { name: 'High-Speed WiFi', icon: 'Wifi', included: true },
        { name: 'Swimming Pool', icon: 'Waves', included: true },
        { name: 'Fitness Center', icon: 'Dumbbell', included: true },
        { name: 'Parking Garage', icon: 'Car', included: true },
        { name: '24/7 Security', icon: 'Shield', included: true },
        { name: 'Coffee Machine', icon: 'Coffee', included: true },
        { name: 'Air Conditioning', icon: 'Wind', included: true },
        { name: 'Concierge Service', icon: 'Phone', included: false },
        { name: 'Room Service', icon: 'Coffee', included: false }
      ],
      description: `Experience luxury living in this stunning penthouse suite located in the heart of Manhattan. This professionally designed apartment features floor-to-ceiling windows offering breathtaking city skyline views, premium finishes throughout, and access to world-class amenities.

The open-concept living space seamlessly blends modern design with comfort, featuring a gourmet kitchen with top-of-the-line appliances, spacious bedrooms with custom closets, and spa-like bathrooms with marble finishes.

Located in one of Manhattan's most prestigious buildings, you'll enjoy 24/7 concierge service, a rooftop terrace, fitness center, and swimming pool. The building is steps away from Central Park, fine dining, shopping, and public transportation.`,
      host: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b098?w=100&h=100&fit=crop&crop=face",
        rating: 4.95,
        reviews: 340,
        verified: true,
        responseTime: "within 1 hour"
      },
      nearbyPlaces: [
        { name: "Central Park", distance: "0.2 mi", type: "Park" },
        { name: "Museum of Modern Art", distance: "0.5 mi", type: "Museum" },
        { name: "Times Square", distance: "0.8 mi", type: "Landmark" },
        { name: "Grand Central", distance: "0.4 mi", type: "Transportation" }
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        minStay: 2,
        cancellation: "Free cancellation up to 48 hours before check-in"
      }
    },
    // You can add more apartments here with different IDs
    // 2: {
    //   // ... details for apartment with id 2
    // }
  };

  // Return the apartment with the requested ID or null if not found
  return apartmentDetails[id] || null;
};