import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  Save,
  X,
  Upload,
  Image as ImageIcon,
  MapPin,
  Star,
  Home,
  Users,
  DollarSign,
  Bed,
  Bath,
  Maximize,
  Camera,
  Settings,
  Tag,
  Navigation,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminApartmentDashboard = () => {
  const [apartments, setApartments] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('apartments');
  const [selectedApartment, setSelectedApartment] = useState(null);

  // Form state for apartment data
  const [apartmentForm, setApartmentForm] = useState({
    name: '',
    description: '',
    address: {
      country: '',
      state: '',
      zipCode: '',
      city: '',
      street: ''
    },
    price: {
      amount: '',
      currency: 'USD'
    },
    cleaningFee: {
      amount: '',
      currency: 'USD'
    },
    originalPrice: {
      amount: '',
      currency: 'USD'
    },
    bedrooms: '',
    bathrooms: '',
    area: '',
    maxGuests: '',
    rating: '',
    reviews: '',
    featured: false,
    propertyType: 1
  });

  // Mock data for demonstration
  const [mockApartments] = useState([
    {
      id: 1,
      name: "Seaside Villa Serenity",
      description: "A stunning modern villa with panoramic ocean views",
      address: {
        country: "United States",
        state: "California",
        zipCode: "90210",
        city: "Malibu",
        street: "23456 Pacific Coast Highway"
      },
      price: { amount: 875, currency: "USD" },
      cleaningFee: { amount: 150, currency: "USD" },
      originalPrice: { amount: 1050, currency: "USD" },
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      maxGuests: 6,
      rating: 4.92,
      reviews: 147,
      featured: true,
      propertyType: 1,
      images: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"
      ],
      amenities: [
        { type: 1, name: "WiFi", included: true },
        { type: 5, name: "Pool", included: true }
      ],
      nearbyPlaces: [
        { name: "Central Beach", distance: "0.2 mi", type: "Beach" },
        { name: "Luxury Shopping", distance: "0.5 mi", type: "Shopping" }
      ]
    }
  ]);

  const [imageUrls, setImageUrls] = useState(['']);
  const [amenities, setAmenities] = useState([{ type: 1, name: '', included: true }]);
  const [nearbyPlaces, setNearbyPlaces] = useState([{ name: '', distance: '', type: '' }]);

  useEffect(() => {
    setApartments(mockApartments);
  }, [mockApartments]);

  const resetForm = () => {
    setApartmentForm({
      name: '',
      description: '',
      address: {
        country: '',
        state: '',
        zipCode: '',
        city: '',
        street: ''
      },
      price: { amount: '', currency: 'USD' },
      cleaningFee: { amount: '', currency: 'USD' },
      originalPrice: { amount: '', currency: 'USD' },
      bedrooms: '',
      bathrooms: '',
      area: '',
      maxGuests: '',
      rating: '',
      reviews: '',
      featured: false,
      propertyType: 1
    });
    setImageUrls(['']);
    setAmenities([{ type: 1, name: '', included: true }]);
    setNearbyPlaces([{ name: '', distance: '', type: '' }]);
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setApartmentForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setApartmentForm(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSaveApartment = () => {
    const apartmentData = {
      ...apartmentForm,
      images: imageUrls.filter(url => url.trim()),
      amenities: amenities.filter(amenity => amenity.name.trim()),
      nearbyPlaces: nearbyPlaces.filter(place => place.name.trim())
    };

    if (editingId) {
      // Update existing apartment
      setApartments(prev => prev.map(apt => 
        apt.id === editingId ? { ...apartmentData, id: editingId } : apt
      ));
      setEditingId(null);
    } else {
      // Create new apartment
      setApartments(prev => [...prev, { ...apartmentData, id: Date.now() }]);
      setIsCreating(false);
    }

    resetForm();
    console.log('Apartment saved:', apartmentData);
  };

  const handleEditApartment = (apartment) => {
    setApartmentForm(apartment);
    setImageUrls(apartment.images || ['']);
    setAmenities(apartment.amenities || [{ type: 1, name: '', included: true }]);
    setNearbyPlaces(apartment.nearbyPlaces || [{ name: '', distance: '', type: '' }]);
    setEditingId(apartment.id);
    setIsCreating(true);
  };

  const handleDeleteApartment = (id) => {
    setApartments(prev => prev.filter(apt => apt.id !== id));
    console.log('Apartment deleted:', id);
  };

  const addImageUrl = () => {
    setImageUrls(prev => [...prev, '']);
  };

  const removeImageUrl = (index) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const updateImageUrl = (index, url) => {
    setImageUrls(prev => prev.map((item, i) => i === index ? url : item));
  };

  const addAmenity = () => {
    setAmenities(prev => [...prev, { type: prev.length + 1, name: '', included: true }]);
  };

  const removeAmenity = (index) => {
    setAmenities(prev => prev.filter((_, i) => i !== index));
  };

  const updateAmenity = (index, field, value) => {
    setAmenities(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const addNearbyPlace = () => {
    setNearbyPlaces(prev => [...prev, { name: '', distance: '', type: '' }]);
  };

  const removeNearbyPlace = (index) => {
    setNearbyPlaces(prev => prev.filter((_, i) => i !== index));
  };

  const updateNearbyPlace = (index, field, value) => {
    setNearbyPlaces(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const renderApartmentForm = () => (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">
          {editingId ? 'Edit Apartment' : 'Create New Apartment'}
        </h2>
        <button
          onClick={() => {
            setIsCreating(false);
            setEditingId(null);
            resetForm();
          }}
          className="p-2 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-purple-400" />
              Basic Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Property Name</label>
                <input
                  type="text"
                  value={apartmentForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter property name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={apartmentForm.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  placeholder="Describe the property"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Property Type</label>
                  <select
                    value={apartmentForm.propertyType}
                    onChange={(e) => handleInputChange('propertyType', parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value={1}>Villa</option>
                    <option value={2}>Apartment</option>
                    <option value={3}>House</option>
                    <option value={4}>Condo</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <input
                      type="checkbox"
                      checked={apartmentForm.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-slate-700 border-gray-600 rounded focus:ring-purple-500"
                    />
                    Featured Property
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-400" />
              Address
            </h3>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={apartmentForm.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Street Address"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={apartmentForm.address.city}
                  onChange={(e) => handleInputChange('address.city', e.target.value)}
                  className="px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="City"
                />
                <input
                  type="text"
                  value={apartmentForm.address.state}
                  onChange={(e) => handleInputChange('address.state', e.target.value)}
                  className="px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="State"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={apartmentForm.address.zipCode}
                  onChange={(e) => handleInputChange('address.zipCode', e.target.value)}
                  className="px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="ZIP Code"
                />
                <input
                  type="text"
                  value={apartmentForm.address.country}
                  onChange={(e) => handleInputChange('address.country', e.target.value)}
                  className="px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Details & Pricing */}
        <div className="space-y-6">
          {/* Property Details */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-400" />
              Property Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bedrooms</label>
                <div className="relative">
                  <Bed className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                  <input
                    type="number"
                    value={apartmentForm.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', parseInt(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Bathrooms</label>
                <div className="relative">
                  <Bath className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                  <input
                    type="number"
                    value={apartmentForm.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', parseInt(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Area (sq ft)</label>
                <div className="relative">
                  <Maximize className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                  <input
                    type="number"
                    value={apartmentForm.area}
                    onChange={(e) => handleInputChange('area', parseInt(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Max Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 w-5 h-5 text-purple-400" />
                  <input
                    type="number"
                    value={apartmentForm.maxGuests}
                    onChange={(e) => handleInputChange('maxGuests', parseInt(e.target.value))}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-purple-400" />
              Pricing
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price per Night</label>
                  <input
                    type="number"
                    value={apartmentForm.price.amount}
                    onChange={(e) => handleInputChange('price.amount', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Original Price</label>
                  <input
                    type="number"
                    value={apartmentForm.originalPrice.amount}
                    onChange={(e) => handleInputChange('originalPrice.amount', parseFloat(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Cleaning Fee</label>
                <input
                  type="number"
                  value={apartmentForm.cleaningFee.amount}
                  onChange={(e) => handleInputChange('cleaningFee.amount', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          {/* Rating & Reviews */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-purple-400" />
              Rating & Reviews
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  step="0.01"
                  min="1"
                  max="5"
                  value={apartmentForm.rating}
                  onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Total Reviews</label>
                <input
                  type="number"
                  value={apartmentForm.reviews}
                  onChange={(e) => handleInputChange('reviews', parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-purple-400" />
          Property Images
        </h3>
        
        <div className="space-y-4">
          {imageUrls.map((url, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => updateImageUrl(index, e.target.value)}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              {url && (
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                  <img 
                    src={url} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <button
                onClick={() => removeImageUrl(index)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                disabled={imageUrls.length === 1}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          <button
            onClick={addImageUrl}
            className="flex items-center gap-2 px-4 py-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 rounded-lg transition-colors border border-purple-500/30"
          >
            <Plus className="w-4 h-4" />
            Add Image URL
          </button>
        </div>
      </div>

      {/* Amenities Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-purple-400" />
          Amenities
        </h3>
        
        <div className="space-y-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1 grid grid-cols-3 gap-4">
                <input
                  type="text"
                  value={amenity.name}
                  onChange={(e) => updateAmenity(index, 'name', e.target.value)}
                  className="px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Amenity name"
                />
                <input
                  type="number"
                  value={amenity.type}
                  onChange={(e) => updateAmenity(index, 'type', parseInt(e.target.value))}
                  className="px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Type ID"
                />
                <label className="flex items-center gap-2 px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg">
                  <input
                    type="checkbox"
                    checked={amenity.included}
                    onChange={(e) => updateAmenity(index, 'included', e.target.checked)}
                    className="w-4 h-4 text-purple-600 bg-slate-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-white">Included</span>
                </label>
              </div>
              
              <button
                onClick={() => removeAmenity(index)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                disabled={amenities.length === 1}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          <button
            onClick={addAmenity}
            className="flex items-center gap-2 px-4 py-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 rounded-lg transition-colors border border-purple-500/30"
          >
            <Plus className="w-4 h-4" />
            Add Amenity
          </button>
        </div>
      </div>

      {/* Nearby Places Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Navigation className="w-5 h-5 text-purple-400" />
          Nearby Places
        </h3>
        
        <div className="space-y-4">
          {nearbyPlaces.map((place, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1 grid grid-cols-3 gap-4">
                <input
                  type="text"
                  value={place.name}
                  onChange={(e) => updateNearbyPlace(index, 'name', e.target.value)}
                  className="px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Place name"
                />
                <input
                  type="text"
                  value={place.distance}
                  onChange={(e) => updateNearbyPlace(index, 'distance', e.target.value)}
                  className="px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="0.5 mi"
                />
                <input
                  type="text"
                  value={place.type}
                  onChange={(e) => updateNearbyPlace(index, 'type', e.target.value)}
                  className="px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Type (Park, Museum, etc.)"
                />
              </div>
              
              <button
                onClick={() => removeNearbyPlace(index)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                disabled={nearbyPlaces.length === 1}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
          
          <button
            onClick={addNearbyPlace}
            className="flex items-center gap-2 px-4 py-2 text-purple-400 hover:text-purple-300 hover:bg-purple-500/20 rounded-lg transition-colors border border-purple-500/30"
          >
            <Plus className="w-4 h-4" />
            Add Nearby Place
          </button>
        </div>
      </div>

      {/* Save/Cancel Buttons */}
      <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
        <button
          onClick={handleSaveApartment}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          <Save className="w-5 h-5" />
          {editingId ? 'Update Apartment' : 'Create Apartment'}
        </button>
        
        <button
          onClick={() => {
            setIsCreating(false);
            setEditingId(null);
            resetForm();
          }}
          className="flex items-center gap-2 px-8 py-3 bg-slate-700/50 text-white rounded-lg font-semibold hover:bg-slate-600/50 transition-all border border-white/10"
        >
          <X className="w-5 h-5" />
          Cancel
        </button>
      </div>
    </div>
  );

  const renderApartmentsList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Apartments Management</h2>
          <p className="text-gray-400 mt-1">Manage your property listings</p>
        </div>
        
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Apartment
        </button>
      </div>

      <div className="grid gap-6">
        {apartments.map((apartment) => (
          <div key={apartment.id} className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Property Image */}
              <div className="lg:w-80 h-48 lg:h-auto">
                {apartment.images && apartment.images.length > 0 ? (
                  <img
                    src={apartment.images[0]}
                    alt={apartment.name}
                    className="w-full h-full object-cover rounded-xl border border-white/10"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-700/50 rounded-xl border border-white/10 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{apartment.name}</h3>
                      {apartment.featured && (
                        <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-semibold text-white rounded-full">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-300 mb-3 line-clamp-2">{apartment.description}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{apartment.address.city}, {apartment.address.state}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditApartment(apartment)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteApartment(apartment.id)}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Bed className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{apartment.bedrooms}</span>
                    <span className="text-gray-400">beds</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Bath className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{apartment.bathrooms}</span>
                    <span className="text-gray-400">baths</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Maximize className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{apartment.area}</span>
                    <span className="text-gray-400">sq ft</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{apartment.maxGuests}</span>
                    <span className="text-gray-400">guests</span>
                  </div>
                </div>

                {/* Pricing & Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">${apartment.price.amount}</span>
                      <span className="text-gray-400">/ night</span>
                    </div>
                    {apartment.originalPrice.amount > apartment.price.amount && (
                      <span className="text-sm text-gray-400 line-through">${apartment.originalPrice.amount}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{apartment.rating}</span>
                      <span className="text-gray-400">({apartment.reviews})</span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    {apartment.images && (
                      <span>{apartment.images.length} images</span>
                    )}
                    {apartment.amenities && (
                      <span>{apartment.amenities.length} amenities</span>
                    )}
                    {apartment.nearbyPlaces && (
                      <span>{apartment.nearbyPlaces.length} nearby places</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {apartments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Home className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Apartments Yet</h3>
          <p className="text-gray-400 mb-6">Start by creating your first apartment listing</p>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all mx-auto"
          >
            <Plus className="w-5 h-5" />
            Create First Apartment
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Admin Dashboard</div>
                  <div className="text-sm text-gray-400">Property Management</div>
                </div>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('apartments')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === 'apartments'
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  Apartments
                </button>
                
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Star className="w-5 h-5" />
                  Analytics
                </button>
              </nav>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="text-sm font-medium text-gray-300 mb-3">Quick Stats</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Total Properties</span>
                    <span className="text-white font-semibold">{apartments.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Featured</span>
                    <span className="text-white font-semibold">
                      {apartments.filter(apt => apt.featured).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Avg Rating</span>
                    <span className="text-white font-semibold">
                      {apartments.length > 0 
                        ? (apartments.reduce((acc, apt) => acc + apt.rating, 0) / apartments.length).toFixed(1)
                        : '0.0'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {isCreating || editingId ? (
              renderApartmentForm()
            ) : activeTab === 'apartments' ? (
              renderApartmentsList()
            ) : (
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Analytics Dashboard</h3>
                <p className="text-gray-400">Coming soon! Track your property performance and insights.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminApartmentDashboard;