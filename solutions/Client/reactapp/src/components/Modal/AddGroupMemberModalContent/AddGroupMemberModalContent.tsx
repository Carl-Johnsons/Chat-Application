import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import { useGlobalState, useModal } from "@/hooks";
import { User } from "@/models";

import style from "./AddGroupMemberModalContent.module.scss";
import classnames from "classnames/bind";
import { useGetFriendList } from "@/hooks/queries/user";
import {
  useGetMemberListByConversationId,
  useUpdateGroupConversation,
} from "@/hooks/queries/conversation";

const cx = classnames.bind(style);

const AddGroupMembersModalContent = () => {
  const [selectedUser, setSelectedUser] = useState<User[]>([]);
  const [form, setForm] = useState({
    avatarFile: null as unknown as Blob,
    groupName: "",
    searchValue: "",
  });

  const { handleHideModal } = useModal();
  const [modalEntityId] = useGlobalState("modalEntityId");
  const { data: friendList } = useGetFriendList();
  const { data: memberListData } = useGetMemberListByConversationId(
    {
      conversationId: modalEntityId!,
    },
    {
      enabled: !!modalEntityId,
    }
  );
  const { mutate: updateGroupConversationMutate } =
    useUpdateGroupConversation();

  // Using set for fast lookup
  const userIdSet = new Set(memberListData?.map((member) => member.userId));

  const filterFriendList = useMemo(() => {
    return (friendList ?? []).filter((f) =>
      f.name.toLowerCase().includes(form.searchValue.toLowerCase())
    );
  }, [form.searchValue, friendList]);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, friendList?.length);
  }, [friendList]);

  const handleFriendListChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    const friendId = e.target.dataset.friendId && e.target.dataset.friendId;

    if (!friendId) {
      return;
    }

    const friend = (friendList ?? []).find((f) => f.id == friendId);
    if (!friend) {
      return;
    }
    if (!isChecked && selectedUser.includes(friend)) {
      setSelectedUser(selectedUser.filter((u) => u.id !== friendId));
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

  const handleClickUpdateGroupBtn = useCallback(() => {
    const members = selectedUser.map((f) => f.id);
    if (modalEntityId) {
      updateGroupConversationMutate({ id: modalEntityId, membersId: members });
      handleHideModal();
    }
  }, [
    handleHideModal,
    modalEntityId,
    selectedUser,
    updateGroupConversationMutate,
  ]);

  return (
    <div className={cx("create-group-modal-content")}>
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
          placeholder="Nhập tên..."
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
            const { id, name, avatarUrl } = friend;
            return (
              <div
                key={id}
                className={cx("pt-2", "pb-2", "d-flex", "align-items-center")}
              >
                <input
                  className={cx("custom-input", "me-2")}
                  type="checkbox"
                  ref={(el) => {
                    if (el) inputRefs.current[index] = el;
                  }}
                  id={index + ""}
                  onChange={handleFriendListChange}
                  checked={userIdSet.has(id) || selectedUser.includes(friend)}
                  data-friend-id={id}
                  disabled={userIdSet.has(id)}
                />
                <label htmlFor={index + ""}>
                  <div className={cx("d-flex", "align-items-center")}>
                    <Avatar
                      className={cx("me-2")}
                      avatarClassName={cx("rounded-circle")}
                      src={avatarUrl}
                      alt="user avatar"
                    />
                    <div> {name}</div>
                  </div>
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
          <label> Đã chọn {selectedUser.length}</label>
          {selectedUser.map((friend, index) => {
            const avatar = friend.avatarUrl;
            const name = friend.name;
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
                    avatarClassName={cx("rounded-circle")}
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
          onClick={handleClickUpdateGroupBtn}
        >
          Thêm thành viên
        </AppButton>
      </div>
    </div>
  );
};

export { AddGroupMembersModalContent };
