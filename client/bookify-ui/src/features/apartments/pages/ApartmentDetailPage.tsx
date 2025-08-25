// // src/features/apartments/pages/ApartmentDetailPage.tsx
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getApartments, type Apartment } from "../api/apartmentApi";

// const ApartmentDetailPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [apartment, setApartment] = useState<Apartment | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchApartment = async () => {
//       const apartments = await getApartments();
//       const found = apartments.find((a) => a.id === Number(id));
//       setApartment(found || null);
//       setLoading(false);
//     };
//     fetchApartment();
//   }, [id]);

//   if (loading) {
//     return <p className="text-center text-gray-500">Loading apartment...</p>;
//   }

//   if (!apartment) {
//     return <p className="text-center text-red-500">Apartment not found.</p>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
//       <img
//         src={apartment.image}
//         alt={apartment.title}
//         className="w-full h-64 object-cover rounded-md mb-4"
//       />
//       <h1 className="text-3xl font-bold text-blue-600">{apartment.title}</h1>
//       <p className="text-gray-600">{apartment.location}</p>
//       <p className="text-xl font-semibold mt-2">
//         ₹{apartment.pricePerNight} / night
//       </p>
//       <p className="text-gray-500 mt-1">
//         Available: {apartment.availableFrom} → {apartment.availableTo}
//       </p>

//       <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full">
//         Book This Apartment
//       </button>
//     </div>
//   );
// };

// export default ApartmentDetailPage;
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ArrowLeft, Heart, Share, Star, MapPin, Users, Bed, Bath, 
  Square, ChevronLeft, ChevronRight, Play, 
  Check, X, Phone, Mail, MessageCircle
} from 'lucide-react';
import type { ApartmentDetail } from '../models/ApartmentDetail';
import { getApartmentById } from '../api/apartmentApi';
import AmenityItem from '../components/AmenityItem';

const ApartmentDetailPage = () => {
   const { id } = useParams<{ id: string }>();
   const [apartment, setApartment] = useState<ApartmentDetail | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
    const fetchApartment = async () => {
      const apartments = await getApartmentById(1);
      const found = apartments;//.find((a) => a.id === Number(id));
      setApartment(found || null);
     // setLoading(false);
    };
    fetchApartment();
  }, [id]);

if(apartment==null)
  return
(
  <div></div>
)
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === apartment.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? apartment.images.length - 1 : prev - 1
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'location', label: 'Location' },
    { id: 'policies', label: 'Policies' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-8 mt-10">
        {/* Back Button & Actions */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to listings</span>
          </button>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <Share className="w-5 h-5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 transition-colors ${
                isFavorite ? 'text-pink-400' : 'text-gray-300 hover:text-pink-400'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">
                {isFavorite ? 'Saved' : 'Save'}
              </span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden">
                <img
                  src={apartment.images[currentImageIndex]}
                  alt={apartment.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {apartment.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {apartment.images.length}
                </div>

                {/* Virtual Tour Button */}
                <button className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/30 transition-all">
                  <Play className="w-4 h-4" />
                  <span>Virtual Tour</span>
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {apartment.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-purple-400' 
                        : 'border-transparent hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Header */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">{apartment.rating}</span>
                  <span className="text-gray-400">({apartment.reviews} reviews)</span>
                </div>
                <div className="text-gray-400">•</div>
                <div className="flex items-center gap-1 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span>{apartment.location}</span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{apartment.title}</h1>
              <p className="text-gray-300 mb-6">{apartment.address}</p>

              {/* Key Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>{apartment.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-purple-400" />
                  <span>{apartment.bedrooms} bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="w-4 h-4 text-purple-400" />
                  <span>{apartment.bathrooms} bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="w-4 h-4 text-purple-400" />
                  <span>{apartment.area} sq ft</span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-white/20">
              <div className="flex gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-4 px-2 whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'text-white border-b-2 border-purple-400'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">About this place</h3>
                    <div className="text-gray-300 leading-relaxed space-y-4">
                      {apartment.description.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>

                  {/* Host Info */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-4">Hosted by {apartment.host.name}</h3>
                    <div className="flex items-center gap-4">
                      <img
                        src={apartment.host.avatar}
                        alt={apartment.host.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{apartment.host.name}</span>
                          {apartment.host.verified && (
                            <div className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                              Verified
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-300 space-y-1">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>{apartment.host.rating} • {apartment.host.reviews} reviews</span>
                          </div>
                          <div>Response time: {apartment.host.responseTime}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Contact Host
                      </button>
                      <button className="bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}

               {activeTab === 'amenities' && (
        <div>
          <h3 className="text-xl font-semibold mb-6">What this place offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apartment.amenities
              .slice(0, showAllAmenities ? apartment.amenities.length : 6)
              .map((amenity, index) => (
                <AmenityItem
                  key={index}
                  name={amenity.name}
                  icon={amenity.icon}
                  included={amenity.included}
                />
              ))}
          </div>
          {apartment.amenities.length > 6 && (
            <button
              onClick={() => setShowAllAmenities(!showAllAmenities)}
              className="mt-4 text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showAllAmenities ? 'Show less' : `Show all ${apartment.amenities.length} amenities`}
            </button>
          )}
        </div>
      )}

              {activeTab === 'location' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Where you'll be</h3>
                  
                  {/* Map Placeholder */}
                  <div className="bg-gray-800 rounded-xl h-64 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <MapPin className="w-12 h-12 mx-auto mb-4" />
                      <p>Interactive map would be displayed here</p>
                      <p className="text-sm mt-2">{apartment.address}</p>
                    </div>
                  </div>

                  {/* Nearby Places */}
                  <div>
                    <h4 className="font-semibold mb-4">What's nearby</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {apartment.nearbyPlaces.map((place, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <div className="font-medium">{place.name}</div>
                            <div className="text-sm text-gray-400">{place.type}</div>
                          </div>
                          <div className="text-purple-400">{place.distance}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'policies' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">House rules & policies</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Check-in / Check-out</h4>
                        <div className="text-gray-300 space-y-1">
                          <div>Check-in: {apartment.policies.checkIn}</div>
                          <div>Check-out: {apartment.policies.checkOut}</div>
                          <div>Minimum stay: {apartment.policies.minStay} nights</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Cancellation</h4>
                        <p className="text-gray-300">{apartment.policies.cancellation}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Additional Rules</h4>
                        <div className="text-gray-300 space-y-2">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <span>Pets allowed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-400" />
                            <span>Smoking allowed</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-red-400" />
                            <span>No parties or events</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
               
              {/* Price */}
<div className="mb-6">
  <div className="flex items-baseline gap-2 mb-2">
    <span className="text-3xl font-bold">${apartment.price}</span>
    <span className="text-gray-400">/ night</span>
    {apartment.originalPrice && apartment.originalPrice > apartment.price && (
      <span className="text-lg text-gray-400 line-through ml-2">
        ${apartment.originalPrice}
      </span>
    )}
  </div>
  {apartment.originalPrice && apartment.originalPrice > apartment.price && (
    <div className="bg-green-500 text-white px-2 py-1 rounded text-sm inline-block">
      Save ${apartment.originalPrice - apartment.price} per night
    </div>
  )}
</div>

                {/* Booking Form */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Check-in</label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Check-out</label>
                      <input
                        type="date"
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      {[1,2,3,4,5,6].map(num => (
                        <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Pricing Breakdown */}
                <div className="border-t border-white/20 pt-4 mb-6 space-y-2">
                  <div className="flex justify-between">
                    <span>${apartment.price} x 3 nights</span>
                    <span>${apartment.price * 3}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$50</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$75</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t border-white/20 pt-2 mt-4">
                    <span>Total</span>
                    <span>${apartment.price * 3 + 50 + 75}</span>
                  </div>
                </div>

                {/* Book Button */}
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg mb-4">
                  Reserve Now
                </button>

                <p className="text-sm text-gray-400 text-center mb-4">
                  You won't be charged yet
                </p>

                {/* Contact Options */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetailPage;