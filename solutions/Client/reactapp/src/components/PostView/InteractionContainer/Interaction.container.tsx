import React from "react";

import style from "./Interaction.container.module.scss";
import classNames from "classnames/bind";
import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";

const cx = classNames.bind(style);

const InteractionContainer = () => {
  const emojis = [
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Slightly%20Smiling%20Face.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Hearts.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Tears%20of%20Joy.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Open%20Mouth.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png",
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Angry%20Face.png",
  ];
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
      {emojis.map((emojisrc, index) => {
        return (
          <AppButton
            variant="app-btn-tertiary-transparent"
            className={cx("emoji-btn")}
            key={index}
          >
            <Avatar
              variant="avatar-img-40px"
              src={emojisrc}
              alt="Grinning Squinting Face"
            />
          </AppButton>
        );
      })}
    </div>
  );
};

export { InteractionContainer };
