export type ModalContent = {
  title?: string;
  ref: React.MutableRefObject<HTMLElement | undefined>;
  modalContent: React.ReactNode;
};
