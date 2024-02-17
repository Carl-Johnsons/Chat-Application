import { useEffect, useState } from "react";
import images from "../../assets";
import { useGlobalState } from "../../globalState";
import { GroupMessage, IndividualMessage, MessageType } from "../../models";
import {
  getLastGroupMessage,
  getLastIndividualMessage,
} from "../../services/message";
import Avatar from "../Avatar";
import style from "./SideBarItem.module.scss";
import classNames from "classnames/bind";
import moment from "moment";

const cx = classNames.bind(style);

type GroupConversationVariant = {
  type: "groupConversation";
  groupId: number;
  image: string;
  conversationName: string;
  isActive?: boolean;
  isNewMessage?: boolean;
  onClick?: (groupId: number, type: MessageType) => void;
};
type ConversationVariant = {
  type: "conversation";
  userId: number;
  image: string;
  conversationName: string;
  isActive?: boolean;
  isNewMessage?: boolean;
  onClick?: (userId: number, type: MessageType) => void;
};
type SearchItemVariant = {
  type: "searchItem";
  userId: number;
  image: string;
  searchName: string;
  phoneNumber: string;
  isActive?: boolean;
  onClick?: (userId: number) => void;
};

type Variants =
  | ConversationVariant
  | SearchItemVariant
  | GroupConversationVariant;

const SideBarItem = (variant: Variants) => {
  const [currentUserId] = useGlobalState("userId");
  const [userMap] = useGlobalState("userMap");

  //local state
  const [lastMessage, setLastMessage] = useState<
    IndividualMessage | GroupMessage | null
  >();
  const [descriptionContent, setDescriptionContent] = useState("");
  const [timeContent, setTimeContent] = useState("");

  let userId: number = 0;
  let groupId: number = 0;
  let image: string = images.defaultAvatarImg;
  let conversationName: string = "";
  let searchName: string = "";
  let phoneNumber: string = "";
  let isActive: boolean | undefined;
  let isNewMessage: boolean | undefined;
  let onClick: ((id: number, type: MessageType) => void) | undefined;

  const isConversation = variant.type === "conversation";
  const isSearchItem = variant.type === "searchItem";
  const isGroupConversation = variant.type === "groupConversation";
  if (isConversation) {
    ({ userId, image, conversationName, isActive, isNewMessage, onClick } =
      variant);
  } else if (isSearchItem) {
    ({ userId, image, searchName, phoneNumber, isActive, onClick } = variant);
  } else if (isGroupConversation) {
    ({ groupId, image, conversationName, isActive, isNewMessage, onClick } =
      variant);
  }
  // Fetch last message if this component is a conversation
  useEffect(() => {
    const fetchLastMessage = async () => {
      if (isConversation) {
        const [data] = await getLastIndividualMessage(currentUserId, userId);
        setLastMessage(data);
      } else if (isGroupConversation) {
        console.log({ groupId });
        const [data] = await getLastGroupMessage(groupId);
        setLastMessage(data);
      }
    };
    fetchLastMessage();
  }, [currentUserId, groupId, isConversation, isGroupConversation, userId]);
  // Description
  useEffect(() => {
    if (!isSearchItem && lastMessage) {
      const sender =
        currentUserId === lastMessage.message.senderId
          ? "You: "
          : isGroupConversation
          ? `${userMap.get(lastMessage.message.senderId)?.name}: `
          : "";

      setDescriptionContent(
        lastMessage ? `${sender}${lastMessage.message.content}` : ""
      );
    } else {
      setDescriptionContent(phoneNumber && `Phone Number: ${phoneNumber}`);
    }
  }, [
    currentUserId,
    isGroupConversation,
    isSearchItem,
    lastMessage,
    phoneNumber,
    userMap,
  ]);
  // Time
  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    const d = new Date(lastMessage.message.time + "");
    const formattedDate = moment(d).fromNow(true);
    setTimeContent(formattedDate);
  }, [lastMessage]);
  return (
    <div
      className={cx(
        "side-bar-item",
        "w-100",
        "position-relative",
        "d-flex",
        isActive && "active",
        isNewMessage && "new-message"
      )}
      role="button"
      onClick={() => {
        if (!onClick) {
          return;
        }
        if (userId) {
          onClick(userId, "Individual");
          return;
        }
        if (groupId) {
          onClick(groupId, "Group");
          return;
        }
      }}
    >
      <div
        className={cx(
          "conversation-avatar",
          "d-flex",
          "align-items-center",
          "me-2"
        )}
      >
        <Avatar
          src={image}
          className={cx("rounded-circle")}
          alt="user avatar"
        />
      </div>
      <div className={cx("item-description", "flex-grow-1")}>
        <div className={cx("item-name-container", "mt-2", "position-relative")}>
          <div
            className={cx(
              "item-name",
              "text-truncate",
              "position-absolute",
              "top-0",
              "start-0",
              "end-0",
              "bottom-0"
            )}
          >
            {variant.type === "conversation" ||
            variant.type === "groupConversation"
              ? conversationName
              : searchName}
          </div>
        </div>
        <div className={cx("description-container", "position-relative")}>
          {/* This container need position absolute to truncate text dynamically based on the parent size */}
          <div
            className={cx(
              "description",
              "text-truncate",
              "position-absolute",
              "top-0",
              "start-0",
              "end-0",
              "bottom-0"
            )}
          >
            {descriptionContent}
          </div>
        </div>
      </div>
      {!isSearchItem && (
        <>
          <div
            className={cx(
              "time",
              "mt-1",
              "me-1",
              "position-absolute",
              "end-0",
              "top-0"
            )}
          >
            {timeContent}
          </div>
          <div
            className={cx(
              "red-dot",
              "rounded-circle",
              "position-absolute",
              "end-0",
              "bottom-0",
              "d-flex",
              "justify-content-center",
              "align-items-center",
              "text-white",
              isNewMessage ? "" : "d-none"
            )}
          >
            1
          </div>
        </>
      )}
    </div>
  );
};

export default SideBarItem;
