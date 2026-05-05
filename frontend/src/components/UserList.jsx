import { useEffect, useState } from "react";

const UserList = () => {
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
    <div className="p-2 text-md w-90 h-15 bg-white rounded shadow">
      <h2 className="text-md font-bold mb-1">Users List</h2>

      {error && <p className="text-red-500">{error}</p>}

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul className="space-y-1">
          {users.map((user) => (
            <li
              key={user._id}
              className="border p-1 rounded"
            >
              <p><b>Name:</b> {user.name}</p>
              <p><b>Email:</b> {user.email}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;