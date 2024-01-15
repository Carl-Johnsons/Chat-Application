import { Button, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";

import style from "./ModalContainer.module.scss";
import classNames from "classnames/bind";
import ProfileModalContent from "../ProfileModalContent";
import UpdateProfileModalContent from "../UpdateProfileModalContent";
import UpdateAvatarModalContent from "../UpdateAvatarModalContent";
import AppButton from "../AppButton";
const cx = classNames.bind(style);

interface Props {
  modalType: "Profile";
  show: boolean;
  handleClose: () => void;
}
interface ModalContent {
  title?: string;
  ref: React.MutableRefObject<null>;
  modalContent: React.ReactNode;
}
const ModalContainer = ({ show, handleClose }: Props) => {
  const [modalActive, setModalActive] = useState(0);
  const [modalBodyHeight, setModalBodyHeight] = useState(0);

  const titleMap: string[] = [
    "Thông tin cá nhân",
    "Cập nhật thông tin cá nhân",
    "Cập nhật ảnh đại diện",
  ];

  const modalContents: ModalContent[] = [
    {
      title: "Thông tin cá nhân",
      ref: useRef(null),
      modalContent: (
        <ProfileModalContent
          onClickUpdate={() => handleClick(1)}
          onClickEditUserName={() => handleClick(1)}
          onClickEditAvatar={() => handleClick(2)}
        />
      ),
    },
    {
      title: "Cập nhật thông tin cá nhân",
      ref: useRef(null),
      modalContent: (
        <UpdateProfileModalContent onClickCancel={() => handleClick(0)} />
      ),
    },
    {
      title: "Cập nhật thông tin cá nhân",
      ref: useRef(null),
      modalContent: <UpdateAvatarModalContent />,
    },
  ];
  // Ensure modalContents won't re-rendering
  const modalContentsRef = useRef(modalContents);

  useEffect(() => {
    modalContentsRef.current.forEach((item, index) => {
      if (modalActive == index && item.ref.current) {
        setModalBodyHeight((item.ref.current as HTMLElement).offsetHeight);
      }
    });
  }, [show, modalActive]);

  function handleClick(index: number) {
    setModalActive(index);
  }
  return (
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
        className={cx(
          "modal-header",
          "d-flex",
          "align-items-center",
          modalActive != 0 && "ps-2"
        )}
      >
        <Modal.Title className={cx("modal-title")}>
          {modalActive != 0 && (
            <AppButton
              className={cx("rounded-circle", "p-0", "me-1")}
              onClick={() => handleClick(0)}
              variant="app-btn-primary-transparent"
            >
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </AppButton>
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
        <ul className={cx("list-unstyled", "d-flex", "position-relative")}>
          {modalContents.map((item, index) => (
            <li
              key={index}
              ref={item.ref}
              className={cx(
                "w-50",
                "h-fit-content",
                "position-absolute",
                modalActive == index && "active"
              )}
            >
              {item.modalContent}
            </li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default ModalContainer;
