import { Friend, FriendRequest, IndividualMessage, User } from "../../Models";
import DateUtil from "../DateUtil/DateUtil";

export default class APIUtils {
  private static BASE_ADDRESS: string = "https://localhost:7190";
  constructor() {}

  // USER API

  // ============================== GET Section ==============================
  /**
   * @param {number} userId
   * @returns {User}
   */
  static async getUser(userId: number): Promise<[User | null, unknown]> {
    if (!userId) {
      throw new Error("User id is not valid!");
    }
    try {
      const url = APIUtils.BASE_ADDRESS + "/api/Users/" + userId;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

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
  }

  static async searchUser(
    phoneNumber: string
  ): Promise<[User | null, unknown]> {
    if (!phoneNumber) {
      throw new Error("Phone number is not valid");
    }
    try {
      const url = APIUtils.BASE_ADDRESS + "/api/Users/Search/" + phoneNumber;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
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
  }

  /**
   * if you want only friend array, you can use this line
   * data.map(item => item.friendNavigation)
   * @param {number} userId
   * @returns
   */
  static async getFriendList(
    userId: number
  ): Promise<[Friend[] | null, unknown]> {
    if (!userId) {
      throw new Error("User id is not valid!");
    }
    try {
      const url = APIUtils.BASE_ADDRESS + "/api/Users/GetFriend/" + userId;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

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
  }

  /**
   * If you want to get only the sender array, you can use this line of code:
   * data.map(item => item.sender)
   * @param {number} userId
   * @returns
   */
  static async getFriendRequestList(
    userId: number
  ): Promise<[FriendRequest[] | null, unknown]> {
    if (!userId) {
      throw new Error("userId is not valid");
    }
    try {
      const url =
        APIUtils.BASE_ADDRESS +
        "/api/Users/GetFriendRequestsByReceiverId/" +
        userId;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

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
  }

  // ============================== POST Section ==============================
  /**
   * send friend request using fetch API
   * @param {User} user
   * @param {number} receiverId
   * @returns
   */
  static async sendFriendRequest(
    user: User,
    receiverId: number
  ): Promise<[FriendRequest | null, unknown]> {
    if (!user || !receiverId) {
      throw new Error("User or receiverId is not valid");
    }

    try {
      const friendRequest = {
        senderId: user.userId,
        receiverId: receiverId,
        content: "Xin chào! tôi là " + user.name,
      };

      const url = APIUtils.BASE_ADDRESS + "/api/Users/SendFriendRequest";
      const fetchConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(friendRequest),
      };

      const response = await fetch(url, fetchConfig);
      const data = await response.json();
      return [data, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }

  /**
   * Add a friend using fetch API
   * - Sender is the one who send the friend request
   * - Receiver is the one who accept the friend request
   * @param {number} senderId
   * @param {number} receiverId
   * @returns
   */
  static async addFriend(
    senderId: number,
    receiverId: number
  ): Promise<[number | null, unknown]> {
    if (!senderId) {
      throw new Error("senderId is not valid");
    }
    // Sender is the one who send the request not the current user
    // The current user is the one who accept the friend request
    try {
      const url =
        APIUtils.BASE_ADDRESS +
        "/api/Users/AddFriend/" +
        senderId +
        "/" +
        receiverId;
      const fetchConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, fetchConfig);
      const status = response.status;
      return [status, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }
  // ============================== PUT Section ==============================

  /**
   * @param {User} user
   * @returns
   */
  static async updateUser(user: User): Promise<[User | null, unknown]> {
    if (!user) {
      throw new Error("User data is not valid");
    }
    try {
      const url = APIUtils.BASE_ADDRESS + "/api/Users/" + user.userId;
      const fetchConfig = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };

      const response = await fetch(url, fetchConfig);
      const data = await response.json();
      return [data, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }

  // ============================== DELETE Section ==============================
  static async deleteFriend(
    userId: number,
    friendId: number
  ): Promise<[number | null, unknown]> {
    if (!userId || !friendId) {
      throw new Error("userId or friendId is not valid");
    }

    try {
      const url =
        APIUtils.BASE_ADDRESS +
        "/api/Users/RemoveFriend/" +
        userId +
        "/" +
        friendId;
      const fetchConfig = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

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
  }
  static async deleteFriendRequest(
    senderId: number,
    receiverId: number
  ): Promise<[number | null, unknown]> {
    if (!senderId || !receiverId) {
      throw new Error("SenderId or receiverId is not valid");
    }

    try {
      const url =
        APIUtils.BASE_ADDRESS +
        "/api/Users/RemoveFriendRequest/" +
        senderId +
        "/" +
        receiverId;
      const fetchConfig = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, fetchConfig);
      const status = response.status;
      return [status, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }

  // MESSAGE API
  // ============================== GET Section ==============================

  /**
   * @param {number} senderId
   * @param {number} receiverId
   * @returns
   */
  static async getIndividualMessageList(
    senderId: number,
    receiverId: number
  ): Promise<[IndividualMessage[] | null, unknown]> {
    if (!senderId || !receiverId) {
      throw new Error("sender id or receiver id is invalid");
    }
    try {
      const url =
        APIUtils.BASE_ADDRESS +
        "/api/Messages/GetIndividualMessage/" +
        senderId +
        "/" +
        receiverId;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

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
  }
  /**
   *
   * @param senderId
   * @param receiverId
   * @returns
   */
  static async getLastIndividualMessageList(
    senderId: number,
    receiverId: number
  ): Promise<[IndividualMessage | null, unknown]> {
    if (!senderId || !receiverId) {
      throw new Error("sender id or receiver id is invalid");
    }
    try {
      const url =
        APIUtils.BASE_ADDRESS +
        "/api/Messages/GetLastIndividualMessage/" +
        senderId +
        "/" +
        receiverId;
      const fetchConfig = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

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
  }

  // ============================== POST Section ==============================
  /**
   * The sender is the current User while the receiver is the other user
   * The messageContent is a string
   * @param {number} senderId
   * @param {number} receiverId
   * @param {string} messageContent
   * @returns
   */
  static async sendIndividualMessage(
    senderId: number,
    receiverId: number,
    messageContent: string
  ): Promise<[IndividualMessage | null, unknown]> {
    try {
      //individual message object
      const messageObject = {
        userReceiverId: receiverId,
        status: "string",
        message: {
          senderId: senderId,
          content: messageContent,
          time: DateUtil.getCurrentDateTimeInISO8601(),
          messageType: "Individual",
          messageFormat: "Text",
          active: true,
        },
      };
      const url = APIUtils.BASE_ADDRESS + "/api/Messages/SendIndividualMessage";
      const fetchConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageObject),
      };
      const response = await fetch(url, fetchConfig);
      const data = await response.json();
      return [data, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }

  // TOOL API
  // ============================== POST Section ==============================

  /**
   * Upload an img using fetch API
   * @param {string | Blob} file
   * @returns
   */
  static async uploadImage(
    file: string | Blob
  ): Promise<[string | null, unknown]> {
    if (!file) {
      console.log("file is invalid");
    }
    try {
      const url = APIUtils.BASE_ADDRESS + "/api/Tools/UploadImageImgur/";

      const formData = new FormData();
      formData.append("ImageFile", file);

      const response = await fetch(url, {
        method: "POST",
        headers: {},
        body: formData,
      });

      const data = await response.text();
      return [data, null];
    } catch (err) {
      console.error(err);
      return [null, err];
    }
  }
}
