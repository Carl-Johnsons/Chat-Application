import { ModalType } from "models/ModalType";
import { useGlobalState } from ".";
import { useGetCurrentUser, useGetFriendList } from "./queries/user";
import { useCallback } from "react";

interface ModalProps {
  entityId?: number;
  modalType?: ModalType;
}
const useModal = () => {
  const [, setModalType] = useGlobalState("modalType");
  const [showModal, setShowModal] = useGlobalState("showModal");
  const [, setActiveModal] = useGlobalState("activeModal");
  const [, setModalEntityId] = useGlobalState("modalEntityId");
  const { data: currentUser } = useGetCurrentUser();
  const { data: friendList } = useGetFriendList();

  const handleShowModal = useCallback(
    ({ entityId, modalType }: ModalProps) => {
      let type: ModalType;
      if (currentUser?.sub === entityId) {
        type = "Personal";
      } else {
        const friend = (friendList ?? []).filter(
          (f) => f.friendId === entityId
        );
        type = friend[0] ? "Friend" : "Stranger";
      }
      entityId && setModalEntityId(entityId);
      setModalType(modalType ?? type);
      setShowModal(true);
    },
    [currentUser?.sub, friendList, setModalEntityId, setModalType, setShowModal]
  );
  const handleHideModal = () => {
    setActiveModal(0);
    setShowModal(false);
  };
  const handleToggleModal = (modalUserId: number) => {
    const state = !showModal;
    state ? handleShowModal({ entityId: modalUserId }) : handleHideModal();
    setShowModal(state);
  };

  return {
    handleShowModal,
    handleHideModal,
    handleToggleModal,
  };
};

export { useModal };
