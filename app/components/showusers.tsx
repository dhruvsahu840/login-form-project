"use client";

type User = {
  _id: string;
  username: string;
  email: string;
};

export default function ShowUsers({ users = [] }: { users?: User[] }) {
  return (
    <div className="p-6 min-h-screen bg-[#106EBE]">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">All Registered Users</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition duration-300"
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-blue-800 mb-1 uppercase">{user.username}</h3>
              <p className="text-black text-sm uppercase">{user.email}</p>
              <p className="text-black text-sm uppercase mt-2">ID: {user._id.slice(-10)}</p>
            </div>

          
          </div>
        ))}
      </div>
    </div>
  );
}
