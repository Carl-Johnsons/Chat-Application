import { Comment, Interaction } from ".";

export type Post = {
  id: string;
  content: string;
  createdAt: Date;
  comments: Comment[];
  interactions: Interaction[];
};
