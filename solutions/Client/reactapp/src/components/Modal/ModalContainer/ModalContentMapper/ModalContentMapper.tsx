import React, { useMemo, useRef } from "react";
import { useGlobalState } from "@/hooks";
import {
  CallingModalContent,
  CreateGroupModalContent,
  ListGroupMemberModalContent,
  PostInputModalContent,
  ProfileModalContent,
  ReportPostModalContent,
  UpdateAvatarModalContent,
  UpdateProfileModalContent,
} from "../..";
import { ModalContent } from "models/ModalContent.model";
import { useBlockUser, useSendFriendRequest } from "@/hooks/queries/user";

const ModalContentMapper = (): ModalContent[] => {
  const { mutate: sendFriendRequestMutate } = useSendFriendRequest();
  const { mutate: blockUserMutate } = useBlockUser();
  const [, setActiveModal] = useGlobalState("activeModal");

  const [modalEntityId] = useGlobalState("modalEntityId");
  const [modalType] = useGlobalState("modalType");

  const profileRef = useRef<HTMLElement>();
  const otherProfileRef = useRef<HTMLElement>();
  const createGroupRef = useRef<HTMLElement>();
  const listingGroupMemberRef = useRef<HTMLElement>();
  const updateProfileRef = useRef<HTMLElement>();
  const updateAvatarRef = useRef<HTMLElement>();
  const postInputRef = useRef<HTMLElement>();
  const reportPostRef = useRef<HTMLElement>();
  const callingRef = useRef<HTMLElement>();

  const memberIdRef = useRef<string>();
  const content = useMemo(() => {
    const handleClick = (index: number) => {
      setActiveModal(index);
    };

    const handleClickSendFriendRequest = async () => {
      sendFriendRequestMutate({ receiverId: modalEntityId });
    };
    const handleClickBlockUser = (userId:string) => {
      blockUserMutate({userId})
    }

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
              <ProfileModalContent
                type="Friend"
                modalEntityId={modalEntityId}
                onClickBlockUser={() => handleClickBlockUser(modalEntityId)}
              />
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
                onClickBlockUser={() => handleClickBlockUser(modalEntityId)}
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
      case "PostReport":
        return [
          {
            title: "Báo cáo bài viết",
            ref: reportPostRef,
            modalContent: <ReportPostModalContent />,
          },
        ];
      case "Calling":
        return [
          {
            ref: callingRef,
            modalContent: <CallingModalContent />,
            disableHeader: true,
            disableHideModal: true,
          },
        ];
      default:
        return [];
    }
  }, [modalEntityId, modalType, sendFriendRequestMutate, setActiveModal]);

  return content;
};

export { ModalContentMapper };
