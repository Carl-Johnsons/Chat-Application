import React, { useMemo, useRef, useState } from "react";
import { useGlobalState, useModal } from "@/hooks";
import {
  AddGroupMembersModalContent,
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
import {
  useBlockUser,
  useGetCurrentUser,
  useSendFriendRequest,
} from "@/hooks/queries/user";
import { toast } from "react-toastify";
import {
  useCreateConversation,
  useDisbandGroupConversation,
  useGetConversationBetweenUser,
  useLeaveGroupConversation,
} from "@/hooks/queries/conversation";

const ModalContentMapper = (): ModalContent[] => {
  const [, setActiveModal] = useGlobalState("activeModal");
  const [activeConversationId, setActiveConversationId] = useGlobalState(
    "activeConversationId"
  );
  const [conversationType] = useGlobalState("conversationType");
  const [, setActiveNav] = useGlobalState("activeNav");
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
  const addGroupMemberRef = useRef<HTMLElement>();

  const [currentMemberId, setCurrentMemberId] = useState<string | null>(null);
  const { handleHideModal } = useModal();
  const { data: currentUserData } = useGetCurrentUser();
  //Mutation
  const { mutate: sendFriendRequestMutate } = useSendFriendRequest();
  const { mutate: blockUserMutate } = useBlockUser();
  const { mutateAsync: createConversationMutate } = useCreateConversation();
  const { mutateAsync: disbandConversationMutate } =
    useDisbandGroupConversation();
  const { mutateAsync: leaveGroupMutate } = useLeaveGroupConversation();
  const { refetch: refetchConversation } = useGetConversationBetweenUser(
    {
      otherUserId:
        (conversationType === "GROUP" ? currentMemberId : modalEntityId) ?? "",
    },
    {
      enabled: !!(conversationType === "GROUP"
        ? currentMemberId
        : modalEntityId),
    }
  );
  const content = useMemo(() => {
    const handleClick = (index: number) => {
      setActiveModal(index);
    };

    const handleClickSendFriendRequest = async () => {
      sendFriendRequestMutate({ receiverId: modalEntityId });
    };
    const handleClickBlockUser = (userId: string) => {
      blockUserMutate({ userId });
    };
    const handleClickDisbandGroup = () => {
      disbandConversationMutate({ groupConversationId: activeConversationId });
      handleHideModal();
    };
    const handleClickLeaveGroup = () => {
      leaveGroupMutate({ groupConversationId: activeConversationId });
      handleHideModal();
    };
    const handleClickMessaging = async (otherUserId: string) => {
      if (currentUserData?.id === otherUserId) {
        toast.error("Không thể cuộc trò chuyện với bản thân");
        return;
      }
      setActiveNav(1);
      const { data: refetchConversationData } = await refetchConversation();
      if (!refetchConversationData) {
        const newConversation = await createConversationMutate({ otherUserId });
        if (!newConversation) {
          toast.error("Lỗi khi tạo cuộc hội thoại! Hãy thử lại");
          return;
        }
        setActiveConversationId(newConversation.id);
        return;
      }
      setActiveConversationId(refetchConversationData.id);
      handleHideModal();
    };

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
                onClickMessaging={() => handleClickMessaging(modalEntityId)}
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
                onClickMessaging={() => handleClickMessaging(modalEntityId)}
              />
            ),
          },
        ];
      case "BlockedUser":
        return [
          {
            title: "Thông tin tài khoản",
            ref: profileRef,
            modalContent: (
              <ProfileModalContent
                type="BlockedUser"
                modalEntityId={modalEntityId}
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
                onClickDisbandGroup={() => handleClickDisbandGroup()}
                onClickLeaveGroup={() => handleClickLeaveGroup()}
              />
            ),
          },
          {
            title: "Thành viên nhóm",
            ref: listingGroupMemberRef,
            modalContent: (
              <ListGroupMemberModalContent
                onClickMember={(memberId) => {
                  setCurrentMemberId(memberId);
                  handleClick(2);
                  console.log({ memberId });
                }}
                onClickAddGroupMember={() => {
                  handleClick(3);
                }}
              />
            ),
          },
          {
            title: "Thông tin tài khoản",
            ref: otherProfileRef,
            modalContent: (
              <ProfileModalContent
                key={currentMemberId}
                type="Friend"
                modalEntityId={currentMemberId ?? ""}
                onClickMessaging={() =>
                  handleClickMessaging(currentMemberId ?? "")
                }
              />
            ),
          },
          {
            title: "Thêm thành viên",
            ref: addGroupMemberRef,
            modalContent: <AddGroupMembersModalContent />,
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
      case "AddGroupMember":
        return [
          {
            title: "Thêm thành viên",
            ref: addGroupMemberRef,
            modalContent: <AddGroupMembersModalContent />,
          },
        ];
      default:
        return [];
    }
  }, [
    modalType,
    setActiveModal,
    sendFriendRequestMutate,
    modalEntityId,
    blockUserMutate,
    disbandConversationMutate,
    activeConversationId,
    handleHideModal,
    leaveGroupMutate,
    currentUserData?.id,
    setActiveNav,
    refetchConversation,
    setActiveConversationId,
    createConversationMutate,
    currentMemberId,
  ]);

  return content;
};

export { ModalContentMapper };
