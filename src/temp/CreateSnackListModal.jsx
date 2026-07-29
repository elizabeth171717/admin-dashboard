import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";

const client = import.meta.env.VITE_CLIENT;

export default function CreateSnackListModal({
  isOpen,
  onClose,
  onCreate,
}) {
  const [listName, setListName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!listName.trim()) {
      alert("Please enter the snack list name.");
      return;
    }

    if (!organizer.trim()) {
      alert("Please enter the organizer's name.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.post(
        `${BACKEND_URL}/api/${client}/snack-list`,
        {
          listName,
          organizer,
          rows: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Give the newly-created snack list back to the Dashboard.
      onCreate(data);

      // Reset the form.
      setListName("");
      setOrganizer("");

      // Close the modal.
      onClose();
    } catch (err) {
      console.error("Failed to create snack list:", err);

      alert(
        err.response?.data?.message ||
          "Failed to create snack list."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Create Snack List</h2>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            disabled={saving}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Snack List Name</label>

            <input
              type="text"
              placeholder="Children Orchestra"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              disabled={saving}
            />
          </div>

          <div className="form-group">
            <label>Organizer Name</label>

            <input
              type="text"
              placeholder="Elizabeth"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              disabled={saving}
            />
          </div>

          <div className="modal-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={saving}
            >
              {saving ? "Creating..." : "Create List"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}