import AsideBody from "../AsideBody";
import AsideHeader from "../AsideHeader";

import style from "./AsideContainer.module.scss";
import classnames from "classnames/bind";

const cx = classnames.bind(style);
const AsideContainer = () => {
  return (
    <div className={cx("aside-container")}>
      <div
        className={cx(
          "aside-header",
          "d-flex",
          "justify-content-center",
          "align-items-center",
          "fw-medium"
        )}
      >
        <AsideHeader />
      </div>
      <div className={cx("aside-body")}>
        <AsideBody />
      </div>
    </div>
  );
};

export default AsideContainer;
