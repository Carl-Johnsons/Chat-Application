import { ConversationType, ModalType, User } from "../../models";
import { createGlobalState } from "react-hooks-global-state";
import { Instance, SignalData } from "simple-peer";


const initialState = {
  // Number
  activeContactType: 0,
  activeDashboardType: 0,
  activeNav: 1,
  activeModal: 0,
  // string
  activeConversationId: "",
  modalEntityId: null as unknown as string,
  userTypingId: null as unknown as string | null,
  userIdsOnlineList: [] as string[],
  // User
  searchResult: null as unknown as User[] | null,
  // IndividualMessage | GroupMessage
  conversationType: "Individual" as ConversationType,
  // Boolean
  isLeftShow: true,
  isRightShow: true,
  isSearchBarFocus: false,
  showAside: false,
  showModal: false,
  // ModalType
  modalType: null as unknown as ModalType,
  //Peer
  userPeer: null as unknown as Instance,
  signalData: null as unknown as SignalData,
  streamData: null as unknown as MediaStream
};

const { useGlobalState, setGlobalState } = createGlobalState(initialState);

const resetGlobalState = () => {
  Object.entries(initialState).forEach(([key, value]) => {
    setGlobalState(key as keyof typeof initialState, value);
  });
};
export { useGlobalState, setGlobalState, resetGlobalState };
