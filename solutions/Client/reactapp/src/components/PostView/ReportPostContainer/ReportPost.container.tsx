import React from "react";
import style from "./ReportPost.container.module.scss";
import classNames from "classnames/bind";
import { Form, InputGroup } from "react-bootstrap";
import AppButton from "@/components/shared/AppButton";

const cx = classNames.bind(style);

const ReportPostContainer = () => {
  return (
    <div className={cx("d-flex", "flex-column", "align-items-center")}>
      <InputGroup className="mb-3">
        <Form.Control placeholder="Lí do" className={cx("shadow-lg")} />
      </InputGroup>
      <AppButton
        className={cx("btn-submit", "w-50", "shadow-lg")}
        variant="app-btn-danger"
      >
        Gửi và chặn người dùng
      </AppButton>
    </div>
  );
};

export { ReportPostContainer };
