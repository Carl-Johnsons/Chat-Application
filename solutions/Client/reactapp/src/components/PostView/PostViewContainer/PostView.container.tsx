import classNames from "classnames/bind";
import style from "./PostView.container.module.scss";

import { AppPost } from "..";
import { useGetCurrentUser } from "hooks/queries/user/useGetCurrentUser.query";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import { useModal } from "hooks/useModal";
import { useCallback, useEffect, useRef } from "react";
import { useGetInfinitePost } from "hooks/queries/post/useGetInfinitePosts.query";

const cx = classNames.bind(style);

interface Props {
  className?: string;
  disableInput?: boolean;
}
const PostViewContainer = ({ className, disableInput = false }: Props) => {
  const { data: userData } = useGetCurrentUser();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { handleShowModal } = useModal();
  const handleFocus = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  const {
    data: infinitePL,
    fetchNextPage: fetchNextPL,
    isLoading: isLoadingNextPL,
  } = useGetInfinitePost({
    enabled: true,
  });

  const postIds = [...(infinitePL?.pages ?? [])].flatMap(
    (page) => page.data.paginatedData
  );

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoadingNextPL) {
      fetchNextPL();
    }
  }, [fetchNextPL, isLoadingNextPL]);

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
      className={cx(
        className,
        "post-body-container",
        "d-flex",
        "flex-column",
        "align-items-center"
      )}
    >
      {!disableInput && (
        <div
          className={cx(
            "shadow",
            "post-input",
            "w-100",
            "d-flex",
            "justify-content-center"
          )}
        >
          <div className={cx("input-group", "w-75", "mt-3", "mb-3")}>
            <div className={cx("me-3")}>
              <Avatar
                avatarClassName={cx("rounded-circle", "shadow")}
                src={userData?.avatarUrl ?? images.defaultAvatarImg.src}
                alt="user avatar"
              />
            </div>
            <input
              type="text"
              ref={inputRef}
              className={cx("form-control", "rounded-3")}
              placeholder="Write your thought"
              onClick={() => handleShowModal({ modalType: "PostInput" })}
              onFocus={handleFocus}
            />
          </div>
        </div>
      )}

      <div
        className={cx(
          "w-100",
          "d-flex",
          "flex-column",
          "align-items-center",
          "overflow-y-scroll",
          "pt-4"
        )}
        ref={containerRef}
      >
        {postIds.map((postId, index) => {
          return <AppPost key={index} postId={postId}></AppPost>;
        })}
      </div>
    </div>
  );
};

export { PostViewContainer };
