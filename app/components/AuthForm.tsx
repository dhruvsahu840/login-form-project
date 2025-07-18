"use client";
import { useState } from "react";
import mongoose from "mongoose";

type AuthFormProps = {
  type: "login" | "signup" | void;
  onSwitch: () => void;
  onFormChange: (type: "login" | "signup" | "cards") => void;
  setUser: (user: User) => void;
};

type User = {
  _id: string;
  username: string;
  email: string;
};

export default function AuthForm({
  type,
  onSwitch,
  onFormChange,
  setUser,
}: AuthFormProps) {
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const endpoint = type === "signup" ? "/api/signup" : "/api/login";

    const dataToSend =
      type === "signup"
        ? formData
        : { email: formData.email, password: formData.password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result: User | { error: string } = await res.json();
      console.log("Login Response:", result);

      if ("_id" in result) {
        const userRes = await fetch(`/api/user?id=${result._id}`);
        const userData: User = await userRes.json();
        console.log(" User Data Fetched:", userData);

        setUser(userData);
        onFormChange("cards");
      } else {
        alert(result.error || "Something went wrong");
      }
    } catch (err) {
      console.error(" Fetch Error:", err);
      alert("Network error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
        {type === "login" ? "Login to your account" : "Create an account"}
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {type === "signup" && (
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 text-black border rounded-lg"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 text-black border rounded-lg"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 text-black border rounded-lg"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
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
