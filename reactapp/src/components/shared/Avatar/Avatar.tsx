import Image from "next/image";
type AppImageVariants = "16" | "20" | "30" | "40" | "45" | "50" | "80";
type VariantType<T extends string> = `avatar-img-${T}px`;

type Default = "avatar-img";

interface Props {
  variant?: Default | VariantType<AppImageVariants>;
  src: string;
  alt: string;
  className?: string;
}

const Avatar = ({ variant = "avatar-img", src, alt, className }: Props) => {
  const isDefault = variant === "avatar-img";
  const size = isDefault
    ? 45
    : parseInt(variant.replace("avatar-img-", ""), 10);
  return (
    <Image
      src={src}
      alt={alt}
      className={`${className}`}
      width={size}
      height={size}
      loading="lazy"
      draggable="false"
    />
  );
};

export default Avatar;
