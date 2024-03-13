import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { MessageType, ModalType, User } from "../../models";
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  // Number
  activeConversation: 0,
  activeContactType: 0,
  activeNav: 1,
  activeModal: 0,
  modalEntityId: null as unknown as number,
  userTypingId: null as unknown as number | null,
  // User
  searchResult: null as unknown as User | null,
  // IndividualMessage | GroupMessage
  messageType: "Individual" as MessageType,
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
