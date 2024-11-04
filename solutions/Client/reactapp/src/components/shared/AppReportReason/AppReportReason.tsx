import { useGetUser } from "@/hooks/queries/user";
import style from "./AppReportReason.module.scss";
import classNames from "classnames/bind";
import Avatar from "../Avatar";
import images from "@/assets";
import { formatRelativeTime } from "@/utils";

const cx = classNames.bind(style);

interface Props {
  userId: string;
  reason: string;
  createdAt: Date;
}

const AppReportReason = ({ userId, reason, createdAt }: Props) => {
  const { data: userData } = useGetUser(userId, {
    enabled: !!userId,
  });
  const name = userData?.name ?? "Loading...";
  const avatar = userData?.avatarUrl || images.defaultAvatarImg.src;
  const formattedTime = formatRelativeTime(createdAt);

  return (
    <div className={cx("report-reason", "mt-3", "d-flex")}>
      <div className={cx("user-avatar", "d-flex", "align-items-start")}>
        <Avatar
          className={cx("me-2")}
          avatarClassName={cx("rounded-circle")}
          variant="avatar-img-40px"
          src={avatar}
          alt="author avatar"
        ></Avatar>
      </div>
      <div>
        <div
          className={cx(
            "reason",
            "rounded-3",
            "pt-2",
            "pb-2",
            "ps-2",
            "pe-2",
            "shadow"
          )}
        >
          <div className={cx("author-name", "fw-medium")}>{name}</div>
          <div className={cx("mb-2", "text-break")}>{reason}</div>
        </div>
        <div>
          <div>{formattedTime}</div>
        </div>
      </div>
    </div>
  );
};

export { AppReportReason };
