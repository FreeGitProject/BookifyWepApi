// src/features/auth/components/RegisterForm.tsx
import { useState } from "react";
import { registerUser } from "../api/authApi";
import type { RegisterRequest } from "../models/RegisterRequest";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterRequest>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ propertyName: string; errorMessage: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setSuccessId(null);

    try {
      const userId = await registerUser(formData);
      setSuccessId(userId);
      navigate("/login"); // ✅ redirect after success
    } catch (err: any) {
      if (err.errors) {
        setErrors(err.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-blue-600 text-center">Register</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {/* ✅ Validation Errors */}
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-600 p-3 rounded">
          <ul className="list-disc list-inside">
            {errors.map((err, idx) => (
              <li key={idx}>
                {err.propertyName}: {err.errorMessage}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ✅ Success Message */}
      {successId && (
        <div className="bg-green-100 text-green-700 p-3 rounded">
          ✅ User registered successfully. ID: <strong>{successId}</strong>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
