import { useGlobalState } from "../globalState";
import { ModalType } from "../models";

const useModal = () => {
  const [userId] = useGlobalState("userId");
  const [, setModalType] = useGlobalState("modalType");
  const [messageType] = useGlobalState("messageType");
  const [friendList] = useGlobalState("friendList");
  const [showModal, setShowModal] = useGlobalState("showModal");
  const [, setActiveModal] = useGlobalState("activeModal");
  const [, setModalEntityId] = useGlobalState("modalEntityId");

  const handleShowModal = (entityId: number, modalType?: ModalType) => {
    let type: ModalType;
    if (messageType === "Group") {
      type = "Group";
    } else if (userId === entityId) {
      type = "Personal";
    } else {
      const friend = friendList.filter((f) => f.friendId === entityId);
      type = friend[0] ? "Friend" : "Stranger";
    }
    setModalEntityId(entityId);
    console.log(modalType ?? type);
    setModalType(modalType ?? type);
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
