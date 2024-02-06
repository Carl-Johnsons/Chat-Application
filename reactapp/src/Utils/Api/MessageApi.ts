import { IndividualMessage } from "../../Models";
import { getCurrentDateTimeInISO8601 } from "../DateUtils";
import axiosInstance from "./axios";

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
  try {
    const url =
      "/api/Messages/GetIndividualMessage/" + senderId + "/" + receiverId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
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
  try {
    const url =
      "/api/Messages/GetLastIndividualMessage/" + senderId + "/" + receiverId;
    const response = await axiosInstance.get(url);
    return [response.data, null];
  } catch (error) {
    return [null, error];
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
  //individual message object
  const messageObject: IndividualMessage = {
    messageId: 0,
    userReceiverId: receiverId,
    userReceiver: null,
    status: "string",
    message: {
      messageId: 0,
      sender: null,
      senderId: senderId,
      content: messageContent,
      time: getCurrentDateTimeInISO8601(),
      messageType: "Individual",
      messageFormat: "Text",
      active: true,
    },
  };

  try {
    const url = "/api/Messages/SendIndividualMessage";
    const respone = await axiosInstance.post(url, messageObject);
    return [respone.data, null];
  } catch (error) {
    return [null, error];
  }
};
