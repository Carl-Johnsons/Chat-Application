import React, { Suspense, useCallback, useState } from "react";
import style from "./PostButton.container.module.scss";
import classNames from "classnames/bind";
import AppButton from "@/components/shared/AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faComment,
  faFlag,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { InteractionContainer } from "..";
import { useModal } from "hooks/useModal";

const cx = classNames.bind(style);

interface ButtonContent {
  content: string;
  iconSrc: IconDefinition;
  handleClick?: () => void;
}
const Loading = () => {
  return <div>Loading...</div>;
};

const PostButtonContainer = () => {
  const [isHover, setIsHover] = useState(false);

  const { handleShowModal } = useModal();
  const handleLikeBtnClick = useCallback(() => {}, []);
  const handleCommentBtnClick = useCallback(() => {}, []);
  const handleReportBtnClick = useCallback(() => {
    handleShowModal({ modalType: "PostReport" });
  }, [handleShowModal]);

  const buttonsContent: ButtonContent[] = [
    {
      content: "Like",
      iconSrc: faThumbsUp,
    },
    {
      content: "Comment",
      iconSrc: faComment,
    },
    {
      content: "Report",
      iconSrc: faFlag,
      handleClick: handleReportBtnClick,
    },
  ];

  const handleMouseEnter = (index: number) => {
    if (index === 0) setIsHover(true);
  };

  const handleMouseLeave = (index: number) => {
    if (index === 0) setIsHover(false);
  };
  console.log({ isHover });

  return (
    <Suspense fallback={<Loading />}>
      <div className={cx("w-100", "d-flex", "position-relative")}>
        <div
          className={cx(
            "interaction-container",
            "position-absolute",
            isHover && "hover"
          )}
        >
          <InteractionContainer />
        </div>
        {buttonsContent.map((btnContent, index) => {
          const { content, iconSrc, handleClick } = btnContent;
          return (
            <AppButton
              variant={index == 2 ? "app-btn-danger" : "app-btn-tertiary"}
              key={index}
              className={cx(
                `btn-${content.toLowerCase()}`,
                "flex-grow-1",
                "d-flex",
                "justify-content-center",
                "align-items-center",
                "ms-2",
                "me-2"
              )}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={handleClick}
            >
              <FontAwesomeIcon className={cx("me-2")} icon={iconSrc} />
              {content}
            </AppButton>
          );
        })}
      </div>
    </Suspense>
  );
};

export { PostButtonContainer };
