import React from "react";
import style from "./PostButton.container.module.scss";
import classNames from "classnames/bind";
import AppButton from "@/components/shared/AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { InteractionContainer } from "..";

const cx = classNames.bind(style);

interface ButtonContent {
  content: string;
  iconSrc: IconDefinition;
}

const PostButtonContainer = () => {
  const buttonsContent: ButtonContent[] = [
    {
      content: "Like",
      iconSrc: faThumbsUp,
    },
    {
      content: "Like1",
      iconSrc: faThumbsUp,
    },
    {
      content: "Like2",
      iconSrc: faThumbsUp,
    },
  ];

  return (
    <div className={cx("w-100", "d-flex", "position-relative")}>
      <div className={cx("interaction-container", "position-absolute")}>
        <InteractionContainer />
      </div>
      {buttonsContent.map((btnContent, index) => {
        const { content, iconSrc } = btnContent;
        return (
          <AppButton
            variant="app-btn-tertiary"
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
          >
            <FontAwesomeIcon className={cx("me-2")} icon={iconSrc} />
            {content}
          </AppButton>
        );
      })}
    </div>
  );
};

export { PostButtonContainer };
