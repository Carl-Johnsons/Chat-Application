import { Message, Comment } from "..";
/* ============================ Metadata  ============================ */
export type MessageListMetaData = {
  lastMessage?: Message;
};

export type PostListMetadata = {};

export type EmptyMetadata = {};
/* ============================ Response  ============================ */

export type PaginatedDataResponse<Type, MetadataType> = {
  paginatedData: Type[];
  metadata: MetadataType;
};

export type PaginatedMessageListResponse = PaginatedDataResponse<
  Message,
  MessageListMetaData
>;

export type PaginatedPostListResponse = PaginatedDataResponse<
  string,
  EmptyMetadata
>;

export type PaginatedCommentListResponse = PaginatedDataResponse<
  Comment,
  EmptyMetadata
>;
