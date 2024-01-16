import style from "./Avatar.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);
type AppImageVariants = "16" | "20" | "40" | "45" | "50" | "80";
type VariantType<T extends string> = `avatar-img-${T}px`;

type Default = "avatar-img";

interface Props {
  variant?: Default | VariantType<AppImageVariants>;
  src: string;
  alt: string;
  className?: string;
}

const Avatar = ({ variant = "avatar-img", src, alt, className }: Props) => {
  return (
    <img
      draggable="false"
      className={cx(variant, className)}
      src={src}
      alt={alt}
    />
  );
};

export default Avatar;
