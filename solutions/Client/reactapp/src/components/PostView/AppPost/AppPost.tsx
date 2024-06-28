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
  UserReportContainer,
} from "../";
import { AppDivider, AppTag } from "@/components/shared";
import { useGetUser } from "@/hooks/queries/user";
import { useGetPostByd } from "hooks/queries/post/useGetPostById.query";
import { BUTTON } from "data/constants";

const cx = classNames.bind(style);

type BaseVariant = {
  postId: string;
  disableComment?: boolean;
};

type NormalVariant = BaseVariant & {
  type: "normal";
};

type ReportVariant = BaseVariant & {
  type: "report";
  reportCount: number;
};

type Variant = NormalVariant | ReportVariant;

const AppPost = ({
  postId,
  disableComment = false,
  type = "normal",
}: Variant) => {
  const isReport = type === "report";
  const isNormal = type === "normal";

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
      <div className={cx("mt-2", "mb-2", "d-flex", "gap-2", "flex-wrap")}>
        {postData?.tags &&
          postData?.tags.map((tag, index) => {
            return <AppTag key={index} value={tag} disableCancel />;
          })}
      </div>

      {isNormal && postData?.interactions && (
        <InteractionCounterContainer
          className={cx("ps-2", "pe-2")}
          interactTotal={postData.interactTotal}
          interactions={postData.interactions}
        />
      )}

      <AppDivider />
      {isReport ? (
        <PostButtonContainer postId={postId} enableButton={[BUTTON.DELETE]} />
      ) : (
        <PostButtonContainer postId={postId} />
      )}

      <AppDivider />
      {disableComment && <CommentContainer postId={postId} />}
      {isReport && <UserReportContainer postId={postId} />}
    </div>
  );
};

export { AppPost };
