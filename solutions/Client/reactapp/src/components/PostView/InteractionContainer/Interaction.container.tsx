import React from "react";

import style from "./Interaction.container.module.scss";
import classNames from "classnames/bind";
import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import { useGetAllInteraction } from "@/hooks/queries/post";

const cx = classNames.bind(style);

interface Props {
  onClick?: (emojiId: string) => void;
}

const InteractionContainer = ({ onClick = () => {} }: Props) => {
  const { data: emojis } = useGetAllInteraction();
  return (
    <div
      className={cx(
        "interaction-container",
        "shadow-lg",
        "p-2",
        "rounded-3",
        "d-flex",
        "fs-5"
      )}
    >
      {(emojis ?? []).map((emoji) => {
        const { id, gif } = emoji;
        return (
          <AppButton
            key={id}
            variant="app-btn-tertiary-transparent"
            className={cx("emoji-btn")}
            onClick={() => onClick(id)}
          >
            <Avatar
              variant="avatar-img-40px"
              src={gif}
              alt="Grinning Squinting Face"
            />
          </AppButton>
        );
      })}
    </div>
  );
};

export { InteractionContainer };
