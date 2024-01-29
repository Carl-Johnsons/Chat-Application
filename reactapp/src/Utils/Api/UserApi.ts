import { Friend, FriendRequest, User } from "../../Models";
import {
  BASE_ADDRESS,
  handleAPIRequest,
  handleStatusRequest,
} from "./APIUtils";

// ============================== GET Section ==============================
/**
 * @param {number} userId
 * @returns {User}
 */
export const getUser = async (
  userId: number
): Promise<[User | null, unknown]> => {
  const url = BASE_ADDRESS + "/api/Users/" + userId;
  const [user, error] = await handleAPIRequest<User>({ url, method: "GET" });
  return [user, error];
};

export const getUserProfile = async (): Promise<[User | null, unknown]> => {
  const url = BASE_ADDRESS + "/api/Users/GetUserProfile";
  const [user, error] = await handleAPIRequest<User>({ url, method: "GET" });
  return [user, error];
};
export const searchUser = async (
  phoneNumber: string
): Promise<[User | null, unknown]> => {
  const url = BASE_ADDRESS + "/api/Users/Search/" + phoneNumber;
  const [user, error] = await handleAPIRequest<User>({ url, method: "GET" });
  return [user, error];
};
/**
 * if you want only friend array, you can use this line
 * data.map(item => item.friendNavigation)
 * @param {number} userId
 * @returns
 */
export const getFriendList = async (
  userId: number
): Promise<[Friend[] | null, unknown]> => {
  const url = BASE_ADDRESS + "/api/Users/GetFriend/" + userId;
  const [friends, error] = await handleAPIRequest<Friend[]>({
    url,
    method: "GET",
  });
  return [friends, error];
  // Only get friendNavigation then convert it to array
  //resolve(data.map(item => item.friendNavigation));

  //refactor later (Uncomment)
  //ChatApplicationNamespace.LoadFriendData(_FRIEND_LIST);
  //ChatApplicationNamespace.LoadConversationList(_FRIEND_LIST);
};
/**
 * If you want to get only the sender array, you can use this line of code:
 * data.map(item => item.sender)
 * @param {number} userId
 * @returns
 */
export const getFriendRequestList = async (
  userId: number
): Promise<[FriendRequest[] | null, unknown]> => {
  const url =
    BASE_ADDRESS + "/api/Users/GetFriendRequestsByReceiverId/" + userId;
  const [friendRequests, error] = await handleAPIRequest<FriendRequest[]>({
    url,
    method: "GET",
  });
  return [friendRequests, error];
};
// ============================== POST Section ==============================
/**
 * send friend request using fetch API
 * @param {User} user
 * @param {number} receiverId
 * @returns
 */
export const sendFriendRequest = async (
  user: User,
  receiverId: number
): Promise<[FriendRequest | null, unknown]> => {
  const data = {
    senderId: user.userId,
    receiverId: receiverId,
    content: "Xin chào! tôi là " + user.name,
  };

  const url = BASE_ADDRESS + "/api/Users/SendFriendRequest";
  const [friendRequest, error] = await handleAPIRequest<FriendRequest>({
    url,
    method: "POST",
    data,
  });
  return [friendRequest, error];
};
/**
 * Add a friend using fetch API
 * - Sender is the one who send the friend request
 * - Receiver is the one who accept the friend request
 * @param {number} senderId
 * @param {number} receiverId
 * @returns
 */
export const addFriend = async (
  senderId: number,
  receiverId: number
): Promise<[number | null, unknown]> => {
  // Sender is the one who send the request not the current user
  // The current user is the one who accept the friend request
  const url =
    BASE_ADDRESS + "/api/Users/AddFriend/" + senderId + "/" + receiverId;
  const [status, error] = await handleStatusRequest({ url, method: "POST" });
  return [status, error];
};
// ============================== PUT Section ==============================
/**
 * @param {User} user
 * @returns
 */
export const updateUser = async (
  user: User
): Promise<[User | null, unknown]> => {
  const url = BASE_ADDRESS + "/api/Users/" + user.userId;
  const [data, error] = await handleAPIRequest<User>({
    url,
    method: "PUT",
    data: user,
  });
  return [data, error];
};
// ============================== DELETE Section ==============================
export const deleteFriend = async (
  userId: number,
  friendId: number
): Promise<[number | null, unknown]> => {
  const url =
    BASE_ADDRESS + "/api/Users/RemoveFriend/" + userId + "/" + friendId;
  const [status, error] = await handleStatusRequest({ url, method: "DELETE" });
  return [status, error];
  //refactor later
  //Notify other user
  //_CONNECTION.invoke("DeleteFriend", friendObject.userId).catch(function (err) {
  //    console.log("Error when notify deleting friend");
  //});

  //refactor later
  //Updating friend list
  //ChatApplicationNamespace.GetFriendList();
};
export const deleteFriendRequest = async (
  senderId: number,
  receiverId: number
): Promise<[number | null, unknown]> => {
  const url =
    BASE_ADDRESS +
    "/api/Users/RemoveFriendRequest/" +
    senderId +
    "/" +
    receiverId;
  const [status, error] = await handleStatusRequest({ url, method: "DELETE" });
  return [status, error];
};
