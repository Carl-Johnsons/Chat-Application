import React, { memo, useEffect, useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useGlobalState, useModal } from "@/hooks";

import style from "./ModalContainer.module.scss";
import classNames from "classnames/bind";
import {
  MemoizedAppModalBody,
  ModalContentMapper,
  MemoizedAppModalHeader,
} from "..";
import { ModalContent } from "@/models";

const cx = classNames.bind(style);

const ModalContainer = () => {
  // Global state
  const [showModal] = useGlobalState("showModal");
  const [activeModal] = useGlobalState("activeModal");

  // Hooks
  const { handleHideModal } = useModal();

  const modalContentsRef = useRef<ModalContent[]>([]);

  const modalContents = ModalContentMapper();

  // Local state
  const [modalBodyDimension, setModalBodyDimension] = useState({
    width: 384,
    height: 0,
  });

  const observedDiv = useRef<HTMLElement>();

  //  Update the initialize width, height of the element.
  // But didn't update when the div update dimension

  useEffect(() => {
    modalContentsRef.current = modalContents;
    modalContents.forEach((item, index) => {
      if (showModal && activeModal === index && item.ref.current) {
        observedDiv.current = item.ref.current;
      }
    });
    if (
      !observedDiv.current ||
      (observedDiv.current.offsetWidth === modalBodyDimension.width &&
        observedDiv.current.offsetHeight === modalBodyDimension.height)
    )
      return;
    setModalBodyDimension({
      width: observedDiv.current.offsetWidth,
      height: observedDiv.current.offsetHeight,
    });
  }, [
    activeModal,
    modalBodyDimension.height,
    modalBodyDimension.width,
    modalContents,
    showModal,
  ]);

  //  Observe the div if the it update its width and height
  // in order to flexible update modal body width and height
  useEffect(
    () => {
      if (!observedDiv.current) {
        return;
      }
      const resizeObserver = new ResizeObserver(() => {
        if (
          observedDiv.current?.offsetWidth !== modalBodyDimension.width ||
          observedDiv.current?.offsetHeight !== modalBodyDimension.height
        ) {
          setModalBodyDimension({
            width: observedDiv.current?.offsetWidth ?? 384,
            height: observedDiv.current?.offsetHeight ?? 0,
          });
        }
      });

      resizeObserver.observe(observedDiv.current);

      return function cleanup() {
        resizeObserver.disconnect();
      };
    },
    // only update the effect if the ref element changed
    [modalBodyDimension.height, modalBodyDimension.width]
  );

  return (
    <Modal
      show={showModal}
      onHide={
        !modalContents[activeModal]?.disableHideModal
          ? handleHideModal
          : () => {}
      }
      className={cx("info-modal")}
      centered
      dialogClassName={cx("modal-dialog")}
      contentClassName={cx("modal-content")}
      role="dialog"
    >
      {!modalContents[activeModal]?.disableHeader && (
        <MemoizedAppModalHeader
          title={modalContents[activeModal]?.title}
          handleHideModal={handleHideModal}
          modalBodyDimension={modalBodyDimension}
        />
      )}
      <MemoizedAppModalBody
        modalContents={modalContents}
        modalBodyDimension={modalBodyDimension}
      />
    </Modal>
  );
};

const MemoizedModalContainer = memo(ModalContainer);

export { MemoizedModalContainer };
