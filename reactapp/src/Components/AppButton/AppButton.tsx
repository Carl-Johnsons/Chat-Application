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
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}
const AppButton = ({
  variant = "app-btn-primary",
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

export default AppButton;
