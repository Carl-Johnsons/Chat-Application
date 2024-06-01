import React, { LegacyRef, memo } from "react";
import { Modal } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./AppModal.body.module.scss";
import { useGlobalState } from "@/hooks";
import { ModalContent } from "@/models";

const cx = classNames.bind(style);

interface Props {
  modalContents: ModalContent[];
  modalBodyDimension: {
    width: number;
    height: number;
  };
}

const AppModalBody = ({ modalContents, modalBodyDimension }: Props) => {
  const [activeModal] = useGlobalState("activeModal");
  console.log("re-render modal body");

  return (
    <Modal.Body
      className={cx(
        "modal-body",
        "p-0",
        "d-flex",
        "flex-column",
        "transition-all-0_2s-ease-in-out"
      )}
      style={{
        width: modalBodyDimension.width,
        height: modalBodyDimension.height,
      }}
    >
      <ul className={cx("list-unstyled", "d-flex", "position-relative")}>
        {modalContents.map((item, index) => (
          <li
            key={index}
            ref={item.ref as LegacyRef<HTMLLIElement> | undefined}
            className={cx(
              "h-fit-content",
              "position-absolute",
              activeModal === index && "active"
            )}
          >
            {item.modalContent}
          </li>
        ))}
      </ul>
    </Modal.Body>
  );
};

const MemoizedAppModalBody = memo(AppModalBody);

export { MemoizedAppModalBody };
