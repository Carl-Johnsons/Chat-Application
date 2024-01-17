import style from "./ChatViewContainer.module.scss";
import images from "../../assets";
import classNames from "classnames/bind";
import ChatViewHeader from "../ChatViewHeader";
import ChatViewFooter from "../ChatViewFooter";
import Message from "../Message";

const cx = classNames.bind(style);
interface Props {
  showAside: boolean;
  className?: string;
  setShowAside: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatViewContainer = ({ showAside, className, setShowAside }: Props) => {
  const image = images.userIcon;
  const name =
    "This name is very loonoooooooooooooooonngg and it could break my layout :) 🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡";
  const currentUserId = 1;
  const individualMessages = [
    {
      messageId: 1,
      userReceiverId: 2,
      status: "string",
      read: false,
      message: {
        messageId: 1,
        senderId: 1,
        content: "Hello",
        time: "2023-12-16T19:59:37.01",
        messageType: "Individual",
        messageFormat: "Text",
        active: true,
        sender: null,
      },
      userReceiver: null,
    },
    {
      messageId: 2,
      userReceiverId: 1,
      status: "string",
      read: false,
      message: {
        messageId: 2,
        senderId: 2,
        content: "Hello back again",
        time: "2023-12-16T19:59:42.027",
        messageType: "Individual",
        messageFormat: "Text",
        active: true,
        sender: null,
      },
      userReceiver: null,
    },
    {
      messageId: 3,
      userReceiverId: 2,
      status: "string",
      read: false,
      message: {
        messageId: 3,
        senderId: 1,
        content: "Hello",
        time: "2023-12-16T20:03:34.78",
        messageType: "Individual",
        messageFormat: "Text",
        active: true,
        sender: null,
      },
      userReceiver: null,
    },
    {
      messageId: 4,
      userReceiverId: 2,
      status: "string",
      read: false,
      message: {
        messageId: 4,
        senderId: 1,
        content: "🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡",
        time: "2023-12-17T16:57:28.153",
        messageType: "Individual",
        messageFormat: "Text",
        active: true,
        sender: null,
      },
      userReceiver: null,
    },
    {
      messageId: 5,
      userReceiverId: 2,
      status: "string",
      read: false,
      message: {
        messageId: 5,
        senderId: 1,
        content: "hsgajkhsgfkjashgkjashgkjasghag",
        time: "2023-12-18T18:33:03.103",
        messageType: "Individual",
        messageFormat: "Text",
        active: true,
        sender: null,
      },
      userReceiver: null,
    },
    {
      messageId: 6,
      userReceiverId: 2,
      status: "string",
      read: false,
      message: {
        messageId: 6,
        senderId: 1,
        content: "hsgajkhsgfkjashgkjashgkjasghagfasfasfafssafasfasfafasfaf",
        time: "2023-12-18T18:33:40.713",
        messageType: "Individual",
        messageFormat: "Text",
        active: true,
        sender: null,
      },
      userReceiver: null,
    },
    {
      messageId: 7,
      userReceiverId: 2,
      status: "string",
      read: false,
      message: {
        messageId: 7,
        senderId: 1,
        content:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        time: "2023-12-18T18:48:06.203",
        messageType: "Individual",
        messageFormat: "Text",
        active: true,
        sender: null,
      },
      userReceiver: null,
    },
  ];

  const createMessageItemContainer = () => {
    if (individualMessages.length === 0) {
      return;
    }
    // Implement later
    let start = individualMessages[0].userReceiverId;
    let startIndex = 0;
    const messageContainers = [];
    // For removing Reactjs key warning
    let key = 0;
    for (let i = 1; i <= individualMessages.length; i++) {
      if (
        i !== individualMessages.length &&
        start === individualMessages[i].userReceiverId
      ) {
        continue;
      }
      const subArray = individualMessages.slice(startIndex, i);
      if (i < individualMessages.length) {
        start = individualMessages[i].userReceiverId;
        startIndex = i;
      }
      const isSender = currentUserId !== subArray[0].userReceiverId;
      const messageContainer = (
        <div
          key={key}
          className={cx("message-item-container", isSender && "sender")}
        >
          <div
            className={cx(
              "message-list",
              "w-100",
              "d-flex",
              "flex-column",
              isSender ? "align-items-end" : "align-items-start"
            )}
          >
            {subArray.map((im) => (
              <Message
                key={im.messageId}
                name={im.userReceiverId + ""}
                content={im.message.content}
                time={im.message.time}
                sender={isSender}
              />
            ))}
          </div>
        </div>
      );
      key++;
      messageContainers.push(messageContainer);
    }
    return messageContainers;
  };

  return (
    <div
      className={cx(
        "chat-box-container",
        "h-100",
        "d-flex",
        "flex-column",
        className
      )}
    >
      <div className={cx("user-info-container", "d-flex")}>
        <ChatViewHeader
          images={[image]}
          name={name}
          showAside={showAside}
          setShowAside={setShowAside}
        />
      </div>

      <div
        className={cx(
          "conversation-container",
          "flex-grow-1",
          "overflow-y-hidden"
        )}
      >
        <div className={cx("message-container", "overflow-y-scroll")}>
          {createMessageItemContainer()}
        </div>
        <div className={cx("user-input-notification")}>
          User A is typing ...
        </div>
      </div>

      <div className={cx("input-message-container", "w-100", "d-flex")}>
        <ChatViewFooter />
      </div>
    </div>
  );
};

export default ChatViewContainer;
