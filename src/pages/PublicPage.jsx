import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants/constants";
import PublicSnackListPage from "./PublicSnackListPage";

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
    return <p style={{ textAlign: "center" }}>Loading snack list...</p>;
  }

  if (!snackList) {
    return (
      <p style={{ textAlign: "center" }}>
        Snack list not available
      </p>
    );
  }

  return (
    <PublicSnackListPage
      snackList={snackList}
    />
  );
}