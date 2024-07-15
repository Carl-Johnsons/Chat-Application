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
import { AppDivider, AppImageGallery, AppTag } from "@/components/shared";
import { useGetCurrentUser, useGetUser } from "@/hooks/queries/user";
import { BUTTON, FILE_TYPE } from "data/constants";
import { CloudinaryImage } from "@/models";
import { useGetPostByd } from "@/hooks/queries/post";
import { useCallback, useState } from "react";
import AppButton from "@/components/shared/AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "hooks/useModal";

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
  const [showImageGallery, setShowImageGallery] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const isReport = type === "report";
  const isNormal = type === "normal";

  const { data: currentUserData } = useGetCurrentUser();
  const { data: postData } = useGetPostByd({ postId }, { enabled: !!postId });
  const { handleShowModal } = useModal();
  const { data: authorData } = useGetUser(postData?.userId ?? "", {
    enabled: !!postData?.userId,
  });

  const tz = moment.tz.guess();
  const formattedTime = moment(new Date(postData?.createdAt ?? ""))
    .tz(tz)
    .fromNow();

  const authorAvatar = authorData?.avatarUrl ?? images.defaultAvatarImg.src;
  const authorName = authorData?.name ?? "Loading...";
  const files: CloudinaryImage[] = JSON.parse(
    postData?.attachedFilesURL ?? "[]"
  );

  const imagesGallery: {
    original: string;
    thumbnail: string;
  }[] = [];

  for (const file of files) {
    imagesGallery.push({
      original: file.url,
      thumbnail: file.url,
    });
  }

  const handleClickImage = useCallback((index: number) => {
    setShowImageGallery(true);
    setCurrentImageIndex(index);
  }, []);

  const handleClickUpdatePost = useCallback(() => {
    handleShowModal({ entityId: postId, modalType: "PostInput" });
  }, []);

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
        <div className={cx("time", "me-2")}>{formattedTime}</div>
        {authorData?.id === currentUserData?.id && (
          <div>
            <AppButton
              variant="app-btn-primary-transparent"
              className={cx("update-post-btn", "rounded-circle")}
              onClick={handleClickUpdatePost}
            >
              <FontAwesomeIcon icon={faPen} />
            </AppButton>
          </div>
        )}
      </div>
      <div className={cx("ps-2", "pe-2", "text-break")}>
        {htmlParser(postData?.content ?? "")}
      </div>
      <div
        className={cx(
          "file-container",
          "d-flex",
          "gap-2",
          "justify-content-center",
          "flex-wrap"
        )}
      >
        {files.map((f, index) => {
          const { id, url, name } = f;
          if (f.fileType === FILE_TYPE.IMAGE) {
            return (
              <Avatar
                variant="avatar-img-240px"
                avatarClassName={cx(
                  "post-img",
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

      <div className={cx("mt-2", "mb-2", "d-flex", "gap-2", "flex-wrap")}>
        {postData?.tags &&
          postData?.tags.map((tag, index) => {
            const { value } = tag;
            return <AppTag key={index} value={value} disableCancel />;
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
      <AppImageGallery
        show={showImageGallery}
        setShow={setShowImageGallery}
        images={imagesGallery}
        currentImageIndex={currentImageIndex}
      />
    </div>
  );
};

export { AppPost };
