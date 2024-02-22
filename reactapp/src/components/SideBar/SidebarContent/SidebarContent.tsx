import { useEffect, useCallback } from "react";

import MenuContact from "@/components/ContactView/MenuContact";
import SearchBar from "../SearchBar";
import SideBarItem from "../SideBarItem";

import { useGlobalState, useModal, useScreenSectionNavigator } from "@/hooks";

import { User, MessageType, IndividualMessage, GroupMessage } from "@/models";
import { menuContacts } from "data/constants";

import { getGroupUserByUserId, getGroupUserByGroupId } from "@/services/group";
import { getGroupMessageList } from "@/services/groupMessage";
import { getIndividualMessageList } from "@/services/individualMessage";
import { getLastMessageList } from "@/services/message";
import { getFriendList, getFriendRequestList, getUser } from "@/services/user";

import style from "./SidebarContent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const SidebarContent = () => {
  //Global state
  const [userId] = useGlobalState("userId");
  const [isSearchBarFocus] = useGlobalState("isSearchBarFocus");
  const [activeNav] = useGlobalState("activeNav");
  const [userMap, setUserMap] = useGlobalState("userMap");
  const [, setFriendList] = useGlobalState("friendList");
  const [, setFriendRequestList] = useGlobalState("friendRequestList");
  const [, setMessageList] = useGlobalState("messageList");
  const [messageType, setMessageType] = useGlobalState("messageType");
  const [lastMessageList, setLastMessageList] =
    useGlobalState("lastMessageList");

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
    [setActiveConversation, setMessageList, setMessageType, userId]
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
        friend.friendNavigation = {
          ...friend.friendNavigation,
          isOnline: false,
        };

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

  useEffect(() => {
    const fetchLastMessageList = async () => {
      if (!userId) {
        return;
      }
      const [lmList] = await getLastMessageList(userId);
      if (!lmList) {
        return;
      }
      for (const messageEntity of lmList) {
        const sender = userMap.get(messageEntity.message.senderId);
        //Fetch unknown user
        if (!sender) {
          const [u] = await getUser(messageEntity.message.senderId);
          u && userMap.set(messageEntity.message.senderId, u);
        }
      }
      setLastMessageList(lmList);
    };
    fetchLastMessageList();
  }, [setLastMessageList, userId, userMap]);

  function handleClickMenuContact(index: number) {
    // handleClickScreenSection(false);
    setActiveContactType(index);
  }

  return (
    <>
      <div className={cx("search-bar-container")}>
        <SearchBar />
      </div>
      {activeNav === 1 && !isSearchBarFocus && (
        <div
          className={cx(
            "overflow-y-scroll",
            "overflow-x-hidden",
            "conversation-list",
            "flex-grow-1"
          )}
        >
          {lastMessageList &&
            lastMessageList.map((m) => {
              if (m.message.messageType === "Group") {
                const { groupReceiverId, message } = m as GroupMessage;
                return (
                  <SideBarItem
                    key={message.messageId}
                    type="groupConversation"
                    lastMessage={message}
                    groupId={groupReceiverId}
                    onClick={handleClickConversation}
                    isActive={
                      activeConversation === groupReceiverId &&
                      messageType == "Group"
                    }
                  />
                );
              }
              const { userReceiverId, message } = m as IndividualMessage;
              const otherUserId =
                userReceiverId === userId ? message.senderId : userReceiverId;
              return (
                <SideBarItem
                  key={message.messageId}
                  type="individualConversation"
                  userId={otherUserId}
                  lastMessage={message}
                  onClick={handleClickConversation}
                  isActive={
                    activeConversation === otherUserId &&
                    messageType == "Individual"
                  }
                />
              );
            })}
        </div>
      )}
      {activeNav === 2 && !isSearchBarFocus && (
        <div>
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
      )}
      {isSearchBarFocus && (
        <div className={cx("bg-secondary", "w-100", "h-100")}>
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
      )}
    </>
  );
};

export default SidebarContent;
