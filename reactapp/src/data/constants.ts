import images from "../assets";

interface MenuContact {
  image: string;
  name: string;
  isActive?: boolean;
}

enum MenuContactIndex {
  FRIEND_LIST = 0,
  GROUP_LIST = 1,
  FRIEND_REQUEST_LIST = 2,
}
enum SignalREvent {
  CONNECTED = "Connected",
  DISCONNECTED = "Disconnected",
  RECEIVE_INDIVIDUAL_MESSAGE = "ReceiveIndividualMessage",
  RECEIVE_FRIEND_REQUEST = "ReceiveFriendRequest",
  RECEIVE_ACCEPT_FRIEND_REQUEST = "ReceiveAcceptFriendRequest",
  RECEIVE_NOTIFY_USER_TYPING = "ReceiveNotifyUserTyping",
  RECEIVE_DISABLE_NOTIFY_USER_TYPING = "ReceiveDisableNotifyUserTyping",
}

const menuContacts: MenuContact[] = [
  { image: images.userSolid, name: "Danh sách bạn bè" },
  { image: images.userGroupSolid, name: "Danh sách nhóm" },
  { image: images.envelopeOpenRegular, name: "Lời mời kết bạn" },
];

export { menuContacts, MenuContactIndex, SignalREvent };
