// import React from "react";
// import { useAuth } from "../../../contexts/AuthContext";

// const ProfilePage: React.FC = () => {
//   const { user } = useAuth();

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
//       <h1 className="text-2xl font-bold mb-4">My Profile</h1>
//       {user ? (
//         <div>
//           <p><strong>ID:</strong> {user.id}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>First Name:</strong> {user.firstName}</p>
//           <p><strong>Last Name:</strong> {user.lastName}</p>
//         </div>
//       ) : (
//         <p className="text-gray-500">No user info available.</p>
//       )}
//     </div>
//   );
// };

// export default ProfilePage;
import  { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Bell,
  Shield,
  Heart,
  Star,
  Award,
  Settings
} from "lucide-react";
import { useAuth } from "../../../contexts/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Mock data for demonstration
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "John",
    lastName: user?.lastName || "Doe", 
    email: user?.email || "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "January 2024",
    bio: "Luxury travel enthusiast with a passion for premium accommodations and exceptional experiences."
  });

  const stats = [
    { label: "Bookings", value: "12", icon: Calendar },
    { label: "Favorites", value: "8", icon: Heart },
    { label: "Reviews", value: "24", icon: Star },
    { label: "Member Level", value: "Premium", icon: Award }
  ];

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "bookings", label: "My Bookings", icon: Calendar },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "settings", label: "Settings", icon: Settings }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log("Saving profile data:", profileData);
  };

  const renderProfileContent = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-800 hover:bg-slate-600 transition-colors">
              <Camera className="w-4 h-4 text-gray-300" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xs font-semibold text-white">
                Premium Member
              </div>
            </div>
            <p className="text-gray-300 mb-4">{profileData.bio}</p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Joined {profileData.joinDate}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white rounded-lg transition-colors border border-white/10"
          >
            <Edit3 className="w-4 h-4" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 border border-white/10 text-center">
            <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Profile Details */}
      <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
        <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/30 rounded-lg border border-white/5">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-white">{profileData.firstName}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/30 rounded-lg border border-white/5">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-white">{profileData.lastName}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/30 rounded-lg border border-white/5">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-white">{profileData.email}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/30 rounded-lg border border-white/5">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span className="text-white">{profileData.phone}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <div className="flex items-center gap-3 px-4 py-3 bg-slate-700/30 rounded-lg border border-white/5">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="text-white">{profileData.location}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              ) : (
                <div className="px-4 py-3 bg-slate-700/30 rounded-lg border border-white/5">
                  <span className="text-white">{profileData.bio}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 text-white rounded-lg font-semibold hover:bg-slate-600/50 transition-all border border-white/10"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">No User Info Available</h2>
          <p className="text-gray-400">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-32 pb-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 sticky top-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Account Settings</div>
                  <div className="text-sm text-gray-400">Manage your profile</div>
                </div>
              </div>

              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30"
                        : "text-gray-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "profile" && renderProfileContent()}
            {activeTab !== "profile" && (
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {/* {menuItems.find(item => item.id === activeTab)?.icon && (
                    <menuItems.find(item => item.id === activeTab).icon className="w-8 h-8 text-white" />
                  )} */}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {menuItems.find(item => item.id === activeTab)?.label}
                </h3>
                <p className="text-gray-400">This section is coming soon!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;