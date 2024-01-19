import  Message  from "./Message";
import  User  from "./User";

export  interface IndividualMessage {
  messageId: number;
  userReceiverId: number;
  status: string;
  message: Message;
  userReceiver: User;
}
