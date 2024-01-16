import { useState } from "react";
import className from "classnames/bind";
import style from "./NavigationBar.module.scss";
import images from "../../assets";
import { Nav } from "react-bootstrap";
import NavItem from "../NavItem";
import Avatar from "../Avatar";

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
  onShow: () => void;
}

const NavigationBar = ({ onShow }: Props) => {
  const [activeLink, setActiveLink] = useState(1);
  const handleClick = (linkId: number) => {
    if (linkId === 0) {
      onShow();
      return;
    }
    setActiveLink(linkId);
  };

  const items: NavItem[] = [
    {
      dataContent: "info-modal",
      href: "#",
      image: images.userIcon,
      imageAlt: "User Icon",
      navLinkClassName: "pt-4 pb-4",
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
          handleClick={() => handleClick(index)}
          href={item.href}
          isActive={activeLink == index}
          className={item.className}
          navLinkClassName={item.navLinkClassName}
        >
          <Avatar variant="avatar-img-50px" src={item.image} alt={item.imageAlt} />
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavigationBar;
