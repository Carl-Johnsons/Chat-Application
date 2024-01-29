import { IndividualMessage } from "../../Models";
import { getCurrentDateTimeInISO8601 } from "../DateUtils";
import { BASE_ADDRESS, handleAPIRequest } from "./APIUtils";


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
  const url =
    BASE_ADDRESS +
    "/api/Messages/GetIndividualMessage/" +
    senderId +
    "/" +
    receiverId;
  const [individualMessages, error] = await handleAPIRequest<
    IndividualMessage[]
  >({ url, method: "GET" });
  return [individualMessages, error];
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
  const url =
    BASE_ADDRESS +
    "/api/Messages/GetLastIndividualMessage/" +
    senderId +
    "/" +
    receiverId;
  const [individualMessage, error] = await handleAPIRequest<IndividualMessage>({
    url,
    method: "GET",
  });
  return [individualMessage, error];
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
  const url = BASE_ADDRESS + "/api/Messages/SendIndividualMessage";
  const [individualMessage, error] = await handleAPIRequest<IndividualMessage>({
    url,
    method: "POST",
    data: messageObject,
  });
  return [individualMessage, error];
};
