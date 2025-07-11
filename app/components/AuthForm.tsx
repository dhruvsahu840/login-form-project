"use client";
import { useState } from "react";

export default function AuthForm({
  type,
  onSwitch,
}: {
  type: "login" | "signup";
  onSwitch: () => void;
}) {
  // ✅ State to store input values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form:", formData); // Debug log

    const endpoint = type === "signup" ? "/api/signup" : "/api/login";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const msg = await res.text();
    alert(msg);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        {type === "login" ? "Login to your account" : "Create an account"}
      </h2>

      {/* ✅ Added handleSubmit to form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {type === "signup" && (
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {type === "login" ? "Login" : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm mt-4 text-gray-600">
        {type === "login" ? (
          <>
            Don&apos;t have an account?{" "}
            <button onClick={onSwitch} className="text-blue-500 underline">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={onSwitch} className="text-blue-500 underline">
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}
