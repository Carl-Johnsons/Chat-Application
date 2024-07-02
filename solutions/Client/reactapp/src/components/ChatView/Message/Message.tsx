import moment from "moment-timezone";
import { HTMLProps, useCallback, useState } from "react";

import style from "./Message.module.scss";
import classNames from "classnames/bind";
import { useGetUser } from "@/hooks/queries/user";
import { CloudinaryImage, Message as MessageModel } from "@/models";
import Avatar from "@/components/shared/Avatar";
import { FILE_TYPE } from "data/constants";
import { urlify } from "@/utils";
import htmlParser from "html-react-parser";
import { AppImageGallery } from "@/components/shared";

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
  const [showImageGallery, setShowImageGallery] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const { data: userData } = useGetUser(senderId);
  const tz = moment.tz.guess();
  const formattedTime = moment(new Date(createdAt)).tz(tz).format("HH:mm");
  const formattedContent = htmlParser(urlify(content));

  const images: {
    original: string;
    thumbnail: string;
  }[] = [];

  for (const file of fileList) {
    if (file.fileType === FILE_TYPE.IMAGE) {
      images.push({
        original: file.url,
        thumbnail: file.url,
      });
    }
  }
  const handleClickImage = useCallback((index: number) => {
    setShowImageGallery(true);
    setCurrentImageIndex(index);
  }, []);

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
        {fileList.map((file, index) => {
          const { id, url, name, fileType } = file;

          if (fileType === FILE_TYPE.IMAGE) {
            return (
              <Avatar
                variant="avatar-img-160px"
                avatarClassName={cx(
                  "img-msg",
                  "rounded-2",
                  "object-fit-cover"
                )}
                key={id}
                src={url}
                alt={name}
                onClick={() => {
                  handleClickImage(index);
                }}
              />
            );
          }
        })}
      </div>
      <AppImageGallery
        show={showImageGallery}
        setShow={setShowImageGallery}
        images={images}
        currentImageIndex={currentImageIndex}
      />
      <div className={cx("content", "mb-2")}>{formattedContent}</div>
      <div className={cx("time")}>{formattedTime}</div>
    </div>
  );
};

export default Message;
