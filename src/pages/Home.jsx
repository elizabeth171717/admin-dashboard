// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/RricuraOrders">🌽 Tamale Orders</Link>

        <Link to="/PortfolioContacts">📬 Portfolio Contact Form Responses</Link>
      </div>
    </div>
  );
}
