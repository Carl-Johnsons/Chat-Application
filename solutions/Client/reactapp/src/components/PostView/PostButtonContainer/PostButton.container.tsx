import React, { Suspense, useCallback, useEffect, useState } from "react";
import style from "./PostButton.container.module.scss";
import classNames from "classnames/bind";
import AppButton from "@/components/shared/AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faFlag,
  faThumbsUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { InteractionContainer } from "..";
import { useModal } from "hooks/useModal";
import { Interaction } from "@/models";
import {
  useDeletePost,
  useGetInteractionByPostId,
  useInteractPost,
  useUndoInteractPost,
} from "@/hooks/queries/post";
import { useGlobalState } from "@/hooks";
import { BUTTON } from "data/constants";

const cx = classNames.bind(style);

interface Props {
  postId: string;
  enableButton?: string[];
}

interface ButtonContent {
  condition: boolean;
  content: string;
  iconSrc: IconDefinition;
  handleClick?: () => void;
  emoji?: Interaction | null;
}
const Loading = () => {
  return <div>Loading...</div>;
};

const PostButtonContainer = ({
  postId,
  enableButton = [BUTTON.LIKE, BUTTON.REPORT],
}: Props) => {
  const [isHover, setIsHover] = useState(false);
  const [isInteracted, setIsInteracted] = useState(false);
  const { mutate: interactPostMutate } = useInteractPost();
  const { mutate: undoInteractPostMutate } = useUndoInteractPost();
  const { mutate: deletePostMutate } = useDeletePost();
  const [, setModalEntityId] = useGlobalState("modalEntityId");

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
    setModalEntityId(postId);
    handleShowModal({ modalType: "PostReport" });
  }, [handleShowModal]);

  const handleDeleteBtnClick = useCallback(() => {
    deletePostMutate({
      id: postId,
    });
  }, []);

  const buttonsContent: ButtonContent[] = [
    {
      condition: enableButton.indexOf(BUTTON.LIKE) !== -1,
      content: BUTTON.LIKE,
      iconSrc: faThumbsUp,
      emoji: interactionData?.[0] ? interactionData[0] : null,
      handleClick: handleLikeBtnClick,
    },
    {
      condition: enableButton.indexOf(BUTTON.REPORT) !== -1,
      content: BUTTON.REPORT,
      iconSrc: faFlag,
      handleClick: handleReportBtnClick,
    },
    {
      condition: enableButton.indexOf(BUTTON.DELETE) !== -1,
      content: BUTTON.DELETE,
      iconSrc: faTrashCan,
      handleClick: handleDeleteBtnClick,
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
        {enableButton.indexOf(BUTTON.LIKE) !== -1 && (
          <div
            className={cx(
              "interaction-container",
              "position-absolute",
              isHover && "hover"
            )}
          >
            <InteractionContainer onClick={handleEmojiBtnClick} />
          </div>
        )}
        {buttonsContent.map((btnContent, index) => {
          const { condition, content, iconSrc, handleClick, emoji } =
            btnContent;
          if (!condition) {
            return;
          }

          return (
            <AppButton
              variant={
                content === BUTTON.REPORT || content === BUTTON.DELETE
                  ? "app-btn-danger"
                  : "app-btn-secondary"
              }
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
