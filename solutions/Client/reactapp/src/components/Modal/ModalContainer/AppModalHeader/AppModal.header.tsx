import React, { memo } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import AppButton from "@/components/shared/AppButton";
import { useGlobalState } from "@/hooks";

import style from "./AppModal.header.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  title?: string;
  handleHideModal: () => void;
  modalBodyDimension: {
    width: number;
    height: number;
  };
}

const AppModalHeader = ({
  title = "",
  handleHideModal,
  modalBodyDimension,
}: Props) => {
  const [activeModal, setActiveModal] = useGlobalState("activeModal");
  console.log("re-render modal header");
  
  return (
    <Modal.Header
      className={cx(
        "modal-header",
        "d-flex",
        "align-items-center",
        activeModal !== 0 && "ps-2"
      )}
      style={{
        width: modalBodyDimension.width,
      }}
    >
      <Modal.Title className={cx("modal-title")}>
        {activeModal !== 0 && (
          <AppButton
            className={cx("rounded-circle", "p-0", "me-1")}
            onClick={() => setActiveModal(0)}
            variant="app-btn-primary-transparent"
          >
            <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
          </AppButton>
        )}
        {title}
      </Modal.Title>
      <Button
        className={cx(
          "btn",
          "bg-transparent",
          "shadow-none",
          "btn-close",
          "close"
        )}
        data-dismiss="modal"
        onClick={handleHideModal}
      ></Button>
    </Modal.Header>
  );
};

const MemoizedAppModalHeader = memo(AppModalHeader);

export { MemoizedAppModalHeader };
