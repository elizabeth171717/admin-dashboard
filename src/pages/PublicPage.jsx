import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants/constants";
import PublicSnackListPage from "./PublicSnackListPage";

const client = import.meta.env.VITE_CLIENT;

export default function PublicPage() {
  const { slug } = useParams();

  const [snackList, setSnackList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublicSnackList = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/${client}/public-snacklist/${slug}`
        );

        console.log("PUBLIC SNACK LIST:", data);

        setSnackList(data);
      } catch (err) {
        console.error(
          "Failed to load public snack list:",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    loadPublicSnackList();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!snackList) {
    return <p>Snack list not found.</p>;
  }

  return (
    <div className="main-container">

      <h1>{snackList.listName}</h1>

      <PublicSnackListPage
        snackList={snackList}
      />

    </div>
  );
}