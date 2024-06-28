import React, { ReactNode } from "react";
import ChatViewContainer from "../ChatView/ChatViewContainer";
import ContactContainer from "../ContactView/ContactContainer";
import { DashboardContainer } from "../DashboardView";
import { PostViewContainer } from "../PostView";

import { useGlobalState } from "@/hooks";
import { useGetCurrentUser } from "@/hooks/queries/user";
import { ROLE } from "data/constants";

interface MainContent {
  view: ReactNode;
}

interface RoleBasedView {
  admin: MainContent[];
  user: MainContent[];
}

const MainViewContainer = () => {
  const [activeNav] = useGlobalState("activeNav");
  const { data: currentUserData } = useGetCurrentUser();

  const roleBasedView: RoleBasedView = {
    admin: [
      {
        view: <DashboardContainer />,
      },
    ],
    user: [
      { view: <ChatViewContainer /> },
      { view: <ContactContainer /> },
      { view: <PostViewContainer /> },
    ],
  };

  let views: MainContent[];
  let currentView: ReactNode;

  switch (currentUserData?.role) {
    case ROLE.ADMIN:
      views = roleBasedView.admin;
      if (activeNav - 1 >= views.length) {
        break;
      }
      currentView = views[activeNav - 1].view;
      break;
    default:
      views = roleBasedView.user;
      if (activeNav - 1 >= views.length) {
        break;
      }
      currentView = views[activeNav - 1].view;
      break;
  }

  if (!currentUserData) {
    return;
  }

  return <>{currentView}</>;
};

export { MainViewContainer };
