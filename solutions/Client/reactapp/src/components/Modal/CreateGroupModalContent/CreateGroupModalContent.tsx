import { useEffect, useMemo, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { faCamera, faClose, faSearch } from "@fortawesome/free-solid-svg-icons";

import { GroupConversationWithMembersIdDTO } from "@/models/DTOs";
import { useCreateGroupConversation } from "@/hooks/queries/conversation";
import { useGetFriendList } from "@/hooks/queries/user";
import { useModal } from "@/hooks";
import { User } from "@/models";
import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import classnames from "classnames/bind";
import style from "./CreateGroupModalContent.module.scss";

const cx = classnames.bind(style);

const CreateGroupModalContent = () => {
  const { handleHideModal } = useModal();
  const [selectedUser, setSelectedUser] = useState<User[]>([]);
  const [previewImgURL, setPreviewImgURL] = useState<string>();

  const { data: friendList } = useGetFriendList();
  const { mutate: createGroupConversationMutate } =
    useCreateGroupConversation();

  const inputFileRef = useRef(null);
  const [form, setForm] = useState({
    avatarFile: null as unknown as Blob,
    groupName: "",
    searchValue: "",
  });

  const filterFriendList = useMemo(() => {
    return (friendList ?? []).filter((f) => f.name.includes(form.searchValue));
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setForm({ ...form, avatarFile: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImgURL(reader.result as string);
      };
      // Read image as base 64 as preview img
      reader.readAsDataURL(file);
    }
  };

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
    if (selectedUser.length < 2) {
      toast.error("Nhóm phải có từ 3 thành viên trở lên");
      return;
    }
    if (form.groupName.length <= 2) {
      toast.error("Tên nhóm phải có độ dài lớn hơn 2");
      return;
    }

    if(!form.avatarFile){
      toast.error("Nhóm avatar chưa có");
      return;
    }

    const members = selectedUser.map((f) => f.id);

    const model: GroupConversationWithMembersIdDTO = {
      name: form.groupName,
      membersId: members,
      inviteUrl: "string",
      imageFile: form.avatarFile,
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
            onChange={handleFileChange}
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
                  onChange={handleFriendListChange}
                  checked={selectedUser.includes(friend)}
                  data-friend-id={friend.id}
                />
                <label htmlFor={index + ""}>
                  <div className={cx("d-flex", "align-items-center")}>
                    <Avatar
                      className={cx("me-2")}
                      avatarClassName={cx("rounded-circle")}
                      src={friend.avatarUrl}
                      alt="user avatar"
                    />
                    <div> {friend.name}</div>
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
          onClick={handleClickCreateGroup}
        >
          Tạo nhóm
        </AppButton>
      </div>
    </div>
  );
};

export { CreateGroupModalContent };
