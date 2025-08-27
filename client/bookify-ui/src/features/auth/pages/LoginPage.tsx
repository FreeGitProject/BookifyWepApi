// src/features/auth/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser} from "../api/authApi";
import type { LoginRequest } from "../models/LoginRequest";
import type { ApiError } from "../models/ApiError";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setLoading(true);

    try {
      const res = await loginUser(formData);

      //  Save token in localStorage
      localStorage.setItem("token", res.accessToken );

      //  Redirect to apartments list
      navigate("/");
    } catch (err: any) {
      if (err.response?.data) {
        const apiError: ApiError = err.response.data;
        const msgs = apiError.errors?.map(
          (e) => `${e.propertyName}: ${e.errorMessage}`
        ) || [apiError.detail];
        setErrors(msgs);
      } else {
        setErrors(["Invalid credentials or server error"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {errors.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            <ul className="list-disc list-inside">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
