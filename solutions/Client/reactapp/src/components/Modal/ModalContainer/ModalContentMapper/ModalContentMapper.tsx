import React, { useRef } from "react";
import { useGlobalState } from "@/hooks";
import {
  CreateGroupModalContent,
  ListGroupMemberModalContent,
  PostInputModalContent,
  ProfileModalContent,
  UpdateAvatarModalContent,
  UpdateProfileModalContent,
} from "../..";

interface Props {
  handleClick: (index: number) => void;
  handleClickSendFriendRequest: () => Promise<void>;
}

const ModalContentMapper = ({
  handleClick,
  handleClickSendFriendRequest,
}: Props) => {
  const [modalEntityId] = useGlobalState("modalEntityId");
  const [modalType] = useGlobalState("modalType");

  const profileRef = useRef(null);
  const otherProfileRef = useRef(null);
  const createGroupRef = useRef(null);
  const listingGroupMemberRef = useRef(null);
  const updateProfileRef = useRef(null);
  const updateAvatarRef = useRef(null);
  const postInputRef = useRef(null);

  const memberIdRef = useRef<string>();

  switch (modalType) {
    case "Personal":
      return [
        {
          title: "Thông tin cá nhân",
          ref: profileRef,
          modalContent: (
            <ProfileModalContent
              modalEntityId={modalEntityId}
              type="Personal"
              onClickUpdate={() => handleClick(1)}
              onClickEditUserName={() => handleClick(1)}
              onClickEditAvatar={() => handleClick(2)}
            />
          ),
        },
        {
          title: "Cập nhật thông tin cá nhân",
          ref: updateProfileRef,
          modalContent: (
            <UpdateProfileModalContent onClickCancel={() => handleClick(0)} />
          ),
        },
        {
          title: "Cập nhật thông tin cá nhân",
          ref: updateAvatarRef,
          modalContent: <UpdateAvatarModalContent />,
        },
      ];
    case "Friend":
      return [
        {
          title: "Thông tin tài khoản",
          ref: profileRef,
          modalContent: (
            <ProfileModalContent type="Friend" modalEntityId={modalEntityId} />
          ),
        },
      ];
    case "Stranger":
      return [
        {
          title: "Thông tin tài khoản",
          ref: profileRef,
          modalContent: (
            <ProfileModalContent
              type="Stranger"
              modalEntityId={modalEntityId}
              onClickSendFriendRequest={handleClickSendFriendRequest}
            />
          ),
        },
      ];
    case "Group":
      return [
        {
          title: "Thông tin nhóm",
          ref: profileRef,
          modalContent: (
            <ProfileModalContent
              type="Group"
              modalEntityId={modalEntityId}
              onClickMoreMemberInfo={() => handleClick(1)}
            />
          ),
        },
        {
          title: "Thành viên nhóm",
          ref: listingGroupMemberRef,
          modalContent: (
            <ListGroupMemberModalContent
              onClickMember={(memberId) => {
                handleClick(2);
                memberIdRef.current = memberId;
              }}
            />
          ),
        },
        {
          title: "Thông tin tài khoản",
          ref: otherProfileRef,
          modalContent: (
            <ProfileModalContent
              type="Friend"
              modalEntityId={memberIdRef.current ?? ""}
            />
          ),
        },
      ];
    case "CreateGroup":
      return [
        {
          title: "Tạo nhóm",
          ref: createGroupRef,
          modalContent: <CreateGroupModalContent />,
        },
      ];
    case "PostInput":
      return [
        {
          title: "Viết cảm nghĩ của bạn",
          ref: postInputRef,
          modalContent: <PostInputModalContent />,
        },
      ];
    default:
      return [];
  }
};

export { ModalContentMapper };
