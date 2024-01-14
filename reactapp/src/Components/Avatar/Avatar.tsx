import style from "./Avatar.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);

type Default = "avatar-img";
type Large = "avatar-img-lg";

interface Props {
  variant?: Default | Large;
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
