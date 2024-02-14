import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames/bind";

import AppButton from "../AppButton";
import style from "./CreateGroupModalContent.module.scss";
import Avatar from "../Avatar";
import { useGlobalState } from "../../globalState";
import { Friend } from "../../models";
const cx = classnames.bind(style);

const CreateGroupModalContent = () => {
  const [friendList] = useGlobalState("friendList");

  const [selectedUser, setSelectedUser] = useState<Friend[]>([]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, friendList.length);
  }, [friendList]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    const friendId =
      e.target.dataset.friendId && parseInt(e.target.dataset.friendId);

    if (!friendId) {
      return;
    }

    const friend = friendList.find((f) => f.friendId == friendId);
    if (!friend) {
      return;
    }
    if (!isChecked && selectedUser.includes(friend)) {
      setSelectedUser(selectedUser.filter((u) => u.friendId !== friendId));
      return;
    }
    if (isChecked) {
      setSelectedUser([...selectedUser, friend]);
    }
  };
  const handleDeleteSelectedUser = (index: number) => {
    inputRefs.current[index].checked = false;
    setSelectedUser([
      ...selectedUser.slice(0, index),
      ...selectedUser.slice(index + 1, selectedUser.length),
    ]);
  };
  return (
    <div className={cx("create-group-modal-content")}>
      <div
        className={cx(
          "group-info-container",
          "d-flex",
          "align-items-center",
          "pt-2",
          "pb-3"
        )}
      >
        <div>
          <AppButton className={cx("avatar-btn", "rounded-circle")}>
            <FontAwesomeIcon icon={faCamera} />
          </AppButton>
        </div>
        <div className={cx("w-100", "ps-3")}>
          <input
            className={cx("input-group-name", "w-100", "pb-2")}
            type="text"
            placeholder="Nhập tên nhóm..."
          />
        </div>
      </div>
      <div
        className={cx(
          "search-container",
          "d-flex",
          "align-items-center",
          "rounded-5",
          "pt-2",
          "pb-2",
          "ps-3",
          "pe-3"
        )}
      >
        <FontAwesomeIcon className={cx("pe-2")} icon={faSearch} />
        <input
          className={cx("input-search", "w-100", "border-0")}
          type="text"
          placeholder="Nhập tên nhóm..."
        />
      </div>
      <div className={cx("user-selection-container", "mb-3", "d-flex")}>
        <div
          className={cx(
            "search-result-container",
            "ps-3",
            "pe-3",
            "overflow-y-scroll",
            "overflow-x-hidden",
            "w-100"
          )}
        >
          {friendList.map((friend, index) => {
            return (
              <div
                className={cx("pt-2", "pb-2", "d-flex", "align-items-center")}
              >
                <input
                  className={cx("me-2")}
                  type="checkbox"
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  id={index + ""}
                  onChange={handleChange}
                  data-friend-id={friend.friendId}
                />
                <label htmlFor={index + ""}>
                  <Avatar
                    className={cx("me-2", "rounded-circle")}
                    src={friend.friendNavigation.avatarUrl}
                    alt="user avatar"
                  />
                  {friend.friendNavigation.name}
                </label>
              </div>
            );
          })}
        </div>
        <div
          className={cx(
            "selected-user-container",
            "flex-grow-1",
            "flex-shrink-0"
          )}
        >
          <label htmlFor=""> Đã chọn {selectedUser.length}/100</label>
          {selectedUser.map((friend, index) => {
            console.log({ friend });

            const avatar = friend.friendNavigation.avatarUrl;
            const name = friend.friendNavigation.name;
            return (
              <div
                key={index}
                className={cx(
                  "selected-user",
                  "d-flex",
                  "align-items-center",
                  "justify-content-between",
                  "rounded-5",
                  "ps-3",
                  "pe-3",
                  "pt-1",
                  "pb-1"
                )}
              >
                <div className={cx("d-flex", "align-items-center", "w-100")}>
                  <Avatar
                    variant="avatar-img-30px"
                    className={cx("me-2", "rounded-circle")}
                    src={avatar}
                    alt="user avatar"
                  />
                  <div
                    className={cx(
                      "user-name-container",
                      "position-relative",
                      "w-100"
                    )}
                  >
                    <div
                      className={cx(
                        "user-name",
                        "position-absolute",
                        "text-truncate",
                        "top-0",
                        "start-0",
                        "end-0",
                        "bottom-0"
                      )}
                    >
                      {name}
                    </div>
                  </div>
                </div>
                <AppButton
                  className={cx("p-0", "m-0", "bg-transparent")}
                  onClick={() => handleDeleteSelectedUser(index)}
                >
                  <FontAwesomeIcon icon={faClose} />
                </AppButton>
              </div>
            );
          })}
        </div>
      </div>
      <div className={cx("footer", "mb-3", "d-flex", "justify-content-end")}>
        <AppButton
          variant="app-btn-primary"
          className={cx("fw-medium", "me-2")}
        >
          Hủy
        </AppButton>
        <AppButton variant="app-btn-secondary" className={cx("fw-medium")}>
          Tạo nhóm
        </AppButton>
      </div>
    </div>
  );
};

export default CreateGroupModalContent;
