"use client";
import { useState } from "react";
import ShowUsers from "./showusers";

type User = {
  _id: string;
  username: string;
  email: string;
};

export default function FetchUsersButton() {
  const [users, setUsers] = useState<User[]>([]);
  const [showUsers, setShowUsers] = useState(false);

  const handleClick = async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUsers(data);
      setShowUsers(true);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-4 py-2 rounded bg-pink-300 text-black hover:bg-pink-400"
      >
        show user cards
      </button>

      {showUsers && <ShowUsers users={users} />}
    </div>
  );
}
