"use client";


type User = {
  _id: string;
  username: string;
  email: string;
};

export default function LoginCard({ user }: { user: User }) {


    
  return (
    <div className="p-6 bg-white shadow-md rounded-2xl text-center w-full max-w-sm mx-auto mt-10">
      <img
        src="https://i.pravatar.cc/150?img=12"
        alt="Profile"
        className="w-88 h-88 mx-auto  mb-4 border-4 border-blue-500"
      />
      <h2 className="text-2xl font-semibold text-gray-800">{user.email}</h2>
      <p className="text-gray-600">{user.username}</p>
    </div>
  );
}
