import React, { useCallback, useState } from "react";
import style from "./ReportPost.container.module.scss";
import classNames from "classnames/bind";
import AppButton from "@/components/shared/AppButton";
import { AppInput } from "@/components/shared/AppInput";
import { useReportPost } from "hooks/queries/post/useReportForm.mutation";
import { useGlobalState, useModal } from "@/hooks";

const cx = classNames.bind(style);

const ReportPostContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const [modalEntityId] = useGlobalState("modalEntityId");
  const { mutate: reportPostMutate } = useReportPost();
  const { handleHideModal } = useModal();

  const handleClick = useCallback(() => {
    if (modalEntityId) {
      reportPostMutate({
        postId: modalEntityId,
        reason: inputValue,
      });
    }
    handleHideModal();
  }, [handleHideModal, inputValue, modalEntityId, reportPostMutate]);

  return (
    <div className={cx("d-flex", "flex-column", "align-items-center")}>
      <AppInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        disableSuggestion
        placeholder="Lí do"
        className="form-control w-100"
        wrapperClassName="w-100 mb-3 mt-3"
      />
      <AppButton
        className={cx("btn-submit", "w-50", "shadow-lg")}
        variant="app-btn-danger"
        onClick={handleClick}
      >
        Báo cáo bài đăng
      </AppButton>
    </div>
  );
};

export { ReportPostContainer };
