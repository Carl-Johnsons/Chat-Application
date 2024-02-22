import { memo } from "react";

import ContactHeader from "../ContactHeader";
import ContactRow from "../ContactRow";

import {
  signalRSendAcceptFriendRequest,
  useGlobalState,
  useModal,
  useSignalREvents,
} from "@/hooks";

import { Friend } from "@/models";
import { menuContacts, MenuContactIndex } from "data/constants";
import { addFriend, deleteFriend, deleteFriendRequest } from "@/services/user";

import style from "./Contact.container.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  className?: string;
}

const ContactContainer = ({ className }: Props) => {
  const [userId] = useGlobalState("userId");
  const [userMap] = useGlobalState("userMap");
  const [groupMap] = useGlobalState("groupMap");
  const [activeContactType] = useGlobalState("activeContactType");
  const [friendList, setFriendList] = useGlobalState("friendList");
  const [friendRequestList, setFriendRequestList] =
    useGlobalState("friendRequestList");
  const [connection] = useGlobalState("connection");

  // hooks
  const { handleShowModal } = useModal();
  const invokeAction = useSignalREvents({ connection: connection });

  const handleClickBtnDetail = (userId: number) => {
    handleShowModal({ entityId: userId });
  };
  const handleClickAcpFriend = async (friendId: number) => {
    const senderId = friendId;
    const receiverId = userId;

    const [status, error] = await addFriend(senderId, receiverId);
    if (status && status >= 200 && status <= 299) {
      console.log("acp friend successfully");
      const sender = userMap.get(senderId);
      const receiver = userMap.get(receiverId);
      if (!sender) {
        console.error(`This user with ID:${senderId} is null in the user map`);
        return;
      }
      if (!receiver) {
        console.error(
          `This user with ID:${receiverId} is null in the user map`
        );
        return;
      }
      let friend: Friend = {
        userId: senderId,
        friendId: receiverId,
        friendNavigation: sender,
      };

      setFriendList([...friendList, friend]);

      setFriendRequestList(
        friendRequestList.filter((fr) => fr.senderId !== senderId)
      );
      // Invert the property to send to other user
      friend = {
        userId: receiverId,
        friendId: senderId,
        friendNavigation: receiver,
      };
      invokeAction(signalRSendAcceptFriendRequest(friend));
    } else {
      console.log("acp friend failed");
      console.error(error);
    }
  };

  const handleClickDelFriend = async (friendId: number) => {
    const [status, error] = await deleteFriend(userId, friendId);
    if (status && status >= 200 && status <= 299) {
      console.log("del friend successfully");
      console.log({ friendList });
      setFriendList(
        friendList.filter((f) => f.friendNavigation.userId !== friendId)
      );
    } else {
      console.log("del friend failed");
      console.error(error);
    }
  };
  const handleClickDelFriendRequest = async (friendRequestId: number) => {
    const [status, error] = await deleteFriendRequest(friendRequestId, userId);
    if (status && status >= 200 && status <= 299) {
      console.log("del friend request successfully");
      setFriendRequestList(
        friendRequestList.filter((fr) => fr.senderId !== friendRequestId)
      );
    } else {
      console.log("del friend request failed");
      console.error(error);
    }
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
                  handleClickBtnDetail(friendObject.userId)
                }
                onClickBtnDelFriend={() =>
                  handleClickDelFriend(friendObject.userId)
                }
              />
            );
          })}
        {groupMap &&
          activeContactType === MenuContactIndex.GROUP_LIST &&
          [...groupMap.entries()].map(([groupId]) => {
            return <ContactRow key={groupId} entityId={groupId} />;
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
                onClickBtnDetail={() => handleClickBtnDetail(sender.userId)}
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
