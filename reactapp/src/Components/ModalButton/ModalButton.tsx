import { Button } from "react-bootstrap";
import style from "./ModalButton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
type VariantType<T extends string> = `${T}` | `${T}-transparent`;
type Primary = VariantType<"modal-btn-primary">;
type Secondary = VariantType<"modal-btn-secondary">;
type Tertiary = VariantType<"modal-btn-tertiary">;
interface Props {
  variant?: Primary | Secondary | Tertiary;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
const ModalButton = ({
  variant = "modal-btn-primary",
  className = "",
  onClick = () => {},
  children = "",
}: Props) => {
  return (
    <Button
      variant="default"
      className={cx(variant, className)}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default ModalButton;
