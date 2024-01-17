import style from "./NavItem.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
interface Props {
  index: number;
  href: string;
  dataContent: string;
  isActive?: boolean;
  children: React.ReactNode;
  className?: string;
  navLinkClassName?: string;
  onClick: (index: number) => void;
}

const NavItem = ({
  index,
  href,
  dataContent,
  isActive = false,
  children,
  className = "",
  navLinkClassName = "",
  onClick,
}: Props) => {
  return (
    <li key={index} className={cx("nav-item", className)}>
      <a
        className={cx(
          "nav-link",
          "d-flex",
          "w-100",
          "d-flex",
          "justify-content-center",
          isActive ? "active" : "",
          navLinkClassName
        )}
        href={href}
        data-content={dataContent}
        onClick={() => onClick(index)}
      >
        {children}
      </a>
    </li>
  );
};

export default NavItem;
