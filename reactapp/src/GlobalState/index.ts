import { Friend, FriendRequest, IndividualMessage, User } from "../Models";
import { createGlobalState } from "react-hooks-global-state";

const { useGlobalState, setGlobalState } = createGlobalState({
  user: null as unknown as User,
  userMap: new Map<number, User>(),
  friendList: null as unknown as Friend[],
  friendRequestList: null as unknown as FriendRequest[],
  individualMessageList: null as unknown as IndividualMessage[],
  activeConversation: 0 as unknown as number,
});

export { useGlobalState, setGlobalState };
