import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import NavigationBar from "./Components/NavigationBar";
import ModalContainer from "./Components/ModalContainer";
import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="left d-flex">
        <div className="navbar-section">
          <NavigationBar handleShowModal={handleShowModal} />
        </div>
      </div>
      <div className="right d-flex"></div>
      <ModalContainer
        modalType="Profile"
        show={showModal}
        handleClose={handCloseModal}
      />
    </>
  );
}

export default App;
