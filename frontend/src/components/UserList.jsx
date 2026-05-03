import { useEffect, useState } from "react";

export const UserList =() =>{
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/users");

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch users");
        }

        setUsers(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-2">Users List</h2>

      {error && <p className="text-red-500">{error}</p>}

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user._id}
              className="border p-2 rounded"
            >
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

