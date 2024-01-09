import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import NavigationBar from "./Components/NavigationBar";
import ProfileModal from "./Components/ProfileModal";

import { useState } from "react";
function App() {
  const [showProfileModal, setShowProfileModal] = useState(true);

  const handleShowProfileModal = () => setShowProfileModal(true);
  const handleCloseProfileModal = () => setShowProfileModal(false);
  return (
    <>
      <div className="left d-flex">
        <div className="navbar-section">
          <NavigationBar handleShowProfileModal={handleShowProfileModal} />
        </div>
      </div>
      <div className="right d-flex"></div>
      <ProfileModal
        show={showProfileModal}
        handleClose={handleCloseProfileModal}
      />
    </>
  );
}

export default App;
