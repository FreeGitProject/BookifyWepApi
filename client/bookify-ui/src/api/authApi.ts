import axios from "axios";
import type { User } from "../types/user";

const API_URL = "https://localhost:5001/api/v1"; // replace with your base_url

export const registerUser = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) => {
  const res = await axios.post(`${API_URL}/users/register`, data);
  return res.data; // returns userId string
};

export const loginUser = async (data: { email: string; password: string }) => {
  const res = await axios.post(`${API_URL}/users/login`, data);
  return res.data; // assume returns JWT token
};

export const getProfile = async (token: string): Promise<User> => {
  const res = await axios.get(`${API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
