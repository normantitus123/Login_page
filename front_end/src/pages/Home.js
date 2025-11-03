import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../App.css";

const Home = () => {
  const [user, setUser] = useState(null);

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/"); // your protected backend route
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (!user) {
    return <div className="loading">Loading user details...</div>;
  }

  return (
    <div className="home-container">
      <h1>Welcome, {user.first_name} {user.last_name} 👋</h1>
      <p>Email: {user.email}</p>
      <p>Joined on: {new Date(user.created_at).toLocaleDateString()}</p>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Home;
