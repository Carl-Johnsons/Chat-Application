export type Message = {
  id: number;
  senderId: number;
  conversationId: number;
  content: string;
  time: string;
  source: "Client" | "Server";
  format: "Text" | "Image";
  active: boolean;
};
