import { useState} from "react";
import axios from "axios";

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
phone: "",
});
const [showAddParentModal, setShowAddParentModal] = useState(false);
const [newParent, setNewParent] = useState("");
const [newStudent, setNewStudent] = useState("");


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
  setNewParent("");
  setNewStudent("");
  setShowAddParentModal(true);
};



const saveNewParent = () => {
  if (!newParent.trim() || !newStudent.trim()) {
    alert("Please enter the parent name and student name.");
    return;
  }

  const newRow = {
    tempId: crypto.randomUUID(),
    parent: newParent.trim(),
    student: newStudent.trim(),
    date: "",
    status: "Upcoming",
    email: "",
    phone: "",
  };

  setRows((currentRows) => [
    ...currentRows,
    newRow,
  ]);

  setShowAddParentModal(false);
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
 

  return (
    <div className="page-container">
   <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Parent</th>
              <th>Student</th>
              <th>Date</th>
           {/*   <th>Status</th> */}
{editMode && <th>Phone</th>}
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
  <input
    className="date"
    type="date"
    value={row.date ? row.date.split("T")[0] : ""}
    disabled={!editMode}
    onChange={(e) =>
      updateRow(
        row._id || row.tempId,
        "date",
        e.target.value
      )
    }
  />
</td>
{/*
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
*/}
{editMode && (
  <td>
    <input
      type="tel"
      placeholder="999-999-9999"
      value={row.phone ?? ""}
      onChange={(e) =>
        updateRow(
          row._id || row.tempId,
          "phone",
          e.target.value
        )
      }
    />
  </td>
)}


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
        <div className="btns-container">
          <button
            className="btn add-parent-btn"
            onClick={addParent}
          >
            + Add Parent
          </button>

          <button
            className="btn save-btn"
            onClick={saveSnackList}
        
          >
            💾 Save List
          </button>
          
        </div>
      )}


{showAddParentModal && (
  <div className="add-parent-modal-overlay">
    <div className="add-parent-modal">

      <h2>Add Parent</h2>

      <p>
        Enter the parent and student information.
      </p>

      <div className="add-parent-field">
        <label>Parent Name *</label>

        <input
          type="text"
          placeholder="Parent name"
          value={newParent}
          onChange={(e) => setNewParent(e.target.value)}
          autoFocus
        />
      </div>

      <div className="add-parent-field">
        <label>Student Name *</label>

        <input
          type="text"
          placeholder="Student name"
          value={newStudent}
          onChange={(e) => setNewStudent(e.target.value)}
        />
      </div>

      <div className="add-parent-modal-buttons">

        <button
          type="button"
          onClick={() => setShowAddParentModal(false)}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn"
          onClick={saveNewParent}
        >
          Save & Add
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  );
}

export default SnackListForm;