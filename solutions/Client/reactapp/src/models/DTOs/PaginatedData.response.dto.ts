import { Message } from "..";
import { MessageListMetaData } from "./MessageList.metadata";

export type PaginatedDataResponse<Type, MetadataType> = {
  paginatedData: Type[];
  metadata: MetadataType;
};

export type PaginatedMessageListResponse = PaginatedDataResponse<
  Message,
  MessageListMetaData
>;
