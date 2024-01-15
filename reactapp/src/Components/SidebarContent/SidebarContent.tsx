import { useState } from "react";

import Conversation from "../Conversation";
import images from "../../assets";
import SearchBar from "../SearchBar";
const SidebarContent = () => {
  const [activeLink, setActiveLink] = useState(0);
  function handleClick(userId: number) {
    setActiveLink(userId);
  }
  return (
    <>
      <div className="search-bar-container">
        <SearchBar />
      </div>
      <div className="conversation-list">
        <Conversation
          userId={1}
          image={images.defaultAvatarImg}
          conversationName="Đức"
          lastMessage="You: Hello world lllllldasfasgjhasjgkhsagjsllllllllllll"
          onClick={handleClick}
          isActive={activeLink == 1}
        />
        <Conversation
          userId={2}
          image={images.defaultAvatarImg}
          conversationName="A"
          lastMessage="This is very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong string"
          onClick={handleClick}
          isActive={activeLink == 2}
        />
        <Conversation
          userId={3}
          image={images.defaultAvatarImg}
          conversationName="This name is very loooooooooooooooooooooooooooooooooooooooooooooooooooooooong"
          lastMessage="This is very looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong string"
          onClick={handleClick}
          isActive={activeLink == 3}
          isNewMessage={true}
        />
      </div>
    </>
  );
};

export default SidebarContent;
