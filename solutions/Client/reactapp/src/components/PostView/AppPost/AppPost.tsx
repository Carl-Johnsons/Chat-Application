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
import { useGetUser } from "@/hooks/queries/user";
import { useGetPostByd } from "hooks/queries/post/useGetPostById.query";

const cx = classNames.bind(style);

interface Props {
  postId: string;
}

const AppPost = ({ postId }: Props) => {
  const { data: postData } = useGetPostByd({ postId }, { enabled: !!postId });

  const { data: authorData } = useGetUser(postData?.userId ?? "", {
    enabled: !!postData?.userId,
  });

  const tz = moment.tz.guess();
  const formattedTime = moment(new Date(postData?.createdAt ?? ""))
    .tz(tz)
    .fromNow();

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
        {htmlParser(postData?.content ?? "")}
      </div>
      {postData?.interactions && (
        <InteractionCounterContainer
          className={cx("ps-2", "pe-2")}
          interactTotal={postData.interactTotal}
          interactions={postData.interactions}
        />
      )}

      <AppDivider />
      <PostButtonContainer postId={postId} />
      <AppDivider />
      <CommentContainer postId={postId} />
    </div>
  );
};

export { AppPost };
