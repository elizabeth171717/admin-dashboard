import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import SignupPage from "./Pages/SignupPage";
import Login from "./Pages/LoginPage";
import AdminDashboard from "./Pages/AdminDashboard";
import Home from "./Pages/Home";
import SnackListPage from "./Pages/SnackListPage";
import PublicSnackListPage from "./Pages/PublicSnackListPage";

function App() {
  return (
    <Router>
      <Routes>
<Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      
      <Route path="/signup" element={<SignupPage />} />

        <Route path="/home" element={<Home />} />

        <Route
          path="/snacklistpage"
          element={<SnackListPage />}
        />

        <Route
          path="/public"
          element={<PublicSnackListPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;