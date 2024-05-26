import { Button, Modal } from "react-bootstrap";
import { memo, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";

import AppButton from "@/components/shared/AppButton";
import ProfileModalContent from "../ProfileModalContent";
import UpdateProfileModalContent from "../UpdateProfileModalContent";
import UpdateAvatarModalContent from "../UpdateAvatarModalContent";
import CreateGroupModalContent from "../CreateGroupModalContent";
import ListGroupMemberModalContent from "../ListingGroupMemberModalContent/ListGroupMember.modalContent";

import { useGlobalState, useModal } from "@/hooks";

import style from "./ModalContainer.module.scss";
import classNames from "classnames/bind";
import { useSendFriendRequest } from "@/hooks/queries/user";

const cx = classNames.bind(style);

interface ModalContent {
  title?: string;
  ref: React.MutableRefObject<null>;
  modalContent: React.ReactNode;
}

const ModalContainer = () => {
  // global state
  const [modalEntityId] = useGlobalState("modalEntityId");
  const [modalType] = useGlobalState("modalType");
  const [showModal] = useGlobalState("showModal");
  const [activeModal, setActiveModal] = useGlobalState("activeModal");
  // hook
  const { handleHideModal } = useModal();
  const { mutate: sendFriendRequestMutate } = useSendFriendRequest();
  // local state
  // const [modalBodyHeight, setModalBodyHeight] = useState(0);
  const [modalBodyDimension, setModalBodyDimension] = useState({
    width: 384,
    height: 0,
  });
  // reference
  const modalContentsRef = useRef<ModalContent[]>();
  const profileRef = useRef(null);
  const profile2Ref = useRef(null); // For nested profile modal
  const createGroupRef = useRef(null);
  const listingGroupMemberRef = useRef(null);
  const updateProfileRef = useRef(null);
  const updateAvatarRef = useRef(null);

  const memberIdRef = useRef<string>();

  const handleClickSendFriendRequest = async () => {
    sendFriendRequestMutate({ receiverId: modalEntityId });
  };
  switch (modalType) {
    case "Personal":
      modalContentsRef.current = [
        {
          title: "Thông tin cá nhân",
          ref: profileRef,
          modalContent: (
            <ProfileModalContent
              modalEntityId={modalEntityId}
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
      break;
    case "Friend":
      modalContentsRef.current = [
        {
          title: "Thông tin tài khoản",
          ref: profileRef,
          modalContent: (
            <ProfileModalContent type="Friend" modalEntityId={modalEntityId} />
          ),
        },
      ];
      break;
    case "Stranger":
      modalContentsRef.current = [
        {
          title: "Thông tin tài khoản",
          ref: profileRef,
          modalContent: (
            <ProfileModalContent
              type="Stranger"
              modalEntityId={modalEntityId}
              onClickSendFriendRequest={handleClickSendFriendRequest}
            />
          ),
        },
      ];
      break;
    case "Group":
      modalContentsRef.current = [
        {
          title: "Thông tin nhóm",
          ref: profileRef,
          modalContent: (
            <ProfileModalContent
              type="Group"
              modalEntityId={modalEntityId}
              onClickMoreMemberInfo={() => {
                handleClick(1);
              }}
            />
          ),
        },
        {
          title: "Thành viên nhóm",
          ref: listingGroupMemberRef,
          modalContent: (
            <ListGroupMemberModalContent
              onClickMember={(memberId) => {
                // Need to solve the nested profile modal
                handleClick(2);
                memberIdRef.current = memberId;
              }}
            />
          ),
        },
        {
          title: "Thông tin tài khoản",
          ref: profile2Ref,
          modalContent: (
            <ProfileModalContent
              type="Friend"
              modalEntityId={memberIdRef.current ?? ""}
            />
          ),
        },
      ];
      break;
    case "CreateGroup":
      modalContentsRef.current = [
        {
          title: "Tạo nhóm",
          ref: createGroupRef,
          modalContent: <CreateGroupModalContent />,
        },
      ];
      break;
    default:
      modalContentsRef.current = [];
      break;
  }

  useEffect(() => {
    modalContentsRef.current &&
      modalContentsRef.current.forEach((item, index) => {
        if (showModal && activeModal == index && item.ref.current) {
          setModalBodyDimension({
            width: (item.ref.current as unknown as HTMLElement).offsetWidth,
            height: (item.ref.current as unknown as HTMLElement).offsetHeight,
          });
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
        style={{
          width: modalBodyDimension.width,
        }}
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

          {modalContentsRef.current[activeModal]?.title}
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
        style={{
          width: modalBodyDimension.width,
          height: modalBodyDimension.height,
        }}
      >
        <ul className={cx("list-unstyled", "d-flex", "position-relative")}>
          {modalContentsRef.current?.map((item, index) => (
            <li
              key={index}
              ref={item.ref}
              className={cx(
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
