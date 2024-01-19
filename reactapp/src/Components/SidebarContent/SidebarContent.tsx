import { useEffect, useState, useCallback } from "react";
import SearchBar from "../SearchBar";
import MenuContact from "../MenuContact";
import Conversation from "../Conversation";

import images from "../../assets";
import style from "./SidebarContent.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "../../GlobalState";
import APIUtils from "../../Utils/Api/APIUtils";

interface MenuContact {
  image: string;
  name: string;
  isActive?: boolean;
}
interface Props {
  activeIndex?: number;
}

const cx = classNames.bind(style);

const SidebarContent = ({ activeIndex = 0 }: Props) => {
  const [activeMenuContact, setActiveMenuContact] = useState(0);
  const [user] = useGlobalState("user");
  const [friendList] = useGlobalState("friendList");
  const [, setIndividualMessages] = useGlobalState("individualMessageList");
  const [activeConversation, setActiveConversation] =
    useGlobalState("activeConversation");

  const handleClickConversation = useCallback(
    async (receiverId: number) => {
      setActiveConversation(receiverId);
      if (!user) {
        return;
      }
      const [data] = await APIUtils.getIndividualMessageList(
        user.userId,
        receiverId
      );
      data && setIndividualMessages(data);
      console.log(data);
    },
    [setActiveConversation, user, setIndividualMessages]
  );

  useEffect(() => {
    if (!friendList || friendList.length === 0 || activeConversation !== 0) {
      return;
    }
    handleClickConversation(friendList[0].friendNavigation.userId);
  }, [friendList, handleClickConversation, activeConversation]);

  function handleClickMenuContact(index: number) {
    setActiveMenuContact(index);
  }
  const menuContacts: MenuContact[] = [
    { image: images.userSolid, name: "Danh sách bạn bè" },
    { image: images.userGroupSolid, name: "Danh sách nhóm" },
    { image: images.envelopeOpenRegular, name: "Lời mời kết bạn" },
  ];

  return (
    <>
      <div className={cx("search-bar-container")}>
        <SearchBar />
      </div>
      <div className={cx("conversation-list", activeIndex !== 1 && "d-none")}>
        {friendList &&
          friendList.map((friend) => {
            const friendNavigation = friend.friendNavigation;
            const { userId, avatarUrl, name } = friendNavigation;
            return (
              <Conversation
                key={userId}
                userId={userId}
                image={avatarUrl}
                conversationName={name}
                lastMessage="You: Hello world lllllldasfasgjhasjgkhsagjsllllllllllll"
                onClick={handleClickConversation}
                isActive={activeConversation === userId}
              />
            );
          })}
        {/* <Conversation
          userId={1}
          image={images.defaultAvatarImg}
          conversationName="Đức"
          lastMessage="You: Hello world lllllldasfasgjhasjgkhsagjsllllllllllll"
          onClick={handleClickConversation}
          isActive={activeConversation == 1}
        />
        <Conversation
          userId={2}
          image={images.defaultAvatarImg}
          conversationName="A"
          lastMessage="This is very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong string"
          onClick={handleClickConversation}
          isActive={activeConversation == 2}
        />
        <Conversation
          userId={3}
          image={images.defaultAvatarImg}
          conversationName="This name is very loooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
          lastMessage="This is very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong string"
          onClick={handleClickConversation}
          isActive={activeConversation == 3}
          isNewMessage={true}
        /> */}
      </div>
      <div className={cx(activeIndex !== 2 && "d-none")}>
        {menuContacts.map((menuContact, index) => (
          <MenuContact
            key={index}
            index={index}
            image={menuContact.image}
            name={menuContact.name}
            isActive={activeMenuContact === index}
            onClick={handleClickMenuContact}
          />
        ))}
      </div>
    </>
  );
};

export default SidebarContent;
