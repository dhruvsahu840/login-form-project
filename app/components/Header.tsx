"use client";

export default function Header({
  onFormChange,
  onFetchUsers,
}: {
  onFormChange: (type: "login" | "signup" | "cards" |null) => void;
  onFetchUsers: () => void;
}) {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-700">My Next.js App</h1>
      <div className="space-x-4 flex">
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
        <button
          onClick={onFetchUsers}
          className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Show Users Card
        </button>
        <button onClick={()=> onFormChange(null)} className="px-4 py-2 rounded bg-gray-300 text-gray-800 hover:bg-gray-400">
          ❌
        </button>
      </div>
    </header>
  );
}
