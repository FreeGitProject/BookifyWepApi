import type { ApartmentBase } from "./ApartmentBase";

// Interface for apartment details (extends base)
export interface ApartmentDetail extends ApartmentBase {
  images: string[];
  amenities: Amenity[];
  description: string;
  address: string;
  host: HostDetails;
  nearbyPlaces: NearbyPlace[];
  policies: Policies;
}
export interface Amenity {
  name: string;
  icon: string;
  included: boolean;
}

export interface HostDetails {
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  verified: boolean;
  responseTime: string;
}

export interface NearbyPlace {
  name: string;
  distance: string;
  type: string;
}

export interface Policies {
  checkIn: string;
  checkOut: string;
  minStay: number;
  cancellation: string;
}
