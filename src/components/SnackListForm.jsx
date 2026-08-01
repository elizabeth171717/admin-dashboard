import { useState} from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import { BACKEND_URL } from "../constants/constants";

const client = import.meta.env.VITE_CLIENT;

function SnackListForm({ snackList, editMode}) {
const createEmptyRow = () => ({

   tempId: crypto.randomUUID(),
  parent: "",
  student: "",
  date: "",
  status: "Upcoming",
  email: "",
});



  const [rows, setRows] = useState(
  snackList?.rows?.length
    ? snackList.rows
    : [createEmptyRow()]
);
 

  // =============================
  // SAVE LIST
  // =============================
const saveSnackList = async () => {
  try {
    const token = localStorage.getItem("token");

    await axios.post(
      `${BACKEND_URL}/api/${client}/snack-list`,
      {
        listName: snackList.listName,
        organizer: snackList.organizer,
        rows,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Snack list saved!");
  } catch (err) {
    console.error(err);
    alert("Failed to save snack list.");
  }
};


  // =============================
  // UPDATE ROW
  // =============================
  const updateRow = (id, field, value) => {
    setRows((currentRows) =>
      currentRows.map((row) =>
            (row._id || row.tempId) === id
          ? { ...row, [field]: value }
          : row
      )
    );
  };

  // =============================
  // ADD ROW
  // =============================
  
const addParent = () => {
  setRows((currentRows) => [
    ...currentRows,
    createEmptyRow(),
  ]);
};

  // =============================
  // DELETE ROW
  // =============================
 const deleteRow = (id) => {
  if (rows.length === 1) {
    alert("At least one row is required.");
    return;
  }

  if (!window.confirm("Delete this parent?")) return;

  setRows((currentRows) =>
    currentRows.filter(
      (row) => (row._id || row.tempId) !== id
    )
  );
};
 
// =============================
// NEXT SNACK VOLUNTEER
// =============================
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/New_York",
}).format(new Date());

const sortedRows = [...rows]
  .filter((row) => row.date)
  .sort((a, b) => a.date.localeCompare(b.date));

const nextVolunteer =
  sortedRows.find((row) => row.date === today) ||
  sortedRows.find((row) => row.date > today);

const isToday = nextVolunteer?.date === today;
  return (
    <div className="page-container">
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
      <div className="form-container">
        <table>
          <thead>
            <tr>
              <th>Parent</th>
              <th>Student</th>
              <th>Date</th>
              <th>Status</th>

              {editMode && <th>Email</th>}
              {editMode && <th></th>}
            </tr>
          </thead>

          <tbody>
           {rows.map((row) => (
  <tr key={row._id || row.tempId}>
    <td>
      {editMode ? (
        <input
          type="text"
          placeholder="Parent"
          value={row.parent}
          onChange={(e) =>
            updateRow(
              row._id || row.tempId,
              "parent",
              e.target.value
            )
          }
        />
      ) : (
        row.parent
      )}
    </td>

    <td>
      {editMode ? (
        <input
          type="text"
          placeholder="Student"
          value={row.student}
          onChange={(e) =>
            updateRow(
              row._id || row.tempId,
              "student",
              e.target.value
            )
          }
        />
      ) : (
        row.student
      )}
    </td>

    <td>
      {editMode ? (
        <input
        className="date"
          type="date"
          value={row.date ? row.date.split("T")[0] : ""}
          onChange={(e) =>
            updateRow(
              row._id || row.tempId,
              "date",
              e.target.value
            )
          }
        />
      ) : row.date ? (
        new Date(row.date).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )
      ) : (
        ""
      )}
    </td>

    <td>
      {editMode ? (
        <select
          value={row.status}
          className="status"
          onChange={(e) =>
            updateRow(
              row._id || row.tempId,
              "status",
              e.target.value
            )
          }
        >
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Rescheduled">Rescheduled</option>
        </select>
      ) : (
        row.status
      )}
    </td>

    {editMode && (
      <td>
        <input
          type="email"
          placeholder="parent@email.com"
          value={row.email}
          onChange={(e) =>
            updateRow(
              row._id || row.tempId,
              "email",
              e.target.value
            )
          }
        />
      </td>
    )}

    {editMode && (
      <td>
        <button
          className="delete-row-btn"
          onClick={() =>
            deleteRow(row._id || row.tempId)
          }
        >
          🗑
        </button>
      </td>
    )}
  </tr>
))}
          </tbody>
        </table>
      </div>

      {editMode && (
        <div className="add-parent-container">
          <button
            className="add-parent-btn"
            onClick={addParent}
          >
            + Add Parent
          </button>

          <button
            className="save-btn"
            onClick={saveSnackList}
            style={{ marginLeft: "12px" }}
          >
            💾 Save List
          </button>
          
        </div>
      )}

      {!editMode && (
        <div className="contact-info">
          <h2>
            If you need to make any changes,
            please contact me.
          </h2>

          <p>Elizabeth Torres</p>
          <p>(809) 890-0890</p>
        </div>
      )}


      <div
  style={{
    background: "#fff",
    padding: "12px",
    display: "inline-block",
    borderRadius: "10px",
    margin: "10px",
  }}
>
  <QRCode
    value={`http://localhost:5177/admin`}
    size={180}
  />
</div>
    </div>
  );
}

export default SnackListForm;