"use client";

import { useState } from "react";
import Header from "./components/Header";
import AuthForm from "./components/AuthForm";
import ShowUsers from "./components/showusers";


type User = {
    _id: string;
    username: string;
    email: string;
  };
export default function Home() {

  
  const [formType, setFormType] = useState<"login" | "signup" | "cards" |null>();
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleFetchUsers = async () => {
    try {
      const res = await fetch("/api/user");
      const data = await res.json();
      setUsers(data);
      setFormType("cards");
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <Header
       onFormChange={setFormType} 
       onFetchUsers={handleFetchUsers}
      />


      {formType === "login" && (
        <AuthForm
          type="login"
          onSwitch={() => setFormType("signup")}
          onFormChange={setFormType}
          setUser={setUser}
        />
      )}

      {formType === "signup" && (
        <AuthForm
          type="signup"
          onSwitch={() => setFormType("login")}
          onFormChange={setFormType}
          setUser={setUser}
        />
      )}


      {formType === "cards" && <ShowUsers users={users} />}

    </main>
  );
}
