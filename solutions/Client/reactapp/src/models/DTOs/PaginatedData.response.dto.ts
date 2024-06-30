import { ReportPostDTO } from ".";
import { Message, Comment, User } from "..";
/* ============================ Metadata  ============================ */
export type MessageListMetaData = {
  lastMessage?: Message;
};

export type PostListMetadata = {};

export type EmptyMetadata = {};

export type CommonPaginatedMetadata = {
  totalPage: number;
};
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

export type PaginatedReportPostListResponse = PaginatedDataResponse<
  ReportPostDTO,
  CommonPaginatedMetadata
>;

export type PaginatedCommentListResponse = PaginatedDataResponse<
  Comment,
  EmptyMetadata
>;

export type PaginatedUserListResponse = PaginatedDataResponse<
  User,
  CommonPaginatedMetadata
>;
