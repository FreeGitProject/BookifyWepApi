// Common base interface that contains shared properties
export interface ApartmentBase {
  id: number;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  maxGuests: number;
  propertyType: string;

  // Keeping old fields as optional for backward compatibility
  pricePerNight?: number;
  availableFrom?: string;
  availableTo?: string;
}