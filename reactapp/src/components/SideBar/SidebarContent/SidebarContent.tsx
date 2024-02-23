import SearchBar from "../SearchBar";

import { useGlobalState } from "@/hooks";
import ConversationContent from "./ConversationContent";
import MenuContactContent from "./MenuContactContent";
import SearchResultContent from "./SearchResultContent";

import style from "./SidebarContent.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const SidebarContent = () => {
  //Global state
  const [isSearchBarFocus] = useGlobalState("isSearchBarFocus");
  const [activeNav] = useGlobalState("activeNav");

  return (
    <>
      <div className={cx("search-bar-container")}>
        <SearchBar />
      </div>
      {activeNav === 1 && !isSearchBarFocus && (
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
      )}
      {activeNav === 2 && !isSearchBarFocus && (
        <div>
          <MenuContactContent />
        </div>
      )}
      {isSearchBarFocus && (
        <div className={cx("bg-secondary", "w-100", "h-100")}>
          <SearchResultContent />
        </div>
      )}
    </>
  );
};

export default SidebarContent;
