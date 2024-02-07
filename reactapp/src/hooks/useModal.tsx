import { useGlobalState } from "../globalState";
import { ModalType } from "../models";

const useModal = () => {
  const [userId] = useGlobalState("userId");
  const [, setModalType] = useGlobalState("modalType");
  const [friendList] = useGlobalState("friendList");
  const [showModal, setShowModal] = useGlobalState("showModal");
  const [, setActiveModal] = useGlobalState("activeModal");

  const handleShowModal = (modalUserId: number) => {
    let type: ModalType;
    if (userId === modalUserId) {
      type = "Personal";
    } else {
      const friend = friendList.filter((f) => f.friendId === modalUserId);
      type = friend[0] ? "Friend" : "Stranger";
    }
    setModalType(type);
    setShowModal(true);
  };
  const handleHideModal = () => {
    setActiveModal(0);
    setShowModal(false);
  };
  const handleToggleModal = (modalUserId: number) => {
    const state = !showModal;
    state ? handleShowModal(modalUserId) : handleHideModal();
    setShowModal(state);
  };

  return {
    handleShowModal,
    handleHideModal,
    handleToggleModal,
  };
};

export { useModal };
