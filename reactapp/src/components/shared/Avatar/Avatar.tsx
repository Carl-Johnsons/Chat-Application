import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import AppButton from "../AppButton";
import style from "./Avatar.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

type AppImageVariants = "16" | "20" | "30" | "40" | "45" | "50" | "80";
type VariantType<T extends string> = `avatar-img-${T}px`;

type Default = "avatar-img";

interface Props {
  variant?: Default | VariantType<AppImageVariants>;
  src: string;
  alt: string;
  className?: string;
  avatarClassName?: string;
  editable?: boolean;
  onClickEdit?: () => void;
}

const Avatar = ({
  variant = "avatar-img",
  src,
  alt,
  className = "",
  avatarClassName = "",
  editable,
  onClickEdit,
}: Props) => {
  const isDefault = variant === "avatar-img";
  const size = isDefault
    ? 45
    : parseInt(variant.replace("avatar-img-", ""), 10);
  return (
    <div
      className={`position-relative d-flex align-items-center justify-content-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        className={avatarClassName}
        width={size}
        height={size}
        loading="lazy"
        draggable="false"
      />
      {editable && (
        <AppButton
          className={cx(
            "avatar-edit-btn",
            "rounded-circle",
            "p-0",
            "position-absolute",
            "d-inline-flex",
            "justify-content-center",
            "align-items-center"
          )}
          onClick={onClickEdit}
        >
          <FontAwesomeIcon icon={faCamera} />
        </AppButton>
      )}
    </div>
  );
};

export default Avatar;
