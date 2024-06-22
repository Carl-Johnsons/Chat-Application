export type ModalContent = {
  title?: string;
  ref: React.MutableRefObject<HTMLElement | undefined>;
  modalContent: React.ReactNode;
  disableHeader?: boolean;
  disableHideModal?: boolean;
};
