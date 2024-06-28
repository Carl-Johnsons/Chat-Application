import React from "react";
import { useGetReportPostById } from "@/hooks/queries/post";
import { AppReportReason } from "@/components/shared";

interface Props {
  postId: string;
}

const UserReportContainer = ({ postId }: Props) => {
  const { data: reportPostData } = useGetReportPostById(
    { postId },
    {
      enabled: !!postId,
    }
  );
  return (
    <div>
      {(reportPostData ?? []).map((reportPost) => {
        const { id, reason, createdAt, userId } = reportPost;

        return (
          <AppReportReason
            key={id}
            userId={userId}
            createdAt={createdAt}
            reason={reason}
          />
        );
      })}
    </div>
  );
};

export { UserReportContainer };
