import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/authApi";


const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ propertyName: string; errorMessage: string }[]>([]);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    try {
      await registerUser(form);
      navigate("/login"); // success → go to login
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-6 py-8 mt-10">

        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">Register</h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-3"
            />

            {errors.length > 0 && (
              <ul className="text-red-500 text-sm mb-3">
                {errors.map((e, idx) => (
                  <li key={idx}>{e.propertyName}: {e.errorMessage}</li>
                ))}
              </ul>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Register
            </button>
            <a href="/login">login</a>
          </form>
        </div>
      </div>
    </div>


  );
};

export default RegisterPage;
