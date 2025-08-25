import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, Star, Wifi, Car, Waves, Dumbbell, Shield, ChevronRight, Heart, Filter } from 'lucide-react';
import { getHomePageApartments, type ApartmentHomePage } from '../api/HomePageApi';

const HomePage = () => {
  const [apartments , setApartments] = useState<ApartmentHomePage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [selectedFilters, setSelectedFilters] = useState({
  //   priceRange: 'all',
  //   bedrooms: 'all',
  //   amenities: []
  // });
  const [favorites, setFavorites] = useState(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
      const fetchData = async () => {
          setIsLoaded(true);
          try {
            const data = await getHomePageApartments();
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

  // const apartments = [
  //   {
  //     id: 1,
  //     title: "Skyline Penthouse Suite",
  //     location: "Manhattan, New York",
  //     price: 850,
  //     rating: 4.9,
  //     reviews: 127,
  //     bedrooms: 3,
  //     bathrooms: 2,
  //     image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
  //     amenities: ['wifi', 'pool', 'gym', 'parking', 'security'],
  //     featured: true
  //   },
  //   {
  //     id: 2,
  //     title: "Modern Loft Downtown",
  //     location: "SoHo, New York",
  //     price: 620,
  //     rating: 4.8,
  //     reviews: 89,
  //     bedrooms: 2,
  //     bathrooms: 1,
  //     image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=500&fit=crop",
  //     amenities: ['wifi', 'gym', 'security'],
  //     featured: false
  //   },
  //   {
  //     id: 3,
  //     title: "Luxury Waterfront Vista",
  //     location: "Brooklyn, New York",
  //     price: 750,
  //     rating: 4.9,
  //     reviews: 156,
  //     bedrooms: 2,
  //     bathrooms: 2,
  //     image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=500&fit=crop",
  //     amenities: ['wifi', 'pool', 'parking', 'security'],
  //     featured: true
  //   },
  //   {
  //     id: 4,
  //     title: "Urban Studio Retreat",
  //     location: "Chelsea, New York",
  //     price: 480,
  //     rating: 4.7,
  //     reviews: 73,
  //     bedrooms: 1,
  //     bathrooms: 1,
  //     image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
  //     amenities: ['wifi', 'gym', 'security'],
  //     featured: false
  //   },
  //   {
  //     id: 5,
  //     title: "Executive Garden Suite",
  //     location: "Upper East Side, New York",
  //     price: 920,
  //     rating: 5.0,
  //     reviews: 201,
  //     bedrooms: 4,
  //     bathrooms: 3,
  //     image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
  //     amenities: ['wifi', 'pool', 'gym', 'parking', 'security'],
  //     featured: true
  //   },
  //   {
  //     id: 6,
  //     title: "Minimalist City Flat",
  //     location: "Tribeca, New York",
  //     price: 680,
  //     rating: 4.8,
  //     reviews: 94,
  //     bedrooms: 2,
  //     bathrooms: 1,
  //     image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=500&fit=crop",
  //     amenities: ['wifi', 'parking', 'security'],
  //     featured: false
  //   }
  // ];

  const amenityIcons :Record<string, React.ComponentType<any>> =  {
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

  const filteredApartments = apartments.filter(apt => 
    apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apt.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const featuredApartments = filteredApartments.filter(apt => apt.featured);
  const regularApartments = filteredApartments.filter(apt => !apt.featured);

  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 mb-6">
              Luxury Living
              <span className="block text-5xl mt-2">Redefined</span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover premium apartments in the world's most desirable locations. Your perfect home awaits.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by location or property name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="relative">
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all appearance-none">
                    <option value="">Guests</option>
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="6">6+ Guests</option>
                  </select>
                </div>
              </div>
              <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-8 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg">
                Search Premium Properties
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Filter className="text-purple-400 w-5 h-5" />
            <span className="text-white font-semibold">Filters:</span>
            <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="all">All Prices</option>
              <option value="low">Under $500</option>
              <option value="mid">$500 - $800</option>
              <option value="high">Above $800</option>
            </select>
            <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400">
              <option value="all">All Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3+ Bedrooms</option>
            </select>
          </div>
          <div className="text-gray-300">
            {filteredApartments.length} properties found
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      {featuredApartments.length > 0 && (
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredApartments.map((apartment, index) => (
              <div
                key={apartment.id}
                className={`group relative bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                  Featured
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={() => toggleFavorite(apartment.id)}
                    className={`p-2 rounded-full transition-all ${favorites.has(apartment.id) ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-pink-500'}`}
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
                      <span className="text-3xl font-bold text-white">${apartment.price}</span>
                      <span className="text-gray-400 text-sm">/night</span>
                    </div>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center gap-2 group">
                      Book Now
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular Properties */}
      {regularApartments.length > 0 && (
        <div className="container mx-auto px-6 py-8">
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <div className="w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full"></div>
            All Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {regularApartments.map((apartment, index) => (
              <div
                key={apartment.id}
                className={`group bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-lg border border-white/20 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-xl ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${(featuredApartments.length + index) * 0.1}s` }}
              >
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => toggleFavorite(apartment.id)}
                    className={`p-2 rounded-full transition-all ${favorites.has(apartment.id) ? 'bg-pink-500 text-white' : 'bg-white/20 text-white hover:bg-pink-500'}`}
                  >
                    <Heart className="w-4 h-4" fill={favorites.has(apartment.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={apartment.image}
                    alt={apartment.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{apartment.rating}</span>
                      <span className="text-gray-400 text-xs">({apartment.reviews})</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300 text-xs">
                      <span>{apartment.bedrooms} bed</span>
                      <span>{apartment.bathrooms} bath</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                    {apartment.title}
                  </h3>
                  <div className="flex items-center gap-1 text-gray-300 mb-3">
                    <MapPin className="w-3 h-3" />
                    <span className="text-xs">{apartment.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {apartment.amenities.slice(0, 3).map((amenity) => {
                      const Icon = amenityIcons[amenity];
                      return (
                        <div key={amenity} className="bg-white/10 p-1.5 rounded">
                          <Icon className="w-3 h-3 text-indigo-400" />
                        </div>
                      );
                    })}
                    {apartment.amenities.length > 3 && (
                      <div className="bg-white/10 p-1.5 rounded text-xs text-gray-300">
                        +{apartment.amenities.length - 3}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-white">${apartment.price}</span>
                      <span className="text-gray-400 text-xs">/night</span>
                    </div>
                    <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
     
    </div>
  );
};

export default HomePage;