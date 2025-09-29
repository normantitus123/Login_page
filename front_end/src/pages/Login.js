// Login.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../App.css"; // your styles

function Login() {
  const [Email_ID, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/", { Email_ID, Password });
      const { user } = response.data;
      setMessage(`✅ Welcome ${user.first_name} ${user.last_name}`);
    } catch (err) {
      console.error(err);

      // Check if backend returned a specific message
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(`❌ ${err.response.data.message}`);
      } else {
        setMessage("⚠️ Error connecting to server");
      }
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <input
              type="email"
              placeholder="Email"
              value={Email_ID}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="password"
              placeholder="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          <button type="submit" style={{ width: "100%" }}>
            Login
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px", color: message.startsWith("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}

        {/* Link to Register */}
        <p style={{ marginTop: "10px" }}>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
