"use client";
// Hooks
import { useGlobalState, useScreenSectionNavigator } from "@/hooks";
//components
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import AsideContainer from "@/components/Aside/AsideContainer";
import NavigationBar from "@/components/Nav/NavigationBar";
import SidebarContent from "@/components/SideBar/SidebarContent";
import { MainViewContainer } from "@/components/MainView";
import { useSession } from "next-auth/react";

const cx = classNames.bind(styles);

const Home = () => {
  const [showAside] = useGlobalState("showAside");
  const [activeNav] = useGlobalState("activeNav");
  const { data: session, status } = useSession();

  console.log("========================================");
  console.log({ status });
  console.log({ session });

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
          <MainViewContainer />
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
    </div>
  );
};

export default Home;
