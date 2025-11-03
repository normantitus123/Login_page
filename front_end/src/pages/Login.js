import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Login() {
  const [Email_ID, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // for redirecting

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", { Email_ID, Password });
      const { token, user } = response.data;

      // Save token and user info locally
      localStorage.setItem("token", token);
      
      localStorage.setItem("user", JSON.stringify(user));

      setMessage(`✅ Welcome ${user.first_name} ${user.last_name}`);

      // Redirect to home after login
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error("Login error:", err);

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
          <p
            style={{
              marginTop: "15px",
              color: message.startsWith("✅") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ marginTop: "10px" }}>
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
