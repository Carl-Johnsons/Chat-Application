import {
  Friend,
  FriendRequest,
  IndividualMessage,
  JwtToken,
  User,
} from "../Models";
import { getCurrentDateTimeInISO8601 } from "./DateUtils";
import RequestInitBuilder from "./RequestInitBuilder";
const BASE_ADDRESS: string = import.meta.env.VITE_BASE_API_URL;
const ACCESS_TOKEN = "accessToken";

// Auth API
export const login = async (
  phoneNumber: string,
  password: string
): Promise<[JwtToken | null, unknown]> => {
  if (!phoneNumber || !password) {
    throw new Error("phone number or password is not valid");
  }
  try {
    const url = BASE_ADDRESS + "/api/Auth/Login";

    const fetchConfig = new RequestInitBuilder()
      .withMethod("POST")
      .withContentJson()
      .withBody(JSON.stringify({ phoneNumber, password }))
      .build();

    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }
    const data: JwtToken = await response.json();
    localStorage.setItem("accessToken", data.token);
    return [data, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
// USER API

// ============================== GET Section ==============================
/**
 * @param {number} userId
 * @returns {User}
 */
export const getUser = async (
  userId: number
): Promise<[User | null, unknown]> => {
  if (!userId) {
    throw new Error("User id is not valid!");
  }
  try {
    const url = BASE_ADDRESS + "/api/Users/" + userId;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("GET")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();

    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }
    const data = await response.json();

    return [data, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
export const getUserProfile = async (): Promise<[User | null, unknown]> => {
  try {
    const url = BASE_ADDRESS + "/api/Users/GetUserProfile";
    const fetchConfig = new RequestInitBuilder()
      .withMethod("GET")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();

    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }
    const data = await response.json();

    return [data, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
export const searchUser = async (
  phoneNumber: string
): Promise<[User | null, unknown]> => {
  if (!phoneNumber) {
    throw new Error("Phone number is not valid");
  }
  try {
    const url = BASE_ADDRESS + "/api/Users/Search/" + phoneNumber;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("GET")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();

    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }
    const data = await response.json();

    return [data, null];
  } catch (err) {
    console.error(err);
    return [null, err];
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
  if (!userId) {
    throw new Error("User id is not valid!");
  }
  try {
    const url = BASE_ADDRESS + "/api/Users/GetFriend/" + userId;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("GET")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();

    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }
    const data = await response.json();
    return [data, null];

    // Only get friendNavigation then convert it to array
    //resolve(data.map(item => item.friendNavigation));

    //refactor later (Uncomment)
    //ChatApplicationNamespace.LoadFriendData(_FRIEND_LIST);
    //ChatApplicationNamespace.LoadConversationList(_FRIEND_LIST);
  } catch (err) {
    console.error(err);
    return [null, err];
  }
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
  if (!userId) {
    throw new Error("userId is not valid");
  }
  try {
    const url =
      BASE_ADDRESS + "/api/Users/GetFriendRequestsByReceiverId/" + userId;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("GET")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();

    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }

    const data = await response.json();
    return [data, null];
    //refactor later (Uncomment)
    //ChatApplicationNamespace.LoadFriendRequestData(_FRIEND_REQUEST_LIST);
  } catch (err) {
    console.error(err);
    return [null, err];
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
  if (!user || !receiverId) {
    throw new Error("User or receiverId is not valid");
  }

  try {
    const friendRequest = {
      senderId: user.userId,
      receiverId: receiverId,
      content: "Xin chào! tôi là " + user.name,
    };

    const url = BASE_ADDRESS + "/api/Users/SendFriendRequest";
    const fetchConfig = new RequestInitBuilder()
      .withMethod("POST")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .withBody(JSON.stringify(friendRequest))
      .build();

    const response = await fetch(url, fetchConfig);
    const data = await response.json();
    return [data, null];
  } catch (err) {
    console.error(err);
    return [null, err];
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
  if (!senderId) {
    throw new Error("senderId is not valid");
  }
  // Sender is the one who send the request not the current user
  // The current user is the one who accept the friend request
  try {
    const url =
      BASE_ADDRESS + "/api/Users/AddFriend/" + senderId + "/" + receiverId;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("POST")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();
    const response = await fetch(url, fetchConfig);
    const status = response.status;
    return [status, null];
  } catch (err) {
    console.error(err);
    return [null, err];
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
  if (!user) {
    throw new Error("User data is not valid");
  }
  try {
    const url = BASE_ADDRESS + "/api/Users/" + user.userId;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("PUT")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .withBody(JSON.stringify(user))
      .build();

    const response = await fetch(url, fetchConfig);
    const data = await response.json();
    return [data, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
// ============================== DELETE Section ==============================
export const deleteFriend = async (
  userId: number,
  friendId: number
): Promise<[number | null, unknown]> => {
  if (!userId || !friendId) {
    throw new Error("userId or friendId is not valid");
  }

  try {
    const url =
      BASE_ADDRESS + "/api/Users/RemoveFriend/" + userId + "/" + friendId;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("DELETE")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();

    const response = await fetch(url, fetchConfig);
    const status = response.status;
    return [status, null];

    //refactor later
    //Notify other user
    //_CONNECTION.invoke("DeleteFriend", friendObject.userId).catch(function (err) {
    //    console.log("Error when notify deleting friend");
    //});

    //refactor later
    //Updating friend list
    //ChatApplicationNamespace.GetFriendList();
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
export const deleteFriendRequest = async (
  senderId: number,
  receiverId: number
): Promise<[number | null, unknown]> => {
  if (!senderId || !receiverId) {
    throw new Error("SenderId or receiverId is not valid");
  }

  try {
    const url =
      BASE_ADDRESS +
      "/api/Users/RemoveFriendRequest/" +
      senderId +
      "/" +
      receiverId;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("DELETE")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();
    const response = await fetch(url, fetchConfig);
    const status = response.status;
    return [status, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
// MESSAGE API
// ============================== GET Section ==============================
/**
 * @param {number} senderId
 * @param {number} receiverId
 * @returns
 */
export const getIndividualMessageList = async (
  senderId: number,
  receiverId: number
): Promise<[IndividualMessage[] | null, unknown]> => {
  if (!senderId || !receiverId) {
    throw new Error("sender id or receiver id is invalid");
  }
  try {
    const url =
      BASE_ADDRESS +
      "/api/Messages/GetIndividualMessage/" +
      senderId +
      "/" +
      receiverId;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("GET")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();

    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }
    const data = await response.json();
    return [data, null];

    //refactor later (Uncomment)
    //ChatApplicationNamespace.LoadConversation(_MESSAGE_LIST, [senderId]);
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
/**
 *
 * @param senderId
 * @param receiverId
 * @returns
 */
export const getLastIndividualMessageList = async (
  senderId: number,
  receiverId: number
): Promise<[IndividualMessage | null, unknown]> => {
  if (!senderId || !receiverId) {
    throw new Error("sender id or receiver id is invalid");
  }
  try {
    const url =
      BASE_ADDRESS +
      "/api/Messages/GetLastIndividualMessage/" +
      senderId +
      "/" +
      receiverId;
    const fetchConfig = new RequestInitBuilder()
      .withMethod("GET")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();

    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      throw new Error("Fetch error: " + response.statusText);
    }
    const data = await response.json();
    return [data, null];

    //refactor later (Uncomment)
    //ChatApplicationNamespace.LoadConversation(_MESSAGE_LIST, [senderId]);
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
// ============================== POST Section ==============================
/**
 * The sender is the current User while the receiver is the other user
 * The messageContent is a string
 * @param {number} senderId
 * @param {number} receiverId
 * @param {string} messageContent
 * @returns
 */
export const sendIndividualMessage = async (
  senderId: number,
  receiverId: number,
  messageContent: string
): Promise<[IndividualMessage | null, unknown]> => {
  try {
    //individual message object
    const messageObject = {
      userReceiverId: receiverId,
      status: "string",
      message: {
        senderId: senderId,
        content: messageContent,
        time: getCurrentDateTimeInISO8601(),
        messageType: "Individual",
        messageFormat: "Text",
        active: true,
      },
    };
    const url = BASE_ADDRESS + "/api/Messages/SendIndividualMessage";
    const fetchConfig = new RequestInitBuilder()
      .withMethod("POST")
      .withContentJson()
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .withBody(JSON.stringify(messageObject))
      .build();

    const response = await fetch(url, fetchConfig);
    const data = await response.json();
    return [data, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
// TOOL API
// ============================== POST Section ==============================
/**
 * Upload an img using fetch API
 * @param {string | Blob} file
 * @returns
 */
export const uploadImage = async (
  file: string | Blob
): Promise<[string | null, unknown]> => {
  if (!file) {
    console.log("file is invalid");
  }
  try {
    const url = BASE_ADDRESS + "/api/Tools/UploadImageImgur/";

    const formData = new FormData();
    formData.append("ImageFile", file);

    const fetchConfig = new RequestInitBuilder()
      .withMethod("POST")
      .withBody(formData)
      .withAuthorization(`Bearer ${localStorage.getItem(ACCESS_TOKEN)}`)
      .build();

    const response = await fetch(url, fetchConfig);

    const data = await response.text();
    return [data, null];
  } catch (err) {
    console.error(err);
    return [null, err];
  }
};
