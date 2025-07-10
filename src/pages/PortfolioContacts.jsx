import { useEffect, useState } from "react";

const CLIENT_ID = "portfolio";
export default function PortfolioContacts() {
  const [responses, setResponses] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/${CLIENT_ID}/contacts`
        );
        const data = await res.json();
        setResponses(data);
      } catch (err) {
        console.error("Failed to fetch contacts:", err);
      }
    };

    fetchContacts();
  }, []);

  const fetchFilteredContacts = async () => {
    const params = new URLSearchParams();
    if (searchName) params.append("name", searchName);
    if (searchEmail) params.append("email", searchEmail);

    try {
      const res = await fetch(
        `http://localhost:5000/api/${CLIENT_ID}/contacts?${params.toString()}`
      );
      const data = await res.json();
      setFilteredContacts(data);
    } catch (err) {
      console.error("Error fetching filtered contacts", err);
    }
  };

  const displayedContacts =
    filteredContacts.length > 0 ? filteredContacts : responses;

  return (
    <div className="dashboard-container">
      <a href="/">← Back to Dashboard</a>
      <h2 className="dashboard-title">Contact Form Responses</h2>

      {/* Search Filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <button onClick={fetchFilteredContacts}>Search</button>
        <button
          onClick={() => {
            setSearchName("");
            setSearchEmail("");
            setFilteredContacts([]);
          }}
        >
          Reset
        </button>
      </div>

      {/* Contact Table */}
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedContacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.service}</td>
                <td>{new Date(contact.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
