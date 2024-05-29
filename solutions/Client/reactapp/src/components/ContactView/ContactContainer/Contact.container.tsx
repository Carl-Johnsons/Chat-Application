import { memo } from "react";

import ContactHeader from "../ContactHeader";
import ContactRow from "../ContactRow";

import { useGlobalState, useModal } from "@/hooks";

import { menuContacts, MenuContactIndex } from "data/constants";

import style from "./Contact.container.module.scss";
import classNames from "classnames/bind";
import {
  useAcceptFriendRequest,
  useDeleteFriend,
  useDeleteFriendRequest,
  useGetFriendList,
  useGetFriendRequestList,
} from "@/hooks/queries/user";
import { ModalType } from "models/ModalType";
import { useGetConversationList } from "@/hooks/queries/conversation";

const cx = classNames.bind(style);

interface Props {
  className?: string;
}

const ContactContainer = ({ className }: Props) => {
  const [activeContactType] = useGlobalState("activeContactType");
  const { data: friendList } = useGetFriendList();
  const { data: conversationResponse } = useGetConversationList();
  const { data: friendRequestList } = useGetFriendRequestList();

  // hooks
  const { handleShowModal } = useModal();
  const { mutate: acceptFriendRequestMutate } = useAcceptFriendRequest();
  const { mutate: deleteFriendMutate } = useDeleteFriend();
  const { mutate: deleteFriendRequestMutate } = useDeleteFriendRequest();

  const handleClickBtnDetail = (entityId: string, type: ModalType) => {
    handleShowModal({ entityId, modalType: type });
  };
  const handleClickAcpFriend = async (frId: string) => {
    acceptFriendRequestMutate({ frId });
  };

  const handleClickDelFriend = async (friendId: string) => {
    deleteFriendMutate({ friendId });
  };
  const handleClickDelFriendRequest = async (frId: string) => {
    deleteFriendRequestMutate({ frId });
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
          friendList.map((f) => {
            return (
              <ContactRow
                key={f.id}
                entityId={f.id}
                onClickBtnDetail={() => handleClickBtnDetail(f.id, "Friend")}
                onClickBtnDelFriend={() => handleClickDelFriend(f.id)}
              />
            );
          })}
        {conversationResponse?.groupConversations &&
          activeContactType === MenuContactIndex.GROUP_LIST &&
          conversationResponse?.groupConversations.map((gc) => {
            return (
              <ContactRow
                key={gc.id}
                entityId={gc.id}
                onClickBtnDetail={() => handleClickBtnDetail(gc.id, "Group")}
              />
            );
          })}
        {friendRequestList &&
          activeContactType === MenuContactIndex.FRIEND_REQUEST_LIST &&
          friendRequestList.map((friendRequest, index) => {
            const { id, senderId } = friendRequest;
            return (
              <>
                {id && senderId && (
                  <ContactRow
                    key={index}
                    entityId={senderId}
                    onClickBtnAcceptFriendRequest={() =>
                      handleClickAcpFriend(id)
                    }
                    onClickBtnDetail={() =>
                      handleClickBtnDetail(senderId, "Stranger")
                    }
                    onClickBtnDelFriendRequest={() =>
                      handleClickDelFriendRequest(id)
                    }
                  />
                )}
              </>
            );
          })}
      </div>
    </div>
  );
};

export default memo(ContactContainer);
