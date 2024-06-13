import { Button } from "react-bootstrap";
import { ButtonProps } from "react-bootstrap";
import style from "./AppButton.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
type VariantType<T extends string> = `${T}` | `${T}-transparent`;
type Primary = VariantType<"app-btn-primary">;
type Secondary = VariantType<"app-btn-secondary">;
type Tertiary = VariantType<"app-btn-tertiary">;
type Danger = VariantType<"app-btn-danger">;
type PhoneCall = VariantType<"app-btn-phone-call">;
type PhoneCallDecline = VariantType<"app-btn-phone-call-decline">;
interface Props extends ButtonProps {
  variant?:
    | Primary
    | Secondary
    | Tertiary
    | Danger
    | PhoneCall
    | PhoneCallDecline;
  type?: "button" | "reset" | "submit";
  className?: string;
  children?: React.ReactNode;
}
const AppButton = ({
  variant = "app-btn-primary",
  className = "",
  children = "",
  type = "button",
  ...props
}: Props) => {
  return (
    <Button
      variant="default"
      className={cx(variant, className)}
      type={type}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AppButton;
