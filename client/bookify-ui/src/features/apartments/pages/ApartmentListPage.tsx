// // src/features/apartments/pages/ApartmentListPage.tsx
// import { useEffect, useState } from "react";
// import { getApartments, type Apartment } from "../api/apartmentApi";
// import ApartmentCard from "../components/ApartmentCard";

// const ApartmentListPage = () => {
//   const [apartments, setApartments] = useState<Apartment[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getApartments();
//       setApartments(data);
//       setLoading(false);
//     };
//     fetchData();
//   }, []);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading apartments...</p>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
//         Available Apartments
//       </h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {apartments.map((apartment) => (
//           <ApartmentCard key={apartment.id} apartment={apartment} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ApartmentListPage;
import React, { useState, useEffect } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, Star, Heart, 
  Users, Bed, Bath, Square, Wifi, Car, Waves, Dumbbell, 
  Shield, ChevronDown, Grid3X3, List, Map, Eye, X
} from 'lucide-react';
import { getApartments} from '../api/apartmentApi';
import type { Apartment } from '../models/Apartment';
import { Link } from 'react-router-dom';

const ApartmentListPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid', 'list', 'map'
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 3, 5]));
  const [sortBy, setSortBy] = useState('featured');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    bedrooms: [] as string[],
    bathrooms: [] as string[],
    amenities: [] as string[],
    propertyType: [] as string[],
    rating: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);
      try {
        const data = await getApartments();
        setApartments(data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      } 
      // finally {
      //   setIsLoaded(false);
      // }
    };
    fetchData();
  }, []);

  const amenityIcons: Record<string, React.ComponentType<any>> = {
    wifi: Wifi,
    pool: Waves,
    gym: Dumbbell,
    parking: Car,
    security: Shield
  };

  const toggleFavorite = (id: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleViewApartment = (id: number) => {
    // In real app, navigate to /apartments/{id}
    console.log(`Navigate to apartment ${id}`);
  };

  // Filter and sort apartments
  const filteredApartments = apartments.filter(apt => {
    const matchesSearch = apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPrice = apt.price >= filters.priceRange[0] && apt.price <= filters.priceRange[1];
    
    const matchesBedrooms = filters.bedrooms.length === 0 || filters.bedrooms.includes(apt.bedrooms.toString());
    
    const matchesBathrooms = filters.bathrooms.length === 0 || filters.bathrooms.includes(apt.bathrooms.toString());
    
    const matchesRating = apt.rating >= filters.rating;
    
    const matchesPropertyType = filters.propertyType.length === 0 || filters.propertyType.includes(apt.propertyType);

    return matchesSearch && matchesPrice && matchesBedrooms && matchesBathrooms && matchesRating && matchesPropertyType;
  });

  const sortedApartments = [...filteredApartments].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default: // featured
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });

  interface PropertyCardProps {
    apartment: Apartment;
    index: number;
  }

  const PropertyCard = ({ apartment, index }: PropertyCardProps) => (
    <div
      className={`group bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {apartment.featured && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
          Featured
        </div>
      )}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => toggleFavorite(apartment.id)}
          className={`p-2 rounded-full transition-all ${
            favorites.has(apartment.id) ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-pink-500'
          }`}
        >
          <Heart className="w-4 h-4" fill={favorites.has(apartment.id) ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="relative h-64 overflow-hidden">
        <img
          src={apartment.image}
          alt={apartment.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {apartment.originalPrice && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
            Save ${apartment.originalPrice - apartment.price}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-semibold">{apartment.rating}</span>
            <span className="text-gray-400 text-sm">({apartment.reviews})</span>
          </div>
          <div className="flex items-center gap-4 text-gray-300 text-sm">
            <span>{apartment.bedrooms} bed</span>
            <span>{apartment.bathrooms} bath</span>
            <span>{apartment.area} sq ft</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {apartment.title}
        </h3>
        <div className="flex items-center gap-2 text-gray-300 mb-4">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{apartment.location}</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          {apartment.amenities.slice(0, 4).map((amenity) => {
            const Icon = amenityIcons[amenity];
            return (
              <div key={amenity} className="bg-white/10 p-2 rounded-lg">
                <Icon className="w-4 h-4 text-purple-400" />
              </div>
            );
          })}
          {apartment.amenities.length > 4 && (
            <div className="bg-white/10 p-2 rounded-lg text-xs text-gray-300">
              +{apartment.amenities.length - 4}
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            {apartment.originalPrice && (
              <span className="text-gray-400 line-through text-lg mr-2">${apartment.originalPrice}</span>
            )}
            <span className="text-3xl font-bold text-white">${apartment.price}</span>
            <span className="text-gray-400 text-sm">/night</span>
          </div>
           <Link to={`/apartments/${apartment.id}`}>
          <button 
            onClick={() => handleViewApartment(apartment.id)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 group"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          </Link>
        </div>
      </div>
    </div>
  );

  const ListViewCard = ({ apartment, index }: PropertyCardProps) => (
    <div
      className={`group bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 overflow-hidden ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden">
          <img
            src={apartment.image}
            alt={apartment.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {apartment.featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded text-sm font-semibold">
              Featured
            </div>
          )}
          <button
            onClick={() => toggleFavorite(apartment.id)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
              favorites.has(apartment.id) ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-pink-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={favorites.has(apartment.id) ? 'currentColor' : 'none'} />
          </button>
        </div>
        
        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white font-semibold">{apartment.rating}</span>
                <span className="text-gray-400 text-sm">({apartment.reviews})</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400 text-sm">by {apartment.host}</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                {apartment.title}
              </h3>
              
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{apartment.location}</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-300 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{apartment.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{apartment.bedrooms} bed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-4 h-4" />
                  <span>{apartment.bathrooms} bath</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square className="w-4 h-4" />
                  <span>{apartment.area} sq ft</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {apartment.amenities.slice(0, 5).map((amenity) => {
                  const Icon = amenityIcons[amenity];
                  return (
                    <div key={amenity} className="bg-white/10 p-1.5 rounded">
                      <Icon className="w-3 h-3 text-purple-400" />
                    </div>
                  );
                })}
                {apartment.amenities.length > 5 && (
                  <span className="text-gray-400 text-sm">+{apartment.amenities.length - 5} more</span>
                )}
              </div>
            </div>
            
            <div className="text-right ml-6">
              <div className="mb-4">
                {apartment.originalPrice && (
                  <div className="text-gray-400 line-through text-lg">${apartment.originalPrice}</div>
                )}
                <div className="text-3xl font-bold text-white">${apartment.price}</div>
                <div className="text-gray-400 text-sm">per night</div>
              </div>
              
              <button 
                onClick={() => handleViewApartment(apartment.id)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-8 mt-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Premium Apartments</h1>
          <p className="text-gray-300 text-lg">Discover luxury living in the world's most desirable locations</p>
        </div>

        {/* Search & Filters Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by location or property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none min-w-[150px]"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'map' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Map className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Advanced Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-3">Price Range (per night)</label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({...filters, priceRange: [0, parseInt(e.target.value)]})}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>$0</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium mb-3">Bedrooms</label>
                <div className="flex flex-wrap gap-2">
                  {['1', '2', '3', '4+'].map(bed => (
                    <button
                      key={bed}
                      onClick={() => {
                        const bedrooms = filters.bedrooms.includes(bed) 
                          ? filters.bedrooms.filter(b => b !== bed)
                          : [...filters.bedrooms, bed];
                        setFilters({...filters, bedrooms});
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filters.bedrooms.includes(bed)
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {bed}
                    </button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium mb-3">Property Type</label>
                <div className="space-y-2">
                  {['apartment', 'penthouse', 'loft', 'studio', 'suite'].map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={filters.propertyType.includes(type)}
                        onChange={(e) => {
                          const propertyType = e.target.checked
                            ? [...filters.propertyType, type]
                            : filters.propertyType.filter(t => t !== type);
                          setFilters({...filters, propertyType});
                        }}
                        className="rounded border-gray-600 bg-white/10"
                      />
                      <span className="capitalize text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium mb-3">Minimum Rating</label>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map(rating => (
                    <button
                      key={rating}
                      onClick={() => setFilters({...filters, rating: filters.rating === rating ? 0 : rating})}
                      className={`flex items-center gap-2 w-full p-2 rounded-lg text-sm transition-colors ${
                        filters.rating === rating
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                      <span>{rating}+ stars</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6 pt-6 border-t border-white/20">
              <button
                onClick={() => setFilters({
                  priceRange: [0, 2000],
                  bedrooms: [],
                  bathrooms: [],
                  amenities: [],
                  propertyType: [],
                  rating: 0
                })}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">{sortedApartments.length} Properties Found</h2>
            {searchQuery && (
              <p className="text-gray-400 mt-1">Results for "{searchQuery}"</p>
            )}
          </div>
        </div>

        {/* Property Listings */}
        {viewMode === 'map' ? (
          <div className="bg-gray-800 rounded-2xl h-[600px] flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Map className="w-16 h-16 mx-auto mb-4" />
              <p className="text-xl mb-2">Interactive Map View</p>
              <p>Map integration would be displayed here</p>
            </div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-6">
            {sortedApartments.map((apartment, index) => (
              <ListViewCard key={apartment.id} apartment={apartment} index={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedApartments.map((apartment, index) => (
              <PropertyCard key={apartment.id} apartment={apartment} index={index} />
            ))}
          </div>
        )}

        {/* No Results */}
        {sortedApartments.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">No properties found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilters({
                  priceRange: [0, 2000],
                  bedrooms: [],
                  bathrooms: [],
                  amenities: [],
                  propertyType: [],
                  rating: 0
                });
              }}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors mt-4"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Load More */}
        {sortedApartments.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold transition-colors border border-white/20">
              Load More Properties
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentListPage;