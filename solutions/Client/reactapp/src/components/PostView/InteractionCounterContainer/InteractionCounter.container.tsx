import { Interaction } from "models";
import React from "react";
import style from "./InteractionCounter.container.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  className?: string;
  interactions: Interaction[];
}

const InteractionCounterContainer = ({ interactions, className }: Props) => {
  const emojiMap = new Map<string, number>();
  interactions.forEach((interaction) => {
    emojiMap.set(interaction.value, (emojiMap.get(interaction.id) ?? 0) + 1);
  });
  const emojiList = [...emojiMap];
  return (
    <div className={cx(className)}>
      <div className={cx("d-flex")}>
        {emojiList.map((emoji, index) => {
          const [value] = emoji;
          return (
            <div key={index} className={cx("emoji", index === 0 && "first")}>
              {value}
            </div>
          );
        })}
        <div className={cx("interaction-count", "fw-lighter", "fs-6")}>
          {interactions.length == 0
            ? "Hãy là người tương tác đầu tiên"
            : interactions.length}
        </div>
      </div>
    </div>
  );
};

export { InteractionCounterContainer };
