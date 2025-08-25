export interface ApartmentHomePage{
  id: number;
  title: string;
  location: string;
  price: number;
//  originalPrice?: number;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  //area: number;
  //maxGuests: number;
  image: string;
  amenities: string[];
  featured: boolean;
}

export const getHomePageApartments = async (): Promise<ApartmentHomePage[]> =>{
      // Mock Data (later replace with API call using Axios)
    return [
    {
    id: 1,
    title: "Skyline Penthouse Suite",
    location: "Manhattan, New York",
    price: 850,
    rating: 4.9,
    reviews: 127,
    bedrooms: 3,
    bathrooms: 2,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
    amenities: ['wifi', 'pool', 'gym', 'parking', 'security'],
    featured: true
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
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
      amenities: ['wifi', 'gym', 'security'],
      featured: false
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
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
      amenities: ['wifi', 'pool', 'parking', 'security'],
      featured: true
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
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
      amenities: ['wifi', 'gym', 'security'],
      featured: false
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
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
      amenities: ['wifi', 'pool', 'gym', 'parking', 'security'],
      featured: true
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
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop",
      amenities: ['wifi', 'parking', 'security'],
      featured: false
    }
    ];
};