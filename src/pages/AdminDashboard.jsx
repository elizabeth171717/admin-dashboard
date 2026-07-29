import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";
import CreateSnackListModal from "../components/CreateSnackListModal";
import SnackListForm from "../components/SnackListForm";

const client = import.meta.env.VITE_CLIENT;

export default function AdminDashboard() {
  const [snackList, setSnackList] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // =============================
  // LOAD THE USER'S SNACK LIST
  // =============================
  useEffect(() => {
    const loadSnackList = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${BACKEND_URL}/api/${client}/snacklist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("SNACK LIST:", data);

        // data will either be the snack list or null
        setSnackList(data);
      } catch (err) {
        console.error("Failed to load snack list:", err);
      }
    };

    loadSnackList();
  }, []);

  // =============================
  // USER ALREADY HAS A SNACK LIST
  // =============================
  if (snackList) {
    return (
      <div className="main-container">
        <div className="page-title">
          <h1>Buford Highway Orchestra</h1>
        </div>

        <h2>{snackList.listName}</h2>

        <SnackListForm
          snackList={snackList}
          editMode={true}
        />
      </div>
    );
  }

  // =============================
  // USER DOESN'T HAVE A SNACK LIST
  // =============================
  return (
    <div>
      <div className="page-title">
        <h1>Buford Highway Orchestra</h1>
      </div>

      <button
        onClick={() => setShowModal(true)}
      >
        Create a Snack List
      </button>

      <CreateSnackListModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={(newSnackList) => {
          setSnackList(newSnackList);
          setShowModal(false);
        }}
      />
    </div>
  );
}