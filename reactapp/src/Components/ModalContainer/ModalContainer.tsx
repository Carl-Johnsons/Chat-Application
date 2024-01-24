import { Button, Modal } from "react-bootstrap";
import { memo, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";

import style from "./ModalContainer.module.scss";
import classNames from "classnames/bind";
import ProfileModalContent from "../ProfileModalContent";
import UpdateProfileModalContent from "../UpdateProfileModalContent";
import UpdateAvatarModalContent from "../UpdateAvatarModalContent";
import AppButton from "../AppButton";
import { useGlobalState } from "../../GlobalState";
const cx = classNames.bind(style);

interface ModalContent {
  title?: string;
  ref: React.MutableRefObject<null>;
  modalContent: React.ReactNode;
}
const ModalContainer = () => {
  const [showModal, setShowModal] = useGlobalState("showModal");
  const [modalActive, setModalActive] = useState(0);
  const [modalBodyHeight, setModalBodyHeight] = useState(0);

  const handCloseModal = () => setShowModal(false);
  const modalContentsRef = useRef<ModalContent[]>([
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
  ]);

  useEffect(() => {
    modalContentsRef.current.forEach((item, index) => {
      if (showModal && modalActive == index && item.ref.current) {
        setModalBodyHeight((item.ref.current as HTMLElement).offsetHeight);
      }
    });
  }, [modalActive, showModal]);

  function handleClick(index: number) {
    setModalActive(index);
  }

  return (
    <Modal
      show={showModal}
      onHide={handCloseModal}
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

          {modalContentsRef.current[modalActive].title}
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
          onClick={handCloseModal}
        ></Button>
      </Modal.Header>
      <Modal.Body
        className={cx(
          "modal-body",
          "p-0",
          "d-flex",
          "flex-column",
          "transition-all-0_2s-ease-in-out"
        )}
        style={{ height: modalBodyHeight }}
      >
        <ul className={cx("list-unstyled", "d-flex", "position-relative")}>
          {modalContentsRef.current.map((item, index) => (
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

export default memo(ModalContainer);
