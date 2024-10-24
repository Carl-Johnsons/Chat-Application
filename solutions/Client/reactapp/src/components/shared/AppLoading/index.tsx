import style from "./AppLoading.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export const AppLoading = () => {
  return (
    <div className={cx("container")}>
      <div className={cx("loader")}></div>
    </div>
  );
};
