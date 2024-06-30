export type Post = {
  id: string;
  content: string;
  userId: string;
  interactTotal: number;
  interactions: string[];
  createdAt: Date;
  tags: string[];
  attachedFilesURL: string;
};
