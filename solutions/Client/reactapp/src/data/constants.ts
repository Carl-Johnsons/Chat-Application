import images from "@/assets";

interface MenuContact {
  image: string;
  name: string;
  isActive?: boolean;
}

enum MenuContactIndex {
  FRIEND_LIST = 0,
  GROUP_LIST = 1,
  FRIEND_REQUEST_LIST = 2,
  USER_BLACK_LIST = 3,
}
enum SignalREvent {
  CONNECTED = "Connected",
  DISCONNECTED = "Disconnected",
  RECEIVE_ACCEPT_FRIEND_REQUEST = "ReceiveAcceptFriendRequest",
  RECEIVE_DISABLE_NOTIFY_USER_TYPING = "ReceiveDisableNotifyUserTyping",
  RECEIVE_FRIEND_REQUEST = "ReceiveFriendRequest",
  RECEIVE_JOIN_CONVERSATION = "ReceiveJoinConversation",
  RECEIVE_MESSAGE = "ReceiveMessage",
  RECEIVE_NOTIFY_USER_TYPING = "ReceiveNotifyUserTyping",
  RECEIVE_CALL = "ReceiveCall",
}
const menuContacts: MenuContact[] = [
  { image: images.userSolid.src, name: "Danh sách bạn bè" },
  { image: images.userGroupSolid.src, name: "Danh sách nhóm" },
  { image: images.envelopeOpenRegular.src, name: "Lời mời kết bạn" },
  { image: images.blockList.src, name: "Danh sách chặn" },
];

enum KEYBOARD_KEY {
  SPACE = " ",
  ENTER = "Enter",
  UP_ARROW = "ArrowUp",
  DOWN_ARROW = "ArrowDown",
}

export { menuContacts, MenuContactIndex, SignalREvent, KEYBOARD_KEY };
