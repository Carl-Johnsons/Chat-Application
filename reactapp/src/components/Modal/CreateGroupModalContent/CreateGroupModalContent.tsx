import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import { useGlobalState, useModal } from "@/hooks";
import { createGroup } from "@/services/group";
import { uploadImage } from "@/services/tool";
import { Friend, GroupWithMemberId } from "@/models";

import style from "./CreateGroupModalContent.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(style);

const CreateGroupModalContent = () => {
  const [userId] = useGlobalState("userId");
  const [groupMap, setGroupMap] = useGlobalState("groupMap");
  const { handleHideModal } = useModal();
  const [friendList] = useGlobalState("friendList");
  const [selectedUser, setSelectedUser] = useState<Friend[]>([]);
  const [previewImgURL, setPreviewImgURL] = useState<string>();

  const inputFileRef = useRef(null);
  const [form, setForm] = useState({
    avatarFile: null as unknown as File,
    groupName: "",
    searchValue: "",
  });

  console.log(form.avatarFile);

  const filterFriendList = useMemo(() => {
    return friendList.filter((f) =>
      f.friendNavigation.name.includes(form.searchValue)
    );
  }, [form.searchValue, friendList]);

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
  const handleAvatarInputChange =
    useRef<(e: React.ChangeEvent<HTMLInputElement>) => void>();
  useEffect(() => {
    handleAvatarInputChange.current = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target?.files?.[0];
      if (!file) {
        return;
      }
      previewImgURL && window.URL.revokeObjectURL(previewImgURL);
      setForm((prev) => ({ ...prev, avatarFile: file }));
      setPreviewImgURL(window.URL.createObjectURL(file));
    };
    return () => {
      previewImgURL && window.URL.revokeObjectURL(previewImgURL);
    };
  }, [previewImgURL]);

  const handleClickAvatarButton = () => {
    if (!inputFileRef.current) {
      return;
    }
    const inpEle = inputFileRef.current as HTMLElement;
    inpEle.click();
  };
  const handleDeleteSelectedUser = (index: number) => {
    inputRefs.current[index].checked = false;
    setSelectedUser([
      ...selectedUser.slice(0, index),
      ...selectedUser.slice(index + 1, selectedUser.length),
    ]);
  };
  const handleClickCreateGroup = async () => {
    // A group is created if the member size is greater than 2
    if (selectedUser.length < 2 || form.groupName.length <= 2) {
      return;
    }
    //Upload img to imgur
    const [imgurImage] = await uploadImage(form.avatarFile);

    const members = selectedUser.map((f) => f.friendId);
    const model: GroupWithMemberId = {
      groupName: form.groupName,
      groupLeaderId: userId,
      groupMembers: members,
      groupInviteUrl: "string",
      groupAvatarUrl: imgurImage?.data.link ?? "",
    };
    const [newGroup] = await createGroup(model);
    if (!newGroup || !newGroup.groupId) {
      return;
    }
    const newMap = new Map(groupMap);
    newMap.set(newGroup.groupId, newGroup);
    setGroupMap(newMap);
    handleHideModal();
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
          <input
            ref={inputFileRef}
            onChange={handleAvatarInputChange.current}
            type="file"
            id={cx("fileInput")}
          />
          <AppButton
            className={cx("avatar-btn", "rounded-circle", "p-0")}
            onClick={handleClickAvatarButton}
          >
            {previewImgURL ? (
              <Avatar
                className={cx("rounded-circle")}
                src={previewImgURL}
                alt="preview group img"
              />
            ) : (
              <FontAwesomeIcon icon={faCamera} />
            )}
          </AppButton>
        </div>
        <div className={cx("w-100", "ps-3")}>
          <input
            className={cx("input-group-name", "w-100", "pb-2")}
            type="text"
            placeholder="Nhập tên nhóm..."
            onChange={(e) => {
              setForm((prev) => ({ ...prev, groupName: e.target.value }));
            }}
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
          onChange={(e) => {
            setForm((prev) => ({ ...prev, searchValue: e.target.value }));
          }}
          placeholder="Nhập tên hoặc số điện thoại..."
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
          {filterFriendList.map((friend, index) => {
            return (
              <div
                key={index}
                className={cx("pt-2", "pb-2", "d-flex", "align-items-center")}
              >
                <input
                  className={cx("custom-input", "me-2")}
                  type="checkbox"
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  id={index + ""}
                  onChange={handleChange}
                  checked={selectedUser.includes(friend)}
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
          <label> Đã chọn {selectedUser.length}/100</label>
          {selectedUser.map((friend, index) => {
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
                  "pb-1",
                  "mb-1"
                )}
              >
                <div
                  className={cx(
                    "d-flex",
                    "align-items-center",
                    "w-100",
                    "pe-2"
                  )}
                >
                  <Avatar
                    variant="avatar-img-30px"
                    className={cx("rounded-circle")}
                    src={avatar}
                    alt="user avatar"
                  />
                  <div
                    className={cx(
                      "user-name-container",
                      "position-relative",
                      "ms-2",
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
          onClick={handleHideModal}
        >
          Hủy
        </AppButton>
        <AppButton
          variant="app-btn-secondary"
          className={cx("fw-medium")}
          onClick={handleClickCreateGroup}
        >
          Tạo nhóm
        </AppButton>
      </div>
    </div>
  );
};

export default CreateGroupModalContent;
