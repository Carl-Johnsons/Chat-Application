// Hooks
import { useEffect } from "react";
import { useGlobalState } from "../../globalState";
//components
import NavigationBar from "../../components/NavigationBar";
import SidebarContent from "../../components/SidebarContent";
import ChatViewContainer from "../../components/ChatViewContainer";
import ContactContainer from "../../components/ContactContainer/ContactContainer";
import ModalContainer from "../../components/ModalContainer";
import AsideContainer from "../../components/AsideContainer";

import style from "./Home.module.scss";
import classNames from "classnames/bind";
import { useScreenSectionNavigator, useSignalRConnection } from "../../hooks";
import { getUserProfile } from "../../services/user";

const cx = classNames.bind(style);

const Home = () => {
  const [, setUserId] = useGlobalState("userId");
  const [userMap] = useGlobalState("userMap");
  const [, setConnection] = useGlobalState("connection");
  const [showAside] = useGlobalState("showAside");
  const [activeNav] = useGlobalState("activeNav");
  //Local state
  const conn = useSignalRConnection(import.meta.env.VITE_SIGNALR_URL);
  //Ref
  const { leftRef, rightRef } = useScreenSectionNavigator();
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
      userMap.set(user.userId, user);
    };
    fetchUserData();
  }, [setUserId, userMap]);

  return (
    <div className={cx("container-fluid", "p-0", "d-flex", "w-100", "h-100")}>
      <div className={cx("navbar-section", "flex-shrink-0")}>
        <NavigationBar />
      </div>
      <div
        ref={leftRef}
        className={cx(
          "left",
          "flex-grow-1",
          "flex-md-grow-0",
          "flex-shrink-1",
          "flex-sm-shrink-0",
          "d-flex",
          "flex-column"
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
          <ContactContainer className={cx(activeNav !== 2 && "d-none")} />
        </div>
        <div
          className={cx(
            "chat-info",
            "d-none",
            showAside && activeNav === 1 && "d-xl-block"
          )}
        >
          <AsideContainer />
        </div>
      </div>
      <ModalContainer />
    </div>
  );
};

export default Home;
