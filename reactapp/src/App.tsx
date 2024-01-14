import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

import style from "./App.module.scss";
import classNames from "classnames/bind";

import NavigationBar from "./Components/NavigationBar";
import ModalContainer from "./Components/ModalContainer";
import SidebarContent from "./Components/SidebarContent";

const cx = classNames.bind(style);
function App() {
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handCloseModal = () => setShowModal(false);

  return (
    <div className={cx("container-fluid", "p-0", "d-flex", "w-100", "h-100")}>
      <div
        className={cx(
          "left",
          "d-flex",
          "flex-grow-1",
          "flex-md-grow-0",
          "flex-shrink-1"
        )}
      >
        <div className={cx("navbar-section", "flex-shrink-0")}>
          <NavigationBar handleShowModal={handleShowModal} />
        </div>
        <div className={cx("sidebar-section", "flex-grow-1", "flex-shrink-1")}>
          <SidebarContent />
        </div>
      </div>
      <div
        className={cx(
          "right",
          "d-none",
          "d-md-flex",
          "flex-grow-1",
          "flex-shrink-1"
        )}
      >
        <div className={cx("main-section", "flex-grow-1")}>main section</div>
        <div className={cx("chat-info", "d-none", "d-xl-block")}>
          <div>Aside</div>
        </div>
      </div>
      <ModalContainer
        modalType="Profile"
        show={showModal}
        handleClose={handCloseModal}
      />
    </div>
  );
}

export default App;
