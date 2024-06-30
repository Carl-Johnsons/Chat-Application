import { Conversation } from ".";

export type GroupConversation = Conversation & {
  name: string;
  imageURL: string;
};
