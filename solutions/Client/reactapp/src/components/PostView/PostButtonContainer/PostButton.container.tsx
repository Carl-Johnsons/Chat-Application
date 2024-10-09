import { Suspense, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faFlag,
  faThumbsUp,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import {
  useDeletePost,
  useGetInteractionByPostId,
  useInteractPost,
  useUndoInteractPost,
} from "@/hooks/queries/post";
import { BUTTON } from "data/constants";
import { Interaction } from "@/models";
import { InteractionContainer } from "..";
import { useGlobalState } from "@/hooks";
import { useModal } from "hooks/useModal";
import { useUpdatePostInteraction } from "hooks/queries/post/useUpdatePostInteraction.mutation";
import AppButton from "@/components/shared/AppButton";
import classNames from "classnames/bind";
import style from "./PostButton.container.module.scss";

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
  const { mutateAsync: interactPostMutateAsync } = useInteractPost();
  const { mutateAsync: undoInteractPostMutateAsync } = useUndoInteractPost();
  const { mutate: deletePostMutate } = useDeletePost();
  const [, setModalEntityId] = useGlobalState("modalEntityId");
  const { mutateAsync: updatePostInteractionMutateAsync } =
    useUpdatePostInteraction();

  const { data: interactionData } = useGetInteractionByPostId(
    { postId, isCurrentUser: true },
    {
      enabled: !!postId,
    }
  );
  const { handleShowModal } = useModal();

  const handleEmojiBtnClick = useCallback(
    async (emojiId: string) => {
      if (isInteracted) {
        await updatePostInteractionMutateAsync({
          postId,
          interactionId: emojiId,
        });
      } else {
        await interactPostMutateAsync({ postId, interactionId: emojiId });
      }
    },
    [
      interactPostMutateAsync,
      isInteracted,
      postId,
      updatePostInteractionMutateAsync,
    ]
  );

  const handleLikeBtnClick = useCallback(() => {
    if (!isInteracted) {
      undoInteractPostMutateAsync({ postId });
    }
  }, [isInteracted, postId, undoInteractPostMutateAsync]);

  const handleReportBtnClick = useCallback(() => {
    setModalEntityId(postId);
    handleShowModal({ modalType: "PostReport" });
  }, [handleShowModal, postId, setModalEntityId]);

  const handleDeleteBtnClick = useCallback(() => {
    deletePostMutate({
      id: postId,
    });
  }, [deletePostMutate, postId]);

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
