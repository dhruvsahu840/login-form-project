"use client";

import { useState } from "react";

export default function Header({
  onFormChange,
  onFetchUsers,
}: {
  onFormChange: (type: "login" | "signup" | "cards" | null) => void;
  onFetchUsers: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#0FFCBE] shadow-md w-full ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
            My <span className="text-neutral-900">Next.js</span> App 
          </h1>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-3 items-center">
            <HeaderButtons onFormChange={onFormChange} onFetchUsers={onFetchUsers} />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-blue-600 text-2xl font-bold focus:outline-none"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 animate-fade-in-down">
            <div className="flex flex-col gap-3">
              <HeaderButtons onFormChange={onFormChange} onFetchUsers={onFetchUsers} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Extracted Buttons Component for clean reuse
function HeaderButtons({
  onFormChange,
  onFetchUsers,
}: {
  onFormChange: (type: "login" | "signup" | "cards" | null) => void;
  onFetchUsers: () => void;
}) {
  const base =
    "py-2 px-4 rounded-lg font-semibold shadow-sm transition duration-900";
  return (
    <>
      <button
        onClick={() => onFormChange("login")}
        className={`${base} bg-blue-600 text-white hover:bg-blue-700`}
      >
        Login
      </button>
      <button
        onClick={() => onFormChange("signup")}
        className={`${base} bg-neutral-200 text-gray-900 hover:bg-neutral-300`}
      >
        Sign Up
      </button>
      <button
        onClick={onFetchUsers}
        className={`${base} bg-neutral-200 text-gray-900 hover:bg-neutral-300`}
      >
        Show Users
      </button>
      <button
        onClick={() => onFormChange(null)}
        className={`${base} bg-red-100 text-red-600 hover:bg-red-200`}
      >
        ✕
      </button>
    </>
  );
}
