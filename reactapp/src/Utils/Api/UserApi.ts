import { Friend, FriendRequest, User } from "../../Models";
import axiosInstance from "./axios";

// ============================== GET Section ==============================
/**
 * @param {number} userId
 * @returns {User}
 */
export const getUser = async (
  userId: number
): Promise<[User | null, unknown]> => {
  try {
    const url = "/api/Users/" + userId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const getUserProfile = async (): Promise<[User | null, unknown]> => {
  try {
    const url = "/api/Users/GetUserProfile";
    const response = await axiosInstance.get(url);
    
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};

export const searchUser = async (
  phoneNumber: string
): Promise<[User | null, unknown]> => {
  try {
    const url = "/api/Users/Search/" + phoneNumber;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
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
  try {
    const url = "/api/Users/GetFriend/" + userId;
    const response = await axiosInstance.get(url);
    
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
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
  try {
    const url = "/api/Users/GetFriendRequestsByReceiverId/" + userId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
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
  try {
    const data = {
      senderId: user.userId,
      receiverId: receiverId,
      content: "Xin chào! tôi là " + user.name,
    };
    const url = "/api/Users/SendFriendRequest";
    const response = await axiosInstance.post(url, data);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
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
  try {
    const url = "/api/Users/AddFriend/" + senderId + "/" + receiverId;
    const response = await axiosInstance.post(url);
    return [response.status, null];
  } catch (error) {
    return [null, error];
  }
};
// ============================== PUT Section ==============================
/**
 * @param {User} user
 * @returns
 */
export const updateUser = async (
  user: User
): Promise<[User | null, unknown]> => {
  try {
    const url = "/api/Users/" + user.userId;
    const response = await axiosInstance.put(url, user);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
// ============================== DELETE Section ==============================
export const deleteFriend = async (
  userId: number,
  friendId: number
): Promise<[number | null, unknown]> => {
  try {
    const url = "/api/Users/RemoveFriend/" + userId + "/" + friendId;
    const response = await axiosInstance.delete(url);
    return [response.status, null];
  } catch (error) {
    return [null, error];
  }
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
  try {
    const url = "/api/Users/RemoveFriendRequest/" + senderId + "/" + receiverId;
    const response = await axiosInstance.delete(url);
    return [response.status, null];
  } catch (error) {
    return [null, error];
  }
};
