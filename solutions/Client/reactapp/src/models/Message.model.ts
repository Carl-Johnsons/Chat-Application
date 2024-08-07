export type Message = {
  id: string;
  senderId: string;
  conversationId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  source: "Client" | "Server";
  attachedFilesURL: string;
  active: boolean;
};
