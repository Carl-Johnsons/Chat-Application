import { useEffect, useState, useCallback } from "react";
import SearchBar from "../SearchBar";
import MenuContact from "../MenuContact";

import SideBarItem from "../SideBarItem";
import images from "../../assets";
import style from "./SidebarContent.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "../../GlobalState";
import { getFriendList } from "../../Utils/Api/UserApi";
import { getIndividualMessageList } from "../../Utils/Api/MessageApi";
import { useModal } from "../../hooks";

interface MenuContact {
  image: string;
  name: string;
  isActive?: boolean;
}

const cx = classNames.bind(style);

const SidebarContent = () => {
  //Global state
  const [isSearchBarFocus] = useGlobalState("isSearchBarFocus");
  const [activeNav] = useGlobalState("activeNav");
  const [userId] = useGlobalState("userId");
  const [, setModaUserId] = useGlobalState("modalUserId");
  const [userMap, setUserMap] = useGlobalState("userMap");
  const [friendList, setFriendList] = useGlobalState("friendList");
  const [, setIndividualMessages] = useGlobalState("individualMessageList");
  const [activeConversation, setActiveConversation] =
    useGlobalState("activeConversation");
  const [searchResult] = useGlobalState("searchResult");
  // Local state
  const [activeMenuContact, setActiveMenuContact] = useState(0);
  // Hook
  const { handleShowModal } = useModal();
  useEffect(() => {
    const fetchFriendListData = async () => {
      if (!userId) {
        return;
      }
      const [friendListData] = await getFriendList(userId);
      if (!friendListData) {
        return;
      }
      setFriendList(friendListData);

      const newMap = new Map(userMap);
      let isChange = false;
      for (const friend of friendListData) {
        if (newMap.has(friend.friendNavigation.userId)) {
          continue;
        }
        newMap.set(friend.friendNavigation.userId, friend.friendNavigation);
        isChange = true;
      }
      isChange && setUserMap(newMap);

      return () => {
        const newMap = new Map(userMap);
        let isChange = false;
        for (const friend of friendListData) {
          if (!newMap.has(friend.friendNavigation.userId)) {
            continue;
          }
          newMap.delete(friend.friendNavigation.userId);
          isChange = true;
        }
        isChange && setUserMap(newMap);
      };
    };
    fetchFriendListData();
  }, [setFriendList, setUserMap, userId, userMap]);

  const handleClickConversation = useCallback(
    async (receiverId: number) => {
      setActiveConversation(receiverId);
      if (!userId) {
        return;
      }
      const [data] = await getIndividualMessageList(userId, receiverId);
      data && setIndividualMessages(data);
    },
    [setActiveConversation, setIndividualMessages, userId]
  );

  useEffect(() => {
    if (!friendList || friendList.length === 0 || activeConversation !== 0) {
      return;
    }
    //Initial with the first friend in the list
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
      <div
        className={cx(
          "conversation-list",
          (activeNav !== 1 || isSearchBarFocus) && "d-none"
        )}
      >
        {friendList &&
          friendList.map((friend) => {
            const friendNavigation = friend.friendNavigation;
            const { userId, avatarUrl, name } = friendNavigation;
            return (
              <SideBarItem
                key={userId}
                type="conversation"
                userId={userId}
                image={avatarUrl}
                conversationName={name}
                lastMessage="Hello world lllllldasfasgjhasjgkhsagjsllllllllllll"
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
      <div className={cx((activeNav !== 2 || isSearchBarFocus) && "d-none")}>
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
      <div
        className={cx(
          "bg-secondary",
          "w-100",
          "h-100",
          !isSearchBarFocus && "d-none"
        )}
      >
        {searchResult && (
          <SideBarItem
            type="searchItem"
            userId={searchResult.userId}
            conversationName={searchResult.name}
            image={searchResult.avatarUrl}
            phoneNumber={searchResult.phoneNumber}
            onClick={() => {
              setModaUserId(searchResult.userId);
              handleShowModal(searchResult.userId);
            }}
          />
        )}
      </div>
    </>
  );
};

export default SidebarContent;
