import { Button, Modal } from "react-bootstrap";
import { useState } from "react";

import style from "./ModalContainer.module.scss";
import classNames from "classnames/bind";
import ProfileModalContent from "../ProfileModalContent";
import UpdateProfileModalContent from "../UpdateProfileModalContent/UpdateProfileModalContent";

const cx = classNames.bind(style);

interface Props {
  modalType: "Profile";
  show: boolean;
  handleClose: () => void;
}
const ModalContainer = ({ show, handleClose }: Props) => {
  const [modalActive, setModalActive] = useState(0);
  const titleMap: string[] = [
    "Thông tin cá nhân",
    "Cập nhật thông tin cá nhân",
  ];
  function handleClick(index: number) {
    setModalActive(index);
  }
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className={cx("info-modal")}
        centered
        dialogClassName={cx("modal-dialog")}
        contentClassName={cx("modal-content")}
        role="dialog"
      >
        <Modal.Header className={cx("modal-header")}>
          <Modal.Title className={cx("modal-title")}>
            {titleMap[modalActive]}
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
            onClick={handleClose}
          ></Button>
        </Modal.Header>
        <Modal.Body
          className={cx("modal-body", "p-0", "d-flex", "flex-column")}
        >
          <ul className={cx("list-unstyled", "d-flex", "h-100")}>
            <li className={cx("w-50", modalActive == 0 ? "active" : "")}>
              <ProfileModalContent />
            </li>
            <li className={cx("w-50", modalActive == 1 ? "active" : "")}>
              <UpdateProfileModalContent />
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer className={cx("modal-footer", "p-0")}>
          <Button
            variant="default"
            className={cx("modal-btn", "w-100", "fw-bold", "m-0")}
            onClick={() => handleClick(1)}
          >
            Cập nhật thông tin
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalContainer;
