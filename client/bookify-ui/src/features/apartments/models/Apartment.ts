import type { ApartmentBase } from "./ApartmentBase";

export interface Apartment extends ApartmentBase {
      host: string;
  image: string;
  amenities: string[];
  featured: boolean;
}