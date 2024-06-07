import { ReportPostContainer } from "@/components/PostView";
import React from "react";
import style from "./ReportPost.modalContent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const ReportPostModalContent = () => {
  return (
    <div className={cx("report-post-modal", "p-2")}>
      <ReportPostContainer />
    </div>
  );
};

export { ReportPostModalContent };
