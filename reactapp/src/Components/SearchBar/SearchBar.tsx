import images from "../../assets";
import AppButton from "../AppButton";
import Avatar from "../Avatar";
import style from "./SearchBar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const SearchBar = () => {
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
        type="text"
        className={cx("search-bar-input", "form-control", "me-1")}
        placeholder="Tìm kiếm"
      />
      <div className={cx("search-bar-btn-container", "d-flex")}>
        <AppButton
          variant="app-btn-primary-transparent"
          className={cx("btn-add-friend", "me-1")}
        >
          <Avatar
            variant="avatar-img-16px"
            src={images.addUserIcon}
            alt="add user icon"
          />
        </AppButton>
        <AppButton
          variant="app-btn-primary-transparent"
          className={cx("btn-create-group")}
        >
          <Avatar
            variant="avatar-img-16px"
            src={images.addUserIcon}
            alt="add user icon"
          />
        </AppButton>
      </div>
    </div>
  );
};

export default SearchBar;
