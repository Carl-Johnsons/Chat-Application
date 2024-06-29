import moment from "moment-timezone";
import { HTMLProps } from "react";

import style from "./Message.module.scss";
import classNames from "classnames/bind";
import { useGetUser } from "@/hooks/queries/user";
import { CloudinaryImage, Message as MessageModel } from "@/models";
import Avatar from "@/components/shared/Avatar";
import { FILE_TYPE } from "data/constants";

const cx = classNames.bind(style);
interface Props {
  message: MessageModel;
  showUsername?: boolean;
  sender?: boolean;
}

const Message: React.FC<Props & HTMLProps<HTMLDivElement>> = ({
  message,
  showUsername,
  sender,
  ...htmlProp
}) => {
  const mergeProp = Object.assign(htmlProp);
  const { senderId, content, createdAt, attachedFilesURL } = message;

  const fileList: CloudinaryImage[] = JSON.parse(attachedFilesURL);
  console.log({ fileList });

  const { data: userData } = useGetUser(senderId);
  const tz = moment.tz.guess();
  const formattedTime = moment(new Date(createdAt)).tz(tz).format("HH:mm");
  return (
    <div
      className={cx("message", "mb-1", "text-break", sender && "sender")}
      {...mergeProp}
    >
      {showUsername && (
        <div className={cx("user-name", "mb-1")}>
          {userData?.name ?? "Anonymous"}
        </div>
      )}
      <div
        className={cx("d-flex", "gap-1", "flex-wrap", "justify-content-center")}
      >
        {fileList.map((file) => {
          const { id, url, name, fileType } = file;

          if (fileType === FILE_TYPE.IMAGE) {
            return (
              <Avatar
                variant="avatar-img-160px"
                avatarClassName={cx("img-msg", "rounded-2")}
                key={id}
                src={url}
                alt={name}
              />
            );
          }
        })}
      </div>
      <div className={cx("content", "mb-2")}>{content}</div>
      <div className={cx("time")}>{formattedTime}</div>
    </div>
  );
};

export default Message;
