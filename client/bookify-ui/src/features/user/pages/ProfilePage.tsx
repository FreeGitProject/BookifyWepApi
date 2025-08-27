// src/features/user/pages/ProfilePage.tsx
import { useEffect, useState } from "react";
import { getProfile } from "../services/userApi";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      {user && (
        <>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
