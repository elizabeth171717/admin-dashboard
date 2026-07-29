import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CreateSnackListModal from "../components/CreateSnackListModal";

function Home() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="main-container">
<div className="page-title">
  <h1>Buford Highway Orchestra </h1>
</div>
      <div className="btns-continer">

        <button onClick={() => navigate("/admin")}>
          Organizer View
        </button>

        <button onClick={() => navigate("/public")}>
          Parent View
        </button>

      </div>

      <button onClick={() => setShowModal(true)}>
        Create a Snack List
      </button>

     <CreateSnackListModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onCreate={(newList) => {
    const snackLists =
      JSON.parse(localStorage.getItem("snackLists")) || [];

    snackLists.push(newList);

    localStorage.setItem(
      "snackLists",
      JSON.stringify(snackLists)
    );

    setShowModal(false);

    navigate("/admin");
  }}
/>

    </div>
  );
}

export default Home;