import { useEffect } from "react";

import MenuContact from "@/components/ContactView/MenuContact";
import { useGlobalState, useScreenSectionNavigator } from "@/hooks";
import { getFriendRequestList } from "@/services/user";
import { menuContacts } from "data/constants";

const MenuContactContent = () => {
  const [userId] = useGlobalState("userId");
  const [, setFriendRequestList] = useGlobalState("friendRequestList");
  const [userMap] = useGlobalState("userMap");
  const [activeContactType, setActiveContactType] =
    useGlobalState("activeContactType");

  const { handleClickScreenSection } = useScreenSectionNavigator();

  function handleClickMenuContact(index: number) {
    handleClickScreenSection(false);
    setActiveContactType(index);
  }

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
  return (
    <>
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
    </>
  );
};

export default MenuContactContent;
