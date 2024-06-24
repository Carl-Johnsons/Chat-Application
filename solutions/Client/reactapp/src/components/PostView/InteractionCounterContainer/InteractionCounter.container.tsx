import React from "react";
import style from "./InteractionCounter.container.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  className?: string;
  interactTotal?: number;
  interactions: string[];
}

const InteractionCounterContainer = ({
  interactTotal = 0,
  interactions,
  className,
}: Props) => {
  return (
    <div className={cx(className)}>
      <div className={cx("d-flex")}>
        {interactions.map((interaction, index) => {
          return (
            <div key={index} className={cx("emoji", index === 0 && "first")}>
              {interaction}
            </div>
          );
        })}
        <div className={cx("interaction-count", "fw-lighter", "fs-6")}>
          {interactTotal == 0
            ? "Hãy là người tương tác đầu tiên"
            : interactTotal}
        </div>
      </div>
    </div>
  );
};

export { InteractionCounterContainer };
