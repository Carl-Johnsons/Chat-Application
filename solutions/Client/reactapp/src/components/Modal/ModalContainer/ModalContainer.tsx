import React, { memo, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useGlobalState, useModal } from "@/hooks";
import { useSendFriendRequest } from "@/hooks/queries/user";

import style from "./ModalContainer.module.scss";
import classNames from "classnames/bind";
import { AppModalBody, AppModalHeader, ModalContentMapper } from "..";

const cx = classNames.bind(style);

interface ModalContent {
  title?: string;
  ref: React.MutableRefObject<null>;
  modalContent: React.ReactNode;
}

const ModalContainer = () => {
  // Global state
  const [modalEntityId] = useGlobalState("modalEntityId");
  const [showModal] = useGlobalState("showModal");
  const [activeModal, setActiveModal] = useGlobalState("activeModal");

  // Hooks
  const { handleHideModal } = useModal();
  const { mutate: sendFriendRequestMutate } = useSendFriendRequest();

  // Local state
  const [modalBodyDimension, setModalBodyDimension] = useState({
    width: 384,
    height: 0,
  });

  // Reference
  const modalContentsRef = useRef<ModalContent[]>([]);

  const handleClickSendFriendRequest = async () => {
    sendFriendRequestMutate({ receiverId: modalEntityId });
  };

  const modalContents = ModalContentMapper({
    handleClick,
    handleClickSendFriendRequest,
  });

  useEffect(() => {
    modalContentsRef.current = modalContents;
    modalContents.forEach((item, index) => {
      if (showModal && activeModal === index && item.ref.current) {
        setModalBodyDimension({
          width: (item.ref.current as unknown as HTMLElement).offsetWidth,
          height: (item.ref.current as unknown as HTMLElement).offsetHeight,
        });
      }
    });
  }, [activeModal, showModal, modalContents]);

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
      <AppModalHeader
        handleClick={handleClick}
        modalContents={modalContents}
        handleHideModal={handleHideModal}
        modalBodyDimension={modalBodyDimension}
      />
      <AppModalBody
        modalContents={modalContents}
        modalBodyDimension={modalBodyDimension}
      />
    </Modal>
  );
};

const MemoizedModalContainer = memo(ModalContainer);

export { MemoizedModalContainer };
