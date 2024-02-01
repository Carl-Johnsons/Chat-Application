// Hooks
import { LegacyRef, useCallback, useEffect, useRef } from "react";
import { useGlobalState } from "../../GlobalState";
//Components
import NavigationBar from "../../Components/NavigationBar";
import SidebarContent from "../../Components/SidebarContent";
import ChatViewContainer from "../../Components/ChatViewContainer";
import ContactContainer from "../../Components/ContactContainer/ContactContainer";
import ModalContainer from "../../Components/ModalContainer";

import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { useSignalRConnection } from "../../hooks";
import { getFriendRequestList, getUserProfile } from "../../Utils/Api/UserApi";

const cx = classNames.bind(style);

const Home = () => {
  const [userId, setUserId] = useGlobalState("userId");
  const [, setFriendRequestList] = useGlobalState("friendRequestList");
  const [, setConnection] = useGlobalState("connection");
  const [showAside] = useGlobalState("showAside");
  const [activeNav] = useGlobalState("activeNav");
  //Local state
  const conn = useSignalRConnection(import.meta.env.VITE_SIGNALR_URL);
  //Ref
  const navRef: LegacyRef<HTMLDivElement> = useRef(null);
  const leftRef: LegacyRef<HTMLDivElement> = useRef(null);
  const rightRef: LegacyRef<HTMLDivElement> = useRef(null);
  const handleClick = useCallback((leftShow: boolean) => {
    if (!leftRef.current || !rightRef.current || !navRef.current) {
      return;
    }
    if (window.matchMedia("(min-width: 768px)").matches) {
      return;
    }
    if (leftShow) {
      leftRef.current.classList.remove("d-none");
      rightRef.current.classList.add("d-none");
      rightRef.current.classList.remove("d-flex");
    } else {
      leftRef.current.classList.add("d-none");
      rightRef.current.classList.remove("d-none");
      rightRef.current.classList.add("d-flex");
    }
  }, []);

  useEffect(() => {
    conn && setConnection(conn);
  }, [conn, setConnection]);
  useEffect(() => {
    const fetchUserData = async () => {
      const [user] = await getUserProfile();
      if (!user) {
        return;
      }
      setUserId(user.userId);

      const [friendRequestList] = await getFriendRequestList(userId);
      if (friendRequestList) {
        setFriendRequestList(friendRequestList);
      }
    };
    fetchUserData();
  }, [setFriendRequestList, setUserId, userId]);

  return (
    <div className={cx("container-fluid", "p-0", "d-flex", "w-100", "h-100")}>
      <div
        ref={navRef}
        onClick={() => handleClick(true)}
        className={cx("navbar-section", "flex-shrink-0")}
      >
        <NavigationBar />
      </div>
      <div
        ref={leftRef}
        onClick={() => handleClick(false)}
        className={cx(
          "left",
          "flex-grow-1",
          "flex-md-grow-0",
          "flex-shrink-1",
          "flex-sm-shrink-0"
        )}
      >
        <SidebarContent />
      </div>
      <div
        ref={rightRef}
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
