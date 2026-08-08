import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";
import PublicSnackListPage from "./PublicSnackListPage";

const client = import.meta.env.VITE_CLIENT;

export default function PublicPage() {
  const [snackList, setSnackList] = useState(null);

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

        setSnackList(data);
      } catch (err) {
        console.error("Failed to load snack list:", err);
      }
    };

    loadSnackList();
  }, []);

  if (!snackList) {
    return <p>Loading...</p>;
  }

  return (
    <>
     <h2>{snackList.listName}</h2>
    
    <PublicSnackListPage
      snackList={snackList}
    />
    </>
  );
}