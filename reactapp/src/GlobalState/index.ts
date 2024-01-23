import { HubConnection } from "@microsoft/signalr";
import { Friend, FriendRequest, IndividualMessage, User } from "../Models";
import { createGlobalState } from "react-hooks-global-state";

const { useGlobalState, setGlobalState } = createGlobalState({
  userId: null as unknown as number,
  userMap: new Map<number, User>(),
  friendList: null as unknown as Friend[],
  friendRequestList: null as unknown as FriendRequest[],
  individualMessageList: null as unknown as IndividualMessage[],
  activeConversation: 0 as unknown as number,
  showAside: false as boolean,
  showModal: false as boolean,
  connection: null as unknown as HubConnection,
});

export { useGlobalState, setGlobalState };
