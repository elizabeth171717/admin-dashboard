import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../constants/constants";
import CreateSnackListModal from "../components/CreateSnackListModal";
import PublicSnackListPage from "./PublicSnackListPage";
import SnackListPage from "./SnackListPage";
const client = import.meta.env.VITE_CLIENT;

export default function AdminDashboard() {
  const [snackList, setSnackList] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("owner");
const navigate = useNavigate();
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
 <button
 
   onClick={() => navigate("/public-page")}
  className="btn"
>
  Public Page
</button>

        <h2>{snackList.listName}</h2>

<div className="btns-container">
  {mode === "owner" ? (
    <button onClick={() => setMode("public")}>
      Parent View
    </button>
  ) : (
    <button onClick={() => setMode("owner")}>
      Organizer View
    </button>
  )}
</div>

       {mode === "owner" ? (
  <SnackListPage snackList={snackList} />
) : (
  <PublicSnackListPage snackList={snackList} />
)}
      </div>
    );
  }

  // =============================
  // USER DOESN'T HAVE A SNACK LIST
  // =============================
  return (
    <div className="main-container">
      <div className="page-title">
        <h1>BHOP SNACKS</h1>
      </div>
<div className="btns-container">
      <button className="btn"
        onClick={() => setShowModal(true)}
      >
        Create a Snack List
      </button>
</div>
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