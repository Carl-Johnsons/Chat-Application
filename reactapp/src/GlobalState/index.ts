import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import {
  Friend,
  FriendRequest,
  IndividualMessage,
  ModalType,
  User,
} from "../Models";
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  // Number
  activeConversation: 0 as number,
  activeNav: 1 as number,
  activeModal: 0 as number,
  modalUserId: null as unknown as number,
  userId: null as unknown as number,
  // User
  searchResult: null as unknown as User | null,
  userMap: new Map<number, User>(),
  // Friend
  friendList: null as unknown as Friend[],
  // FriendRequest
  friendRequestList: null as unknown as FriendRequest[],
  // IndividualMessage
  individualMessageList: null as unknown as IndividualMessage[],
  // Boolean
  isLeftShow: true,
  isRightShow: true,
  isSearchBarFocus: false,
  showAside: false,
  showModal: false,
  // ModalType
  modalType: null as unknown as ModalType,
  // HubConnection
  connection: null as unknown as HubConnection,
  // HubConnectionState
  connectionState: HubConnectionState.Disconnected as HubConnectionState,
};

const { useGlobalState, setGlobalState } = createGlobalState(initialState);

const resetGlobalState = () => {
  Object.entries(initialState).forEach(([key, value]) => {
    setGlobalState(key as keyof typeof initialState, value);
  });
};
export { useGlobalState, setGlobalState, resetGlobalState };
