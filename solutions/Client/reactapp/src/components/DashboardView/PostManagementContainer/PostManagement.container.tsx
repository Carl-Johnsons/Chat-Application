import { AppPost } from "@/components/PostView";
import { useGetInfiniteReportPosts } from "@/hooks/queries/post";
import React, { useCallback, useEffect, useRef } from "react";
import style from "./PostManagement.container.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const PostManagementContainer = () => {
  const {
    data: infiniteRPL,
    fetchNextPage: fetchNextRPL,
    isLoading: isLoadingNextRPL,
  } = useGetInfiniteReportPosts({ limit: 10 });

  const rpList = infiniteRPL?.pages?.flatMap(
    (query) => query.data.paginatedData
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoadingNextRPL) {
      fetchNextRPL();
    }
  }, [fetchNextRPL, isLoadingNextRPL]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div
      ref={containerRef}
      className={cx(
        "h-100",
        "overflow-y-scroll",
        "d-flex",
        "flex-column",
        "align-items-center",
        "mt-4"
      )}
    >
      {(rpList ?? []).map((rp) => {
        const { postId, count } = rp;
        return (
          <AppPost
            key={postId}
            type="report"
            postId={postId}
            reportCount={count}
            disableComment
          />
        );
      })}
    </div>
  );
};

export { PostManagementContainer };
