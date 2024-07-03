import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { ImageProps } from "next/image";
import AppButton from "../AppButton";
import style from "./Avatar.module.scss";
import classNames from "classnames/bind";
import Skeleton from "react-loading-skeleton";
import Box from "../Box";
import { useState } from "react";

const cx = classNames.bind(style);

type AppImageVariants =
  | "16"
  | "20"
  | "30"
  | "40"
  | "45"
  | "50"
  | "80"
  | "120"
  | "160"
  | "240";
type VariantType<T extends string> = `avatar-img-${T}px`;

type Default = "avatar-img";

interface Props extends ImageProps {
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
  ...props
}: Props) => {
  const isDefault = variant === "avatar-img";
  const size = isDefault
    ? 45
    : parseInt(variant.replace("avatar-img-", ""), 10);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div
      className={`position-relative d-flex align-items-center justify-content-center ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        alt={alt}
        src={src}
        className={cx(
          "overflow-hidden",
          avatarClassName + `${!isImageLoaded ? " opacity-0" : " opacity-100"}`
        )}
        width={size}
        height={size}
        loading="lazy"
        draggable="false"
        onLoad={() => setIsImageLoaded(true)}
        {...props}
      />
      {!isImageLoaded && (
        <Box style={{ width: size, height: size, position: "absolute" }}>
          <Skeleton
            circle
            width={size}
            height={size}
            count={1}
            className="d-block lh-1"
          />
        </Box>
      )}

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
