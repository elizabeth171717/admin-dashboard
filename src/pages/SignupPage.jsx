import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants/constants";

const client = import.meta.env.VITE_CLIENT;

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/auth/${client}/signupbhop`,
        {
          name,
          email,
          password,
        }
      );

   
      localStorage.setItem("token", data.token);
localStorage.setItem("userId", data.user.id);
localStorage.setItem("name", data.user.name);

      navigate("/admin");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="main-container">
<button className="btn back-btn" onClick={() => navigate("/")}>
      
         ← Back
      </button>

      <h1>Create Account</h1>

      <form className="signup-box" onSubmit={handleSignup}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button className="btn" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}