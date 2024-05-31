import React from "react";
import { Modal } from "react-bootstrap";
import classNames from "classnames/bind";
import style from "./AppModal.body.module.scss";
import { useGlobalState } from "@/hooks";

const cx = classNames.bind(style);

interface Props {
  modalContents: {
    title: string;
    ref: React.MutableRefObject<HTMLLIElement | null>;
    modalContent: React.ReactNode;
  }[];
  modalBodyDimension: {
    width: number;
    height: number;
  };
}

const AppModalBody = ({ modalContents, modalBodyDimension }: Props) => {
  const [activeModal] = useGlobalState("activeModal");

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
            ref={item.ref}
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

export { AppModalBody };
