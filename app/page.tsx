"use client";
import { useState } from "react";
import Header from "./components/Header";
import AuthForm from "./components/AuthForm";

export default function Home() {
  const [formType, setFormType] = useState<"login" | "signup" | null>(null);

  const handleFormChange = (type: "login" | "signup") => {
    setFormType(type);
  };

  const handleSwitch = () => {
    setFormType((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div>
      <Header onFormChange={handleFormChange} />
      <main className="min-h-[calc(100vh-64px)] bg-gray-100 px-4 py-10">
        {formType && <AuthForm type={formType} onSwitch={handleSwitch} />}
      </main>
    </div>
  );
}
