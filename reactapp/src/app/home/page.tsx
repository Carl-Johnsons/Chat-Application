"use client";

// Hooks
import { useEffect } from "react";
import { useGlobalState } from "../../hooks/globalState";
import { useScreenSectionNavigator } from "@/hooks/useScreenSectionNavigator";
import { useSignalRConnection } from "@/hooks/useSignalRConnection";
//components
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import AsideContainer from "@/components/Aside/AsideContainer";
import ChatViewContainer from "@/components/ChatView/ChatViewContainer";
import ContactContainer from "@/components/ContactView/ContactContainer";
import ModalContainer from "@/components/Modal/ModalContainer";
import NavigationBar from "@/components/Nav/NavigationBar";
import SidebarContent from "@/components/SideBar/SidebarContent";


const cx = classNames.bind(styles);

const Home = () => {
  const [, setConnection] = useGlobalState("connection");
  const [showAside] = useGlobalState("showAside");
  const [activeNav] = useGlobalState("activeNav");
  //Local state
  const conn = useSignalRConnection(process.env.NEXT_PUBLIC_SIGNALR_URL ?? "");
  //Ref
  const { leftRef, rightRef } = useScreenSectionNavigator();
  useEffect(() => {
    conn && setConnection(conn);
  }, [conn, setConnection]);

  return (
    <div className="container-fluid p-0 d-flex w-100 h-100">
      <div className={cx("navbar-section", "flex-shrink-0")}>
        <NavigationBar />
      </div>
      <div
        ref={leftRef}
        className={cx(
          "left",
          "flex-grow-1 flex-md-grow-0 flex-shrink-1 flex-sm-shrink-0 d-flex flex-column"
        )}
      >
        <SidebarContent />
      </div>
      <div
        ref={rightRef}
        className={cx("right", " d-none d-md-flex flex-grow-1 flex-shrink-1")}
      >
        <div
          className={cx(
            "main-section transition-all-0_2s-ease-in-out",
            "flex-grow-1 flex-shrink-1"
          )}
        >
          {activeNav === 1 && <ChatViewContainer />}
          {activeNav === 2 && <ContactContainer />}
        </div>
        <div
          className={cx(
            "chat-info",
            "d-none",
            showAside && activeNav === 1 && " d-xl-block"
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
