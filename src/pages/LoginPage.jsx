// Login.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
// Determine the backend URL based on the environment

const client = import.meta.env.VITE_CLIENT;
console.log("📦 Backend URL:", BACKEND_URL);
console.log("🏷️ Client tenant:", client);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

 
  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${BACKEND_URL}/auth/${client}/loginbhop`,
      {
        email,
        password,
      }
    );

    const data = res.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.user.id);
    localStorage.setItem("name", data.user.name);

    navigate("/admin");
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="main-container">
      <button className="btn back-btn" onClick={() => navigate("/")}>
      
         ← Back
      </button>
      <h2>Login</h2>
      
      <form className="login-box" onSubmit={handleLogin}>
        <input
          type="email"
          autoComplete="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="pw-input">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          <span onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <i className="fa-solid fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </span>
        </div>




        <button type="submit" className="btn">
         Submit
        </button>
      

      </form>
    </div>
  );
}
