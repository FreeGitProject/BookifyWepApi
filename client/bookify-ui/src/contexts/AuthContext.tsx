import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile, loginUser, registerUser } from "../api/authApi";
import { getToken, removeToken, setToken } from "../utils/storage";
import type { User } from "../types/user.ts";


type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setAuthToken] = useState<string | null>(getToken());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load profile when token changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (token) {
        try {
          const profile = await getProfile(token);
          setUser(profile);
        } catch (err) {
          console.error("Failed to fetch profile", err);
          logout();
        }
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const jwt = await loginUser({ email, password });
      setAuthToken(jwt.accessToken );
      setToken(jwt.accessToken);
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  }) => {
    try {
      await registerUser(data); // register doesn’t log in, so just return
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
