import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { Friend, FriendRequest, IndividualMessage, User } from "../Models";
import { createGlobalState } from "react-hooks-global-state";

const initialState = {
  userId: null as unknown as number,
  userMap: new Map<number, User>(),
  friendList: null as unknown as Friend[],
  friendRequestList: null as unknown as FriendRequest[],
  individualMessageList: null as unknown as IndividualMessage[],
  activeConversation: 0 as unknown as number,
  activeNav: 1 as number,
  showAside: false,
  showModal: false,
  isLeftShow: true,
  isRightShow: true,
  isSearchBarFocus: false,
  searchResult: null as unknown as User | null,
  connection: null as unknown as HubConnection,
  connectionState: HubConnectionState.Disconnected as HubConnectionState,
};

const { useGlobalState, setGlobalState } = createGlobalState(initialState);

const resetGlobalState = () => {
  Object.entries(initialState).forEach(([key, value]) => {
    setGlobalState(key as keyof typeof initialState, value);
  });
};
export { useGlobalState, setGlobalState, resetGlobalState };
