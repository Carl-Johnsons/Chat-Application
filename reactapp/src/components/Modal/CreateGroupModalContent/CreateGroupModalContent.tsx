import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import { useModal } from "@/hooks";
import { Friend } from "@/models";

import style from "./CreateGroupModalContent.module.scss";
import classnames from "classnames/bind";
import { useUploadImage } from "@/hooks/queries/tool";
import { useGetCurrentUser, useGetFriendList } from "@/hooks/queries/user";
import { useCreateGroupConversation } from "@/hooks/queries/conversation";
import { GroupConversationWithMembersIdDTO } from "@/models/DTOs";

const cx = classnames.bind(style);

const CreateGroupModalContent = () => {
  const { handleHideModal } = useModal();
  const [selectedUser, setSelectedUser] = useState<Friend[]>([]);
  const [previewImgURL, setPreviewImgURL] = useState<string>();

  const { data: currentUser } = useGetCurrentUser();
  const { data: friendList } = useGetFriendList();
  const { mutate: createGroupConversationMutate } =
    useCreateGroupConversation();
  const { mutateAsync: uploadImageMutateAsync } = useUploadImage();

  const inputFileRef = useRef(null);
  const [form, setForm] = useState({
    avatarFile: null as unknown as File,
    groupName: "",
    searchValue: "",
  });

  const filterFriendList = useMemo(() => {
    return (friendList ?? []).filter((f) =>
      f.friendNavigation.name.includes(form.searchValue)
    );
  }, [form.searchValue, friendList]);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, friendList?.length);
  }, [friendList]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    const friendId =
      e.target.dataset.friendId && parseInt(e.target.dataset.friendId);

    if (!friendId) {
      return;
    }

    const friend = (friendList ?? []).find((f) => f.friendId == friendId);
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
    if (!currentUser) {
      return;
    }
    const imgurImage = await uploadImageMutateAsync({ file: form.avatarFile });
    const members = selectedUser.map((f) => f.friendId);
    // Include the current user too
    members.push(currentUser.userId);

    const model: GroupConversationWithMembersIdDTO = {
      name: form.groupName,
      leaderId: currentUser?.userId ?? -1,
      membersId: members,
      inviteUrl: "string",
      imageURL: imgurImage?.data.link ?? "",
    };

    createGroupConversationMutate({ conversationWithMembersId: model });
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
                avatarClassName={cx("rounded-circle")}
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
                  <div className={cx("d-flex", "align-items-center")}>
                    <Avatar
                      className={cx("me-2")}
                      avatarClassName={cx("rounded-circle")}
                      src={friend.friendNavigation.avatarUrl}
                      alt="user avatar"
                    />
                    <div> {friend.friendNavigation.name}</div>
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
          onClick={handleClickCreateGroup}
        >
          Tạo nhóm
        </AppButton>
      </div>
    </div>
  );
};

export default CreateGroupModalContent;
