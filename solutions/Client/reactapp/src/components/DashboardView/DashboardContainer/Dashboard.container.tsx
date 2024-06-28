import { useGlobalState } from "@/hooks";
import React, { ReactNode } from "react";
import { UserManagementContainer } from "../UserManagementContainer";
import { PostManagementContainer } from "../PostManagementContainer";

const DashboardContainer = () => {
  const [activeDashboardType] = useGlobalState("activeDashboardType");

  const views: ReactNode[] = [
    <UserManagementContainer />,
    <PostManagementContainer />,
  ];

  return views[activeDashboardType];
};

export { DashboardContainer };
