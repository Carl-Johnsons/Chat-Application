import { useState } from "react";
import SearchBar from "../SearchBar";
import MenuContact from "../MenuContact";
import Conversation from "../Conversation";

import images from "../../assets";
import style from "./SidebarContent.module.scss";
import classNames from "classnames/bind";

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
  const [activeConversation, setActiveConversation] = useState(0);
  const [activeMenuContact, setActiveMenuContact] = useState(0);
  function handleClickConvesation(userId: number) {
    setActiveConversation(userId);
  }
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
        <Conversation
          userId={1}
          image={images.defaultAvatarImg}
          conversationName="Đức"
          lastMessage="You: Hello world lllllldasfasgjhasjgkhsagjsllllllllllll"
          onClick={handleClickConvesation}
          isActive={activeConversation == 1}
        />
        <Conversation
          userId={2}
          image={images.defaultAvatarImg}
          conversationName="A"
          lastMessage="This is very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong string"
          onClick={handleClickConvesation}
          isActive={activeConversation == 2}
        />
        <Conversation
          userId={3}
          image={images.defaultAvatarImg}
          conversationName="This name is very loooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
          lastMessage="This is very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong string"
          onClick={handleClickConvesation}
          isActive={activeConversation == 3}
          isNewMessage={true}
        />
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
