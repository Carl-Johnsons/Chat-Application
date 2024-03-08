import { Button } from "react-bootstrap";
import style from "./AppButton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
type VariantType<T extends string> = `${T}` | `${T}-transparent`;
type Primary = VariantType<"app-btn-primary">;
type Secondary = VariantType<"app-btn-secondary">;
type Tertiary = VariantType<"app-btn-tertiary">;
interface Props {
  variant?: Primary | Secondary | Tertiary;
  type?: "button" | "reset" | "submit";
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}
const AppButton = ({
  variant = "app-btn-primary",
  className = "",
  children = "",
  type = "button",
  onClick = () => {},
}: Props) => {
  return (
    <Button
      variant="default"
      className={cx(variant, className)}
      type={type}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default AppButton;
