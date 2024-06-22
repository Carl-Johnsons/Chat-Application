import React, { Suspense, useCallback, useEffect, useState } from "react";
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
import { Interaction } from "@/models";
import {
  useGetInteractionByPostId,
  useInteractPost,
  useUndoInteractPost,
} from "@/hooks/queries/post";

const cx = classNames.bind(style);

interface Props {
  postId: string;
}

interface ButtonContent {
  content: string;
  iconSrc: IconDefinition;
  handleClick?: () => void;
  emoji?: Interaction | null;
}
const Loading = () => {
  return <div>Loading...</div>;
};

const PostButtonContainer = ({ postId }: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const { mutate: interactPostMutate } = useInteractPost();
  const { mutate: undoInteractPostMutate } = useUndoInteractPost();

  const { data: interactionData } = useGetInteractionByPostId(
    { postId, isCurrentUser: true },
    {
      enabled: !!postId,
    }
  );
  const { handleShowModal } = useModal();

  const handleEmojiBtnClick = useCallback((emojiId: string) => {
    if (!isInteracted) {
      interactPostMutate({ postId, interactionId: emojiId });
    }
  }, []);

  const handleLikeBtnClick = useCallback(() => {
    if (!isInteracted) {
      undoInteractPostMutate({ postId });
    }
  }, []);

  const handleReportBtnClick = useCallback(() => {
    handleShowModal({ modalType: "PostReport" });
  }, [handleShowModal]);

  const buttonsContent: ButtonContent[] = [
    {
      content: "Like",
      iconSrc: faThumbsUp,
      emoji: interactionData?.[0] ? interactionData[0] : null,
      handleClick: handleLikeBtnClick,
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

  useEffect(() => {
    setIsInteracted(interactionData?.[0] ? true : false);
  }, [interactionData]);

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
          <InteractionContainer onClick={handleEmojiBtnClick} />
        </div>
        {buttonsContent.map((btnContent, index) => {
          const { content, iconSrc, handleClick, emoji } = btnContent;
          return (
            <AppButton
              variant={index == 2 ? "app-btn-danger" : "app-btn-secondary"}
              key={index}
              className={cx(
                `btn-${content.toLowerCase()}`,
                "flex-grow-1",
                "d-flex",
                "justify-content-center",
                "align-items-center",
                "ms-2",
                "me-2",
                isInteracted && "interacted"
              )}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onClick={handleClick}
            >
              {emoji ? (
                <img src={emoji.gif} alt="emoji" width={20} />
              ) : (
                <>
                  <FontAwesomeIcon className={cx("me-2")} icon={iconSrc} />
                  {content}
                </>
              )}
            </AppButton>
          );
        })}
      </div>
    </Suspense>
  );
};

export { PostButtonContainer };
