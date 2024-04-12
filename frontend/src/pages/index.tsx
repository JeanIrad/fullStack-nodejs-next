import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import CardComponent from "../components/CardComponent";

interface User {
  id: number;
  name: string;
  email: string;
}
export default function Home() {
  const apiURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<User>({ id: 0, name: "", email: "" });
  const [updateUser, setUpdateUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
  });
  // fetch users
  useEffect(() => {
    axios
      .get(`${apiURL}/users`)
      .then((res) => {
        setUsers(res.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // create user
  const createUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios
      .post(`${apiURL}/users`, newUser)
      .then((res) => {
        setUsers([...users, res.data]);
        setNewUser({ id: 0, name: "", email: "" });
      })
      .catch((err) => {
        console.log("error creating user", err);
      });
  };

  return (
    <div className="container mx-auto p-4">
      {/* create user */}
      <form onSubmit={createUser} className="p-4 bg-blue-100 rounded shadow">
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="mb-2 w-full p-2 border-gray-200 rounded"
        />
        <input
          type="text"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="mb-2 w-full p-2 border-gray-200 rounded"
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded"
        >
          Add User
        </button>
      </form>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Users</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {users.map((user) => (
          <div key={user.id}>
            <CardComponent key={user.id} card={user} />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => updateUser(user.id)}
            >
              Update
            </button>
            <button
              className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
