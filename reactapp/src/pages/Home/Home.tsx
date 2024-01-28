// Hooks
import { useEffect } from "react";
import { useGlobalState } from "../../GlobalState";
import useSignalRConnection from "../../hooks";
//Components
import APIUtils from "../../Utils/Api/APIUtils";
import NavigationBar from "../../Components/NavigationBar";
import SidebarContent from "../../Components/SidebarContent";
import ChatViewContainer from "../../Components/ChatViewContainer";
import ContactContainer from "../../Components/ContactContainer/ContactContainer";
import ModalContainer from "../../Components/ModalContainer";

import style from "./Home.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const Home = () => {
  const [userId, setUserId] = useGlobalState("userId");
  const [, setFriendRequestList] = useGlobalState("friendRequestList");
  const [, setConnection] = useGlobalState("connection");
  const [showAside] = useGlobalState("showAside");
  const [activeNav] = useGlobalState("activeNav");
  const conn = useSignalRConnection(import.meta.env.VITE_SIGNALR_URL);
  //Local state
  useEffect(() => {
    conn && setConnection(conn);
  }, [conn, setConnection]);
  useEffect(() => {
    const fetchUserData = async () => {
      const [user] = await APIUtils.getUserProfile();
      if (!user) {
        return;
      }
      setUserId(user.userId);

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
          <NavigationBar />
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
        <div
          className={cx(
            "main-section",
            "flex-grow-1",
            "flex-shrink-1",
            "transition-all-0_2s-ease-in-out"
          )}
        >
          <ChatViewContainer className={cx(activeNav !== 1 && "d-none")} />
          <ContactContainer />
        </div>
        <div
          className={cx(
            "chat-info",
            "d-none",
            showAside && activeNav === 1 && "d-xl-block"
          )}
        >
          <div>Aside</div>
        </div>
      </div>
      <ModalContainer />
    </div>
  );
};

export default Home;
