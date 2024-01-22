import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import style from "./App.module.scss";
import classNames from "classnames/bind";

import NavigationBar from "./Components/NavigationBar";
import ModalContainer from "./Components/ModalContainer";
import SidebarContent from "./Components/SidebarContent";
import ChatViewContainer from "./Components/ChatViewContainer";
import ContactContainer from "./Components/ContactContainer/ContactContainer";
import { useGlobalState } from "./GlobalState";
import APIUtils from "./Utils/Api/APIUtils";
import useSignalRConnection from "./hooks/useSignalRConnection";

const cx = classNames.bind(style);
function App() {
  const [userId, setUserId] = useGlobalState("userId");
  const [, setFriendRequestList] = useGlobalState("friendRequestList");
  const [, setConnection] = useGlobalState("connection");
  const conn = useSignalRConnection(import.meta.env.VITE_SIGNALR_URL);
  //Local state
  const [activeNavIndex, setActiveNavIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showAside, setShowAside] = useState(true);
  useEffect(() => {
    conn && setConnection(conn);
  }, [conn, setConnection]);
  useEffect(() => {
    setUserId(1);
    const fetchUserData = async () => {
      if (!userId) {
        return;
      }
      const [friendRequestList] = await APIUtils.getFriendRequestList(userId);
      if (friendRequestList) {
        setFriendRequestList(friendRequestList);
      }
    };
    fetchUserData();
  }, [setFriendRequestList, setUserId, userId]);

  return (
    <div className={cx("container-fluid", "p-0", "d-flex", "w-100", "h-100")}>
      <div
        className={cx(
          "left",
          "d-flex",
          "flex-grow-1",
          "flex-md-grow-0",
          "flex-shrink-1",
          "flex-sm-shrink-0"
        )}
      >
        <div className={cx("navbar-section", "flex-shrink-0")}>
          <NavigationBar
            activeLink={activeNavIndex}
            setActiveLink={setActiveNavIndex}
            setShowModal={setShowModal}
          />
        </div>
        <div className={cx("sidebar-section", "flex-grow-1", "flex-shrink-1")}>
          <SidebarContent activeIndex={activeNavIndex} />
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
        <div
          className={cx(
            "main-section",
            "flex-grow-1",
            "flex-shrink-1",
            "transition-all-0_2s-ease-in-out"
          )}
        >
          <ChatViewContainer
            showAside={showAside}
            className={cx(activeNavIndex !== 1 && "d-none")}
            setShowAside={setShowAside}
          />
          <ContactContainer />
        </div>
        <div
          className={cx(
            "chat-info",
            "d-none",
            showAside && activeNavIndex === 1 && "d-xl-block"
          )}
        >
          <div>Aside</div>
        </div>
      </div>
      <ModalContainer
        modalType="Profile"
        show={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
}

export default App;
