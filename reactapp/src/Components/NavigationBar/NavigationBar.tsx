import { Nav } from "react-bootstrap";
import NavItem from "../NavItem";
import Avatar from "../Avatar";

import style from "./NavigationBar.module.scss";
import className from "classnames/bind";
import images from "../../assets";
import { useGlobalState } from "../../GlobalState";

const cx = className.bind(style);

type NavItem = {
  dataContent: string;
  href: string;
  image: string;
  imageAlt: string;
  className?: string;
  navLinkClassName?: string;
};

interface Props {
  activeLink: number;
  setActiveLink: React.Dispatch<React.SetStateAction<number>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationBar = ({ activeLink, setActiveLink, setShowModal }: Props) => {
  const [user] = useGlobalState("user");
  const handleShowModal = () => setShowModal(true);

  const handleClick = (linkId: number) => {
    if (linkId === 0) {
      handleShowModal();
      return;
    }
    setActiveLink(linkId);
  };

  const items: NavItem[] = [
    {
      dataContent: "info-modal",
      href: "#",
      image: user?.avatarUrl || images.userIcon,
      imageAlt: "User Icon",
      navLinkClassName: cx("nav-avatar"),
    },
    {
      dataContent: "conversation-page",
      href: "#",
      image: images.chatIcon,
      imageAlt: "Chat Icon",
    },
    {
      dataContent: "contact-page",
      href: "#",
      image: images.contactIcon,
      imageAlt: "Chat Icon",
      className: "mb-auto",
    },
    {
      dataContent: "log-out",
      href: "/Log/Logout",
      image: images.logOutIcon,
      imageAlt: "Log out icon",
    },
  ];
  return (
    <Nav
      className={cx(
        "application-nav-bar",
        "border-0",
        "nav-tabs",
        "d-flex",
        "flex-column",
        "h-100"
      )}
    >
      {items.map((item, index) => (
        <NavItem
          key={index}
          index={index}
          dataContent={item.dataContent}
          href={item.href}
          isActive={activeLink == index}
          className={item.className}
          navLinkClassName={item.navLinkClassName}
          onClick={handleClick}
        >
          <Avatar
            variant="avatar-img-40px"
            className={cx("rounded-circle", index !== 0 && "p-2")}
            src={item.image}
            alt={item.imageAlt}
          />
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavigationBar;
