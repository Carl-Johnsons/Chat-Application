import { Message } from "..";

export type MessageDTO = {
  senderId: Message["senderId"];
  conversationId: Message["conversationId"];
  content: Message["content"];
};
