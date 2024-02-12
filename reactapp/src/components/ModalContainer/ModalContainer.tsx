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
import {
  signalRSendFriendRequest,
  useModal,
  useSignalREvents,
} from "../../hooks";
import { useGlobalState } from "../../globalState";
import { sendFriendRequest } from "../../services/user";

const cx = classNames.bind(style);

interface ModalContent {
  title?: string;
  ref: React.MutableRefObject<null>;
  modalContent: React.ReactNode;
}

const ModalContainer = () => {
  // global state
  const [userId] = useGlobalState("userId");
  const [userMap] = useGlobalState("userMap");
  const [modalEntityId] = useGlobalState("modalEntityId");
  const [modalType] = useGlobalState("modalType");
  const [showModal] = useGlobalState("showModal");
  const [activeModal, setActiveModal] = useGlobalState("activeModal");
  const [connection] = useGlobalState("connection");
  // hook
  const { handleHideModal } = useModal();
  const invokeAction = useSignalREvents({ connection: connection });
  // local state
  const [modalBodyHeight, setModalBodyHeight] = useState(0);
  // reference
  const modalContentsRef = useRef<ModalContent[]>();
  const profileRef = useRef(null);
  const updateProfileRef = useRef(null);
  const updateAvatarRef = useRef(null);

  const handleClickSendFriendRequest = async () => {
    const currentUser = userMap.get(userId);
    if (!currentUser) {
      console.log("current user is null");
      return;
    }
    const [fr, error] = await sendFriendRequest(currentUser, modalEntityId);
    console.log(fr);
    if (!fr) {
      console.error(error);
      return;
    }
    //The friendRequest didn't store the sender user
    fr.sender = currentUser;
    invokeAction(signalRSendFriendRequest(fr));
  };

  if (modalType === "Personal") {
    modalContentsRef.current = [
      {
        title: "Thông tin cá nhân",
        ref: profileRef,
        modalContent: (
          <ProfileModalContent
            type="Personal"
            onClickUpdate={() => handleClick(1)}
            onClickEditUserName={() => handleClick(1)}
            onClickEditAvatar={() => handleClick(2)}
          />
        ),
      },
      {
        title: "Cập nhật thông tin cá nhân",
        ref: updateProfileRef,
        modalContent: (
          <UpdateProfileModalContent onClickCancel={() => handleClick(0)} />
        ),
      },
      {
        title: "Cập nhật thông tin cá nhân",
        ref: updateAvatarRef,
        modalContent: <UpdateAvatarModalContent />,
      },
    ];
  } else if (modalType === "Friend") {
    modalContentsRef.current = [
      {
        title: "Thông tin tài khoản",
        ref: profileRef,
        modalContent: <ProfileModalContent type="Friend" />,
      },
    ];
  } else {
    modalContentsRef.current = [
      {
        title: "Thông tin tài khoản",
        ref: profileRef,
        modalContent: (
          <ProfileModalContent
            type="Stranger"
            onClickSendFriendRequest={handleClickSendFriendRequest}
          />
        ),
      },
    ];
  }

  useEffect(() => {
    modalContentsRef.current &&
      modalContentsRef.current.forEach((item, index) => {
        if (showModal && activeModal == index && item.ref.current) {
          setModalBodyHeight((item.ref.current as HTMLElement).offsetHeight);
        }
      });
  }, [activeModal, showModal]);

  function handleClick(index: number) {
    setActiveModal(index);
  }

  return (
    <Modal
      show={showModal}
      onHide={handleHideModal}
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
          activeModal != 0 && "ps-2"
        )}
      >
        <Modal.Title className={cx("modal-title")}>
          {activeModal != 0 && (
            <AppButton
              className={cx("rounded-circle", "p-0", "me-1")}
              onClick={() => handleClick(0)}
              variant="app-btn-primary-transparent"
            >
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </AppButton>
          )}

          {modalContentsRef.current[activeModal].title}
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
                activeModal == index && "active"
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
