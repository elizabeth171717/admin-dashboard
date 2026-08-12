import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";

const CLIENT_ID = "snacks";
const SNACK_LIST_SLUG = "guitar-hzyjtp";

export default function PublicPage() {
  const [snackList, setSnackList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSnackList = async () => {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/${CLIENT_ID}/public-snacklist/${SNACK_LIST_SLUG}`
        );

        console.log("PUBLIC SNACK LIST:", res.data);

        setSnackList(res.data);
      } catch (err) {
        console.error("Failed to load snack list:", err);
      } finally {
        setLoading(false);
      }
    };

    loadSnackList();
  }, []);

  if (loading) {
    return <p>Loading snack list...</p>;
  }

  if (!snackList) {
    return <p>Snack list not available.</p>;
  }




// NEXT SNACK VOLUNTEER
  // =============================
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
  }).format(new Date());

  const sortedRows = [...snackList.rows]
    .filter((row) => row.date)
    .sort((a, b) => a.date.localeCompare(b.date));

  const nextVolunteer =
    sortedRows.find((row) => row.date === today) ||
    sortedRows.find((row) => row.date > today);

  const isToday = nextVolunteer?.date === today;

  return (
    <div className="public-snack-page">

      <h2 className="snack-list-name">{snackList.listName}</h2>

        {nextVolunteer && (
  <div className="next-snack-card">
    <p>
      {isToday
        ? "🎉 Today's Snack Volunteer"
        : "🍎 Next Snack Volunteer"}
    </p>

    <p>{nextVolunteer.parent}</p>

    <p>
      <strong>Student:</strong> {nextVolunteer.student}
    </p>

  

    <p>
      {isToday
        ? "Please remember to bring the class snack today."
        : "Thank you for helping make snack time special!"}
    </p>
  </div>
)}
   

      <table>
        <thead>
          <tr>
            <th>Padre</th>
            <th>Estudiante</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {snackList.rows.map((row) => (
            <tr key={row._id}>
              <td>{row.parent}</td>
              <td>{row.student}</td>
              <td>{new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(`${row.date}T00:00:00`))}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}