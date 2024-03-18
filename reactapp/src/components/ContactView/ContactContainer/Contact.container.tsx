import { memo } from "react";

import ContactHeader from "../ContactHeader";
import ContactRow from "../ContactRow";

import { useGlobalState, useModal } from "@/hooks";

import { menuContacts, MenuContactIndex } from "data/constants";

import style from "./Contact.container.module.scss";
import classNames from "classnames/bind";
import {
  useAddFriend,
  useDeleteFriend,
  useDeleteFriendRequest,
  useGetFriendList,
  useGetFriendRequestList,
} from "@/hooks/queries/user";
import { ModalType } from "models/ModalType";
import { useGetConversationUsers } from "@/hooks/queries/conversation";

const cx = classNames.bind(style);

interface Props {
  className?: string;
}

const ContactContainer = ({ className }: Props) => {
  const [activeContactType] = useGlobalState("activeContactType");
  const { data: friendList } = useGetFriendList();
  const { data: conversationUsers } = useGetConversationUsers();
  const { data: friendRequestList } = useGetFriendRequestList();

  // hooks
  const { handleShowModal } = useModal();
  const { mutate: addFriendMutate } = useAddFriend();
  const { mutate: deleteFriendMutate } = useDeleteFriend();
  const { mutate: deleteFriendRequestMutate } = useDeleteFriendRequest();

  const handleClickBtnDetail = (entityId: number, type: ModalType) => {
    handleShowModal({ entityId, modalType: type });
  };
  const handleClickAcpFriend = async (friendId: number) => {
    addFriendMutate({ senderId: friendId });
  };

  const handleClickDelFriend = async (friendId: number) => {
    deleteFriendMutate({ friendId });
  };
  const handleClickDelFriendRequest = async (senderId: number) => {
    deleteFriendRequestMutate({ senderId });
  };
  return (
    <div className={cx(className)}>
      <div
        className={cx("contact-page-header", "d-flex", "align-items-center")}
      >
        <ContactHeader
          image={menuContacts[activeContactType].image}
          name={menuContacts[activeContactType].name}
        />
      </div>
      <div className={cx("contact-list-container")}>
        {friendList &&
          activeContactType === MenuContactIndex.FRIEND_LIST &&
          friendList.map((friend) => {
            const friendObject = friend.friendNavigation;
            return (
              <ContactRow
                key={friendObject.userId}
                entityId={friendObject.userId}
                onClickBtnDetail={() =>
                  handleClickBtnDetail(friendObject.userId, "Friend")
                }
                onClickBtnDelFriend={() =>
                  handleClickDelFriend(friendObject.userId)
                }
              />
            );
          })}
        {conversationUsers &&
          activeContactType === MenuContactIndex.GROUP_LIST &&
          conversationUsers.map((cu) => {
            if (cu?.conversation?.type === "Group") {
              return (
                <ContactRow
                  key={cu.conversationId}
                  entityId={cu.conversationId}
                  onClickBtnDetail={() =>
                    handleClickBtnDetail(cu.conversationId, "Group")
                  }
                />
              );
            }
          })}
        {friendRequestList &&
          activeContactType === MenuContactIndex.FRIEND_REQUEST_LIST &&
          friendRequestList.map((friendRequest, index) => {
            const sender = friendRequest.sender;
            return (
              <ContactRow
                key={index}
                entityId={sender.userId}
                onClickBtnAcceptFriendRequest={() =>
                  handleClickAcpFriend(sender.userId)
                }
                onClickBtnDetail={() =>
                  handleClickBtnDetail(sender.userId, "Stranger")
                }
                onClickBtnDelFriendRequest={() =>
                  handleClickDelFriendRequest(sender.userId)
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default memo(ContactContainer);
