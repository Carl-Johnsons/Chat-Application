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
  useGetCurrentUser,
  useGetFriendList,
  useGetFriendRequestList,
} from "@/hooks/queries/user";
import { useGetGroupUserByUserId } from "hooks/queries/group/useGetGroupUserByUserId.query";
import { ModalType } from "models/ModalType";

const cx = classNames.bind(style);

interface Props {
  className?: string;
}

const ContactContainer = ({ className }: Props) => {
  const [activeContactType] = useGlobalState("activeContactType");
  const { data: currentUser } = useGetCurrentUser();
  const { data: friendList } = useGetFriendList();
  const { data: groupList } = useGetGroupUserByUserId(
    currentUser?.userId ?? -1,
    {
      enabled: !!currentUser?.userId,
    }
  );
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
        {groupList &&
          activeContactType === MenuContactIndex.GROUP_LIST &&
          groupList.map((gu) => {
            return (
              <ContactRow
                key={gu.groupId}
                entityId={gu.groupId}
                onClickBtnDetail={() =>
                  handleClickBtnDetail(gu.groupId, "Group")
                }
              />
            );
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
