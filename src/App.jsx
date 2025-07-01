import "./App.css";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RricuraOrders from "./pages/RricuraOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RricuraOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
