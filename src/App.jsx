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

import PublicPage from "./pages/PublicPage"
function App() {
  return (
    <Router>
      <Routes>
<Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />} />
      
      <Route path="/signup" element={<SignupPage />} />

      <Route path="/public-page/:slug" element={<PublicPage />} />
        
      </Routes>
    </Router>
  );
}

export default App;