import { useEffect, useCallback } from "react";
import SearchBar from "../SearchBar";
import MenuContact from "../MenuContact";

import SideBarItem from "../SideBarItem";
import style from "./SidebarContent.module.scss";
import classNames from "classnames/bind";
import { useGlobalState } from "../../globalState";
import { useModal, useScreenSectionNavigator } from "../../hooks";
import { MessageType, User } from "../../models";
import { menuContacts } from "../../data/constants";
import {
  getGroupMessageList,
  getIndividualMessageList,
} from "../../services/message";
import { getFriendList, getFriendRequestList } from "../../services/user";
import { getGroupUserByUserId } from "../../services/group";
import { getGroupUserByGroupId } from "../../services/group/getGroupUserByGroupId.service";

const cx = classNames.bind(style);

const SidebarContent = () => {
  //Global state
  const [userId] = useGlobalState("userId");
  const [isSearchBarFocus] = useGlobalState("isSearchBarFocus");
  const [activeNav] = useGlobalState("activeNav");
  const [userMap, setUserMap] = useGlobalState("userMap");
  const [friendList, setFriendList] = useGlobalState("friendList");
  const [, setFriendRequestList] = useGlobalState("friendRequestList");
  const [, setMessageList] = useGlobalState("messageList");
  const [messageType, setMessageType] = useGlobalState("messageType");

  const [activeConversation, setActiveConversation] =
    useGlobalState("activeConversation");
  const [searchResult] = useGlobalState("searchResult");
  const [activeContactType, setActiveContactType] =
    useGlobalState("activeContactType");
  const [groupMap] = useGlobalState("groupMap");
  const [groupUserMap] = useGlobalState("groupUserMap");
  // Hook
  const { handleShowModal } = useModal();
  const { handleClickScreenSection } = useScreenSectionNavigator();

  const handleClickConversation = useCallback(
    async (receiverId: number, type: MessageType) => {
      handleClickScreenSection(false);
      setActiveConversation(receiverId);
      if (!userId) {
        return;
      }
      if (type === "Group") {
        const [data] = await getGroupMessageList(receiverId);
        if (!data) {
          return;
        }
        setMessageList(data);
        setMessageType("Group");
        return;
      }
      if (type === "Individual") {
        const [data] = await getIndividualMessageList(userId, receiverId);
        if (!data) {
          return;
        }
        setMessageList(data);
        setMessageType("Individual");
        return;
      }
    },
    [
      handleClickScreenSection,
      setActiveConversation,
      setMessageList,
      setMessageType,
      userId,
    ]
  );
  const handleClickSearchResult = (searchResult: User | null) => {
    if (!searchResult) {
      return;
    }
    handleShowModal({ entityId: searchResult.userId });
  };

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

  useEffect(() => {
    const fetchFriendRequestList = async () => {
      if (!userId) {
        return;
      }
      const [frList] = await getFriendRequestList(userId);
      if (!frList) {
        setFriendRequestList([]);
        return;
      }
      for (const friendRequest of frList) {
        userMap.set(friendRequest.sender.userId, friendRequest.sender);
      }
      setFriendRequestList(frList);
    };
    fetchFriendRequestList();
  }, [setFriendRequestList, userId, userMap]);

  // useEffect(() => {
  //   if (!friendList || friendList.length === 0 || activeConversation !== 0) {
  //     return;
  //   }
  //   //Initial with the first friend in the list
  //   handleClickConversation(friendList[0].friendNavigation.userId);
  // }, [friendList, handleClickConversation, activeConversation]);

  useEffect(() => {
    const fetchGroupList = async () => {
      if (!userId) {
        return;
      }
      // Get many group that the current user is in
      const [groupUserList] = await getGroupUserByUserId(userId);
      if (!groupUserList) {
        return;
      }
      for (const gu of groupUserList) {
        if (!gu.group) {
          continue;
        }
        groupMap.set(gu.groupId, gu.group);
        // Get all user in this single group
        const [userGroupList] = await getGroupUserByGroupId(gu.groupId);
        if (!userGroupList) {
          continue;
        }
        const userIdList = [];
        for (const userGroup of userGroupList) {
          userIdList.push(userGroup.userId);
        }
        groupUserMap.set(gu.groupId, userIdList);
      }
    };
    fetchGroupList();
  }, [groupMap, groupUserMap, userId]);

  function handleClickMenuContact(index: number) {
    handleClickScreenSection(false);
    setActiveContactType(index);
  }

  return (
    <>
      <div className={cx("search-bar-container")}>
        <SearchBar />
      </div>
      <div
        className={cx(
          "overflow-y-scroll",
          "overflow-x-hidden",
          "conversation-list",
          "flex-grow-1",
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
                isActive={
                  activeConversation === userId && messageType == "Individual"
                }
              />
            );
          })}
        {groupMap &&
          [...groupMap.entries()].map(([groupId, group]) => {
            const { groupName, groupAvatarUrl } = group;
            return (
              <SideBarItem
                key={groupId}
                type="groupConversation"
                groupId={groupId}
                image={groupAvatarUrl}
                conversationName={groupName}
                lastMessage="Hello world lllllldasfasgjhasjgkhsagjsllllllllllll"
                onClick={handleClickConversation}
                isActive={
                  activeConversation === groupId && messageType == "Group"
                }
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
            isActive={activeContactType === index}
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
            searchName={searchResult.name}
            image={searchResult.avatarUrl}
            phoneNumber={searchResult.phoneNumber}
            onClick={() => handleClickSearchResult(searchResult)}
          />
        )}
      </div>
    </>
  );
};

export default SidebarContent;
