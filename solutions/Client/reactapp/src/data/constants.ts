import images from "@/assets";

export interface MenuContact {
  image: string;
  name: string;
  isActive?: boolean;
}

export enum MenuContactIndex {
  FRIEND_LIST = 0,
  GROUP_LIST = 1,
  FRIEND_REQUEST_LIST = 2,
  USER_BLACK_LIST = 3,
}

export enum DASHBOARD_TYPE {
  USER_MANAGEMENT = 0,
  POST_MANAGEMENT = 1,
}

export enum SignalREvent {
  CONNECTED = "Connected",
  DISCONNECTED = "Disconnected",
  RECEIVE_ACCEPT_FRIEND_REQUEST = "ReceiveAcceptFriendRequest",
  RECEIVE_DISABLE_NOTIFY_USER_TYPING = "ReceiveDisableNotifyUserTyping",
  RECEIVE_FRIEND_REQUEST = "ReceiveFriendRequest",
  RECEIVE_JOIN_CONVERSATION = "ReceiveJoinConversation",
  RECEIVE_MESSAGE = "ReceiveMessage",
  RECEIVE_NOTIFY_USER_TYPING = "ReceiveNotifyUserTyping",
  RECEIVE_DISBAND_CONVERSATION = "ReceiveDisbandConversation",
  RECEIVE_CALL = "ReceiveCall",
  RECEIVE_SIGNAL = "ReceiveSignal",
  FORCED_LOGOUT = "ForcedLogout",
  DELETE_POST = "DeletePost",
  REPORT_POST = "ReportPost",
  RECEICE_ACCEPT_CALL = "ReceiveAcceptCall"
}

export const menuContacts: MenuContact[] = [
  { image: images.userSolid.src, name: "Danh sách bạn bè" },
  { image: images.userGroupSolid.src, name: "Danh sách nhóm" },
  { image: images.envelopeOpenRegular.src, name: "Lời mời kết bạn" },
  { image: images.blockList.src, name: "Danh sách chặn" },
];

export enum KEYBOARD_KEY {
  SPACE = " ",
  ENTER = "Enter",
  UP_ARROW = "ArrowUp",
  DOWN_ARROW = "ArrowDown",
}

export enum BUTTON {
  LIKE = "Like",
  REPORT = "Report",
  DELETE = "Delete",
}

export enum ROLE {
  ADMIN = "Admin",
  USER = "User",
}

export enum FILE_TYPE {
  IMAGE = "Image",
  VIDEO = "Video",
  RAW = "Raw",
}

export enum CALL_STATUS {
  PREPARING = "Preparing",
  CONNECTING = "Connecting",
  CALLING = "Calling",
  CONNECTED = "Connected",
  DECLINED = "Declined",
  EXITED = "Exited"
}
