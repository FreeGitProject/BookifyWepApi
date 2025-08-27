// src/features/auth/api/authApi.ts
import axios from "axios";
import type { RegisterRequest } from "../models/RegisterRequest";
import type { RegisterResponse } from "../models/RegisterResponse";
import type { LoginRequest } from "../models/LoginRequest";
import type { LoginResponse } from "../models/LoginResponse";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION;

const API_URL = `${API_BASE}/api/${API_VERSION}/users`; // adjust {{base_url}}/{{api_v}}
//const API_URL = "https://localhost:5001/api/v1/users"; // adjust {{base_url}}/{{api_v}}

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${API_URL}/register`, data);
    return response.data; // GUID string
  } catch (error: any) {
    if (error.response) {
      throw error.response.data; // return validation errors
    }
    throw error;
  }
};
export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};