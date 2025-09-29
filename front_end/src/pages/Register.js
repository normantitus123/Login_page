// Register.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "../App.css";

function Register() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Email_ID, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/Register", {
        FirstName,
        LastName,
        PhoneNumber: PhoneNumber.trim(),
        Email_ID: Email_ID.trim(),
        Password: Password.trim(),
      });


      if (response.data.success) {
        setMessage("✅ Registered successfully!");
      } else {
        setMessage(`❌ ${response.data.message || "Registration failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error connecting to server");
    }
  };

  return (
    <div className="App">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="First Name"
              value={FirstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Last Name"
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="tel"
              placeholder="Phone Number"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              style={{ width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
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
            Register
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px", color: message.startsWith("✅") ? "green" : "red" }}>
            {message}
          </p>
        )}

        {/* Back to Login */}
        <p style={{ marginTop: "10px" }}>
          Already have an account? <Link to="/">Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
