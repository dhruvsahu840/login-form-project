"use client";

type User = {
  _id: string;
  username: string;
  email: string;
};

export default function ShowUsers({ users = [] }: { users?: User[] }) {
  return (
    <div className="p-4">
      <h2 className="font-bold text-lg mb-2 text-black">User List:</h2>
      <div className="space-y-2 text-black">
        {users.map((user) => (
          <div key={user._id}>
            {`{id = ${user._id}, username = ${user.username}, email = ${user.email}}`}
          </div>
        ))}
      </div>
    </div>
  );
}
