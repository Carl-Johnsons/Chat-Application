"use client";

// Hooks
import { useGlobalState, useScreenSectionNavigator } from "@/hooks";
//components
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import AsideContainer from "@/components/Aside/AsideContainer";
import ChatViewContainer from "@/components/ChatView/ChatViewContainer";
import ContactContainer from "@/components/ContactView/ContactContainer";
import ModalContainer from "@/components/Modal/ModalContainer";
import NavigationBar from "@/components/Nav/NavigationBar";
import SidebarContent from "@/components/SideBar/SidebarContent";
import { PostViewContainer } from "@/components/PostView";

const cx = classNames.bind(styles);

const Home = () => {
  const [showAside] = useGlobalState("showAside");
  const [activeNav] = useGlobalState("activeNav");
  //Local state
  //Ref
  const { leftRef, rightRef } = useScreenSectionNavigator();

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
          {activeNav === 3 && <PostViewContainer />}
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
