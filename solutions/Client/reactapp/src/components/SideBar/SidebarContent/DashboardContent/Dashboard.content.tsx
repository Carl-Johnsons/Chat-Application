import { useCallback, useState } from "react";

import SideBarItem from "../../SideBarItem";
import { useGlobalState, useScreenSectionNavigator } from "@/hooks";
import { ConversationType, Message } from "@/models";
import {
  useGetInfiniteMessageList,
  useGetLastMessages,
} from "@/hooks/queries/message";
import { useGetConversationList } from "@/hooks/queries/conversation";

const DashboardContent = () => {
  return <></>;
};

export default DashboardContent;
