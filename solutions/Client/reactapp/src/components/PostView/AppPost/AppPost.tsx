import moment from "moment";
import htmlParser from "html-react-parser";
import style from "./AppPost.module.scss";
import classNames from "classnames/bind";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import {
  CommentContainer,
  InteractionCounterContainer,
  PostButtonContainer,
} from "../";
import { AppDivider } from "@/components/shared";
import { Post } from "@/models";
import { useGetUser } from "@/hooks/queries/user";

const cx = classNames.bind(style);

interface Props {
  post: Post;
}

const AppPost = ({ post }: Props) => {
  const { id, interactions, content, createdAt, interactTotal, userId } = post;
  const { data: authorData } = useGetUser(userId, {
    enabled: !!userId,
  });

  const tz = moment.tz.guess();
  const formattedTime = moment(new Date(createdAt)).tz(tz).fromNow();

  const authorAvatar = authorData?.avatarUrl ?? images.defaultAvatarImg.src;
  const authorName = authorData?.name ?? "Loading...";

  return (
    <div
      className={cx(
        "post",
        "rounded-3",
        "shadow",
        "w-75",
        "flex-wrap",
        "mb-3",
        "p-3"
      )}
    >
      <div className={cx("author", "d-flex", "align-items-center")}>
        <Avatar
          className={cx("me-2")}
          avatarClassName={cx("rounded-circle")}
          variant="avatar-img-45px"
          src={authorAvatar}
          alt="author avatar"
        ></Avatar>
        <div className={cx("author-name", "fw-medium", "me-auto")}>
          {authorName}
        </div>
        <div className={cx("time")}>{formattedTime}</div>
      </div>
      <div className={cx("ps-2", "pe-2", "text-break")}>
        {htmlParser(content)}
      </div>
      <InteractionCounterContainer
        className={cx("ps-2", "pe-2")}
        interactTotal={interactTotal}
        interactions={interactions}
      />
      <AppDivider />
      <PostButtonContainer />
      <AppDivider />
      <CommentContainer postId={id} />
    </div>
  );
};

export { AppPost };
