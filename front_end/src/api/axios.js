import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-Type": "application/json" },
});

// Add interceptor to attach JWT token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle expired or invalid tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      console.warn("🔒 Token expired or invalid — logging out...");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") {
        alert("Session expired. Please log in again.");
        window.location.href = "/login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default api;