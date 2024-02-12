import axiosInstance from "../../utils/Api/axios";
import { GroupMessage } from "../../models";
import { getCurrentDateTimeInISO8601 } from "../../utils/DateUtils";

/**
 * @param {number} senderId
 * @param {number} groupReceiverId
 * @param {string} messageContent
 * @returns
 */
export const sendGroupMessage = async (
  senderId: number,
  groupReceiverId: number,
  messageContent: string
): Promise<[GroupMessage | null, unknown]> => {
  //individual message object
  const messageObject: GroupMessage = {
    groupReceiverId: groupReceiverId,
    message: {
      senderId: senderId,
      content: messageContent,
      time: getCurrentDateTimeInISO8601(),
      messageType: "Group",
      messageFormat: "Text",
      active: true,
    },
  };

  try {
    const url = "/api/Messages/SendGroupMessage";
    const respone = await axiosInstance.post(url, messageObject);
    return [respone.data, null];
  } catch (error) {
    return [null, error];
  }
};
