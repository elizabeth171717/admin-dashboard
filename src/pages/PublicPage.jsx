import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";
import { useParams } from "react-router-dom";
const CLIENT_ID = "snacks";


export default function PublicPage() {
    const { slug } = useParams();
  const [snackList, setSnackList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSnackList = async () => {
      try {
        const res = await axios.get(
         
           `${BACKEND_URL}/api/${CLIENT_ID}/public-snacklist/${slug}`
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
        ? "🎉 La persona encargada de los snacks hoy es"
        : "🍎 El turno siguiente de traer snacks es para"}
    </p>

    <p>{nextVolunteer.parent}</p>

    <p>
      <strong>Estudiante:</strong> {nextVolunteer.student}
    </p>

  

    <p>
      {isToday
        ? "Porfavor recuerda traer los snacks hoy, y muchas gracias de antemano."
        : "Gracias por aser el momento de los snack unn momento especial!"}
    </p>
  </div>
)}
   

      <table>
        <thead>
          <tr>
            <th  style={{ background: 'blue', color: 'white'}}>Padre</th>
            <th style={{ background: 'yellow'}}>Estudiante</th>
            <th style={{ background: 'red', color: 'white'}}>Fecha</th>
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