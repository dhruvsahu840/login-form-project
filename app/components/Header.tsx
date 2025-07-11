"use client";
export default function Header({ onFormChange }: { onFormChange: (type: "login" | "signup") => void }) {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-700">My Next.js App</h1>
      <div className="space-x-4">
        <button
          onClick={() => onFormChange("login")}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Login
        </button>
        <button
          onClick={() => onFormChange("signup")}
          className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Sign Up
        </button>
        
      </div>
    </header>
  );
}
