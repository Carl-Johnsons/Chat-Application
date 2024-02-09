import ContactHeader from "../ContactHeader";

import style from "./ContactContainer.module.scss";
import classNames from "classnames/bind";
import { memo } from "react";
import { useGlobalState } from "../../globalState";
import { MenuContactIndex, menuContacts } from "../../data/constants";
import ContactRow from "../ContactRow";
import { useModal } from "../../hooks";
import {
  addFriend,
  deleteFriend,
  deleteFriendRequest,
} from "../../services/user";

const cx = classNames.bind(style);

interface Props {
  className?: string;
}

const ContactContainer = ({ className }: Props) => {
  const [userId] = useGlobalState("userId");
  const [activeContactType] = useGlobalState("activeContactType");
  const [friendList, setFriendList] = useGlobalState("friendList");
  const [friendRequestList] = useGlobalState("friendRequestList");
  const [, setModalUserId] = useGlobalState("modalUserId");
  // hooks
  const { handleShowModal } = useModal();
  const handleClickBtnDetail = (userId: number) => {
    setModalUserId(userId);
    handleShowModal(userId);
  };
  const handleClickAcpFriend = async (friendId: number) => {
    const [status, error] = await addFriend(friendId, userId);
    if (status && status >= 200 && status <= 299) {
      console.log("acp friend successfully");
    } else {
      console.log("acp friend failed");
      console.error(error);
    }
  };

  const handleClickDelFriend = async (friendId: number) => {
    const [status, error] = await deleteFriend(userId, friendId);
    if (status && status >= 200 && status <= 299) {
      console.log("del friend successfully");
    } else {
      console.log("del friend failed");
      console.error(error);
    }
  };
  const handleClickDelFriendRequest = async (friendRequestId: number) => {
    const [status, error] = await deleteFriendRequest(friendRequestId, userId);
    if (status && status >= 200 && status <= 299) {
      console.log("del friend request successfully");
    } else {
      console.log("del friend request failed");
      console.error(error);
    }
  };
  return (
    <>
      <div
        className={cx(
          "contact-page-header",
          "d-flex",
          "align-items-center",
          className
        )}
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
                userId={friendObject.userId}
                onClickBtnDetail={() =>
                  handleClickBtnDetail(friendObject.userId)
                }
                onClickBtnDelFriend={() =>
                  handleClickDelFriend(friendObject.userId)
                }
              />
            );
          })}
        {friendRequestList &&
          activeContactType === MenuContactIndex.FRIEND_REQUEST_LIST &&
          friendRequestList.map((friendRequest) => {
            const sender = friendRequest.sender;
            return (
              <ContactRow
                key={sender.userId}
                userId={sender.userId}
                onClickBtnAcceptFriendRequest={() =>
                  handleClickAcpFriend(sender.userId)
                }
                onClickBtnDetail={() => handleClickBtnDetail(sender.userId)}
                onClickBtnDelFriendRequest={() =>
                  handleClickDelFriendRequest(sender.userId)
                }
              />
            );
          })}
      </div>
    </>
  );
};

export default memo(ContactContainer);
