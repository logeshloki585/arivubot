"use client";
import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  age: number;
}

const DummyComponent: React.FC = () => {
  // State to hold user data
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
  ]);

  // State for input field
  const [newUser, setNewUser] = useState<string>("");

  // Add a new user
  const addUser = () => {
    if (newUser.trim() === "") return;

    const newUserData: User = {
      id: users.length + 1,
      name: newUser,
      age: Math.floor(Math.random() * 30) + 20,
    };

    setUsers([...users, newUserData]);
    setNewUser("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Dummy User List</h1>
      <ul className="mb-4">
        {users.map((user) => (
          <li key={user.id} className="border-b py-2">
            {user.name} - {user.age} years old
          </li>
        ))}
      </ul>
      <div className="flex gap-2">
        <input
          type="text"
          className="border px-2 py-1 flex-1"
          value={newUser}
          placeholder="Enter new user name"
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={addUser}
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default DummyComponent;
