import React from "react";

import style from "./Interaction.container.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const InteractionContainer = () => {
  return (
    <div
      className={cx("interaction-container", "shadow-lg", "p-2", "rounded-3")}
    >
      InteractionContainer
    </div>
  );
};

export { InteractionContainer };
