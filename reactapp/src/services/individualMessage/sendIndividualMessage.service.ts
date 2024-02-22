import { IndividualMessage } from "@/models";
import { axiosInstance, getCurrentDateTimeInISO8601 } from "@/utils";

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
    const url = "/api/Messages/individual";
    const respone = await axiosInstance.post(url, messageObject);
    return [respone.data, null];
  } catch (error) {
    return [null, error];
  }
};
