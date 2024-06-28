import React from "react";
import style from "./UserReport.container.module.scss";
import classNames from "classnames/bind";
import { useGetReportPostById } from "@/hooks/queries/post";
import { AppReportReason } from "@/components/shared";

const cx = classNames.bind(style);

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
    <div className={cx("")}>
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
