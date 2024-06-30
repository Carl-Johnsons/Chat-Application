import SearchBar from "../SearchBar";

import { useGlobalState } from "@/hooks";
import ConversationContent from "./ConversationContent";
import MenuContactContent from "./MenuContactContent";
import SearchResultContent from "./SearchResultContent";

import style from "./SidebarContent.module.scss";
import classNames from "classnames/bind";
import { useGetCurrentUser } from "@/hooks/queries/user";
import { ROLE } from "data/constants";
import { ReactNode } from "react";
import { MenuDashboard } from "./MenuDashBoard";

const cx = classNames.bind(style);

interface SideBarView {
  view: ReactNode;
}

interface RoleBasedView {
  admin: SideBarView[];
  user: SideBarView[];
}

const SidebarContent = () => {
  //Global state
  const [isSearchBarFocus] = useGlobalState("isSearchBarFocus");
  const [activeNav] = useGlobalState("activeNav");
  const { data: currentUserData } = useGetCurrentUser();

  const roleBasedViews: RoleBasedView = {
    admin: [
      {
        view: (
          <div>
            <MenuDashboard />
          </div>
        ),
      },
    ],
    user: [
      {
        view: (
          <div
            className={cx(
              "overflow-y-scroll",
              "overflow-x-hidden",
              "conversation-list",
              "flex-grow-1"
            )}
          >
            <ConversationContent />
          </div>
        ),
      },
      {
        view: (
          <div>
            <MenuContactContent />
          </div>
        ),
      },
      {
        view: (
          <div className={cx("w-100", "h-100", "overflow-auto")}>
            <SearchResultContent />
          </div>
        ),
      },
    ],
  };

  let views: SideBarView[];
  let currentView: ReactNode;

  switch (currentUserData?.role) {
    case ROLE.ADMIN:
      views = roleBasedViews.admin;
      if (activeNav - 1 >= views.length) {
        break;
      }
      currentView = views[activeNav - 1].view;
      break;
    default: // user
      views = roleBasedViews.user;
      if (activeNav - 1 >= views.length) {
        break;
      }

      if (isSearchBarFocus) {
        currentView = views[2].view;
        break;
      }
      if (activeNav - 1 !== 2) {
        currentView = views[activeNav - 1].view;
        break;
      }
      break;
  }

  if (!currentUserData) {
    return;
  }

  return (
    <>
      {currentUserData.role === ROLE.USER && (
        <div className={cx("search-bar-container")}>
          <SearchBar />
        </div>
      )}
      {currentView}
    </>
  );
};

export default SidebarContent;
