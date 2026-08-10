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

  return (
    <div className="public-snack-page">

      <h1>{snackList.listName}</h1>

      <table>
        <thead>
          <tr>
            <th>Parent</th>
            <th>Student</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {snackList.rows.map((row) => (
            <tr key={row._id}>
              <td>{row.parent}</td>
              <td>{row.student}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}