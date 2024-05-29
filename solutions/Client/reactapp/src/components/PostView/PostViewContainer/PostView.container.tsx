import classNames from "classnames/bind";
import style from "./PostView.container.module.scss";

import { Post } from "models/Post";
import { AppPost } from "..";

const cx = classNames.bind(style);

interface Props {
  className?: string;
}
const PostViewContainer = ({ className }: Props) => {
  const posts: Post[] = [
    {
      id: "1",
      content:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      createdAt: new Date(),
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
    <div className={cx(className)}>
      <div
        className={cx(
          "post-body-container",
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
