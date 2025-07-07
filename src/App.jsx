import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RricuraOrders from "./pages/RricuraOrders";
import PortfolioContacts from "./pages/PortfolioContacts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/RricuraOrders" element={<RricuraOrders />} />
        <Route path="/Portfoliocontacts" element={<PortfolioContacts />} />
      </Routes>
    </Router>
  );
}

export default App;
