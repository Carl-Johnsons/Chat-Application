import { Button, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";

import style from "./ModalContainer.module.scss";
import classNames from "classnames/bind";
import ProfileModalContent from "../ProfileModalContent";
import UpdateProfileModalContent from "../UpdateProfileModalContent/UpdateProfileModalContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
const cx = classNames.bind(style);

interface Props {
  modalType: "Profile";
  show: boolean;
  handleClose: () => void;
}
const ModalContainer = ({ show, handleClose }: Props) => {
  const [modalActive, setModalActive] = useState(0);
  const [modalBodyHeight, setModalBodyHeight] = useState(0);
  const titleMap: string[] = [
    "Thông tin cá nhân",
    "Cập nhật thông tin cá nhân",
  ];

  const UpdateProfileModalContentRef = useRef(null);
  const ProfileModalContentRef = useRef(null);
  useEffect(() => {
    if (ProfileModalContentRef.current && modalActive == 0) {
      setModalBodyHeight(
        (ProfileModalContentRef.current as HTMLElement).offsetHeight
      );
    }
    if (UpdateProfileModalContentRef.current && modalActive == 1) {
      setModalBodyHeight(
        (UpdateProfileModalContentRef.current as HTMLElement).offsetHeight
      );
    }
  }, [show, modalActive]);

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
        <Modal.Header
          className={cx("modal-header", "d-flex", "align-items-center")}
        >
          <Modal.Title className={cx("modal-title")}>
            {modalActive != 0 ? (
              <Button
                variant="default"
                className={cx("rounded-circle", "modal-btn", "p-0", "me-1")}
                onClick={() => handleClick(0)}
              >
                <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
              </Button>
            ) : (
              ""
            )}

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
          style={{ height: modalBodyHeight }}
        >
          <ul className={cx("list-unstyled", "d-flex")}>
            <li
              ref={ProfileModalContentRef}
              className={cx(
                "w-50",
                "h-fit-content",
                modalActive == 0 ? "active" : ""
              )}
            >
              <ProfileModalContent handleClickUpdate={() => handleClick(1)} />
            </li>
            <li
              ref={UpdateProfileModalContentRef}
              className={cx(
                "w-50",
                "h-fit-content",
                modalActive == 1 ? "active" : ""
              )}
            >
              <UpdateProfileModalContent
                handleClickCancel={() => handleClick(0)}
              />
            </li>
          </ul>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalContainer;
