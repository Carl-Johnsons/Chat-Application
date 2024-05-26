import { useEffect, useState } from "react";
import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";

import { useGlobalState, useModal } from "@/hooks";

import style from "./SearchBar.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
import useSearchUser from "hooks/queries/user/useSearchUser.query";

const cx = classNames.bind(style);

interface SearchButtonProps {
  className?: string;
  children: React.ReactNode;
}

const SearchBar = () => {
  const [, setIsSearchBarFocus] = useGlobalState("isSearchBarFocus");
  const [, setSearchResult] = useGlobalState("searchResult");

  const [inputValue, setInputValue] = useState("");
  const [buttonClass, setButtonClass] = useState(cx("btn-add-friend", "me-1"));
  const [closeBtnClass, setCloseBtnClass] = useState(
    cx("btn-add-friend", "me-1", "d-none")
  );
  //hook
  const { handleShowModal } = useModal();
  const { data: searchUserData, isLoading } = useSearchUser(inputValue);
  useEffect(() => {
    if (isLoading) {
      return;
    }
    setSearchResult(searchUserData ?? null);
  }, [isLoading, searchUserData, setSearchResult]);

  const searchButtons: SearchButtonProps[] = [
    {
      className: buttonClass,
      children: (
        <Avatar
          variant="avatar-img-16px"
          src={images.addUserIcon.src}
          alt="add user icon"
        />
      ),
    },
    {
      className: buttonClass,
      children: (
        <Avatar
          variant="avatar-img-16px"
          src={images.addUserIcon.src}
          alt="add group icon"
        />
      ),
    },
    {
      className: closeBtnClass,
      children: <>Đóng</>,
    },
  ];

  const handleFocus = () => {
    setButtonClass(cx("btn-add-friend", "me-1", "d-none"));
    setCloseBtnClass(cx("btn-add-friend", "me-1"));
    setIsSearchBarFocus(true);
  };
  const handleClick = (index: number) => {
    switch (index) {
      case 1:
        handleShowModal({ modalType: "CreateGroup" });
        break;
      case 2:
        setButtonClass(cx("btn-add-friend", "me-1"));
        setCloseBtnClass(cx("btn-add-friend", "me-1", "d-none"));
        setIsSearchBarFocus(false);
        break;
    }
  };
  return (
    <div
      className={cx(
        "search-bar-container",
        "d-flex",
        "pt-3",
        "pe-3",
        "pb-3",
        "ps-3"
      )}
    >
      <input
        onFocus={handleFocus}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        className={cx("search-bar-input", "form-control", "me-1")}
        placeholder="Tìm kiếm"
      />
      <div className={cx("search-bar-btn-container", "d-flex")}>
        {searchButtons.map((item, index) => {
          return (
            <AppButton
              key={index}
              onClick={() => handleClick(index)}
              variant="app-btn-primary-transparent"
              className={item.className ?? ""}
            >
              {item.children}
            </AppButton>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
