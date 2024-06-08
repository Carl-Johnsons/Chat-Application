import classNames from "classnames/bind";
import style from "./PostView.container.module.scss";

import { Post } from "models/Post";
import { AppPost } from "..";
import { useGetCurrentUser } from "hooks/queries/user/useGetCurrentUser.query";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import { useModal } from "hooks/useModal";
import { useCallback, useRef } from "react";

const cx = classNames.bind(style);

interface Props {
  className?: string;
  disableInput?: boolean;
}
const PostViewContainer = ({ className, disableInput = false }: Props) => {
  const { data: userData } = useGetCurrentUser();

  const inputRef = useRef<HTMLInputElement>(null);

  const { handleShowModal } = useModal();
  const handleFocus = useCallback(() => {
    inputRef.current?.blur();
  }, []);

  const posts: Post[] = [
    {
      id: "1",
      content:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      createdAt: new Date("2023-2-1"),
      comments: [],
      interactions: [],
    },
    {
      id: "1",
      content: "bbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      createdAt: new Date(),
      interactions: [
        {
          id: "1",
          code: "SMILE",
          value: "🙂",
        },
        {
          id: "1",
          code: "SMILE",
          value: "🙂",
        },
        {
          id: "1",
          code: "SMILE",
          value: "🙂",
        },
        {
          id: "2",
          code: "CRY",
          value: "😭",
        },
        {
          id: "2",
          code: "CRY",
          value: "😭",
        },
      ],
      comments: [
        {
          id: "1",
          content: "????",
          createdAt: new Date(),
        },
        {
          id: "2",
          content:
            "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          createdAt: new Date(),
        },
        {
          id: "3",
          content: "=))",
          createdAt: new Date(),
        },
        {
          id: "4",
          content: ":v",
          createdAt: new Date(),
        },
        {
          id: "5",
          content: ":v",
          createdAt: new Date(),
        },
        {
          id: "6",
          content: ":v",
          createdAt: new Date(),
        },
      ],
    },
  ];

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
              className={cx("form-control", "rounded-3", "shadow")}
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
          "overflow-y-scroll"
        )}
      >
        {posts.map((post) => {
          const { id } = post;
          return <AppPost key={id} post={post}></AppPost>;
        })}
      </div>
    </div>
  );
};

export { PostViewContainer };
