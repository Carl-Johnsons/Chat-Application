import React from "react";

import style from "./AppDivider.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  className?: string;
}

const AppDivider = ({ className }: Props) => {
  return <div className={cx("container-divider-2px", className)}></div>;
};

export { AppDivider };
