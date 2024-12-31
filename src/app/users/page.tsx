"use client"
import React, { useEffect, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      const updatedUsers:any[] = await Promise.all(
        data.users.map(async (user: any) => {
          const res = await fetch(`https://randomuser.me/api/?gender=${user.gender}`);
          const imageData = await res.json();
          const userImage = imageData.results[0].picture.large;
          return { ...user, image: userImage };
        })
      );
      setUsers(updatedUsers);
    }
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {users.map((user: any) => (
          <div key={user.id} style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px" }}>
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
            <h3>{`${user.firstName} ${user.lastName}`}</h3>
            <p>Email: {user.email}</p>
            <p>Gender: {user.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
