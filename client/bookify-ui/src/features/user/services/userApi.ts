// src/features/user/services/userApi.ts
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const response = await axios.get(
    `${API_BASE}/api/${API_VERSION}/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ pass token in header
      },
    }
  );

  return response.data;
};
