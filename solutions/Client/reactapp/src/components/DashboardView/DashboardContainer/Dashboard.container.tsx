import { useGlobalState } from "@/hooks";
import { ReactNode } from "react";
import { UserManagementContainer } from "../UserManagementContainer";
import { PostManagementContainer } from "../PostManagementContainer";

const DashboardContainer = () => {
  const [activeDashboardType] = useGlobalState("activeDashboardType");

  const views: ReactNode[] = [
    <UserManagementContainer key="user-management" />,
    <PostManagementContainer key="post-management" />,
  ];

  return views[activeDashboardType];
};

export { DashboardContainer };
