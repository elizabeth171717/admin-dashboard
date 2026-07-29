import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignupPage from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import SnackListPage from "./pages/SnackListPage";
import PublicSnackListPage from "./pages/PublicSnackListPage";

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