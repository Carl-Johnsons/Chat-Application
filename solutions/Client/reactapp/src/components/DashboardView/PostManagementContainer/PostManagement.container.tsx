import { AppPost } from "@/components/PostView";
import { useGetInfiniteReportPosts } from "hooks/queries/post/useGetInfiniteReportPosts.query";
import React, { useState } from "react";

const PostManagementContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: infiniteRPL } = useGetInfiniteReportPosts({ limit: 10 });

  const rpList = infiniteRPL?.pages[currentPage - 1]?.data?.paginatedData ?? [];

  return (
    <div>
      {rpList.map((rp) => {
        const { postId, count } = rp;
        return <AppPost type="report" postId={postId} reportCount={count} />;
      })}
    </div>
  );
};

export { PostManagementContainer };
