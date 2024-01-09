import { useState } from "react";
import className from "classnames/bind";
import style from "./NavigationBar.module.scss";
import images from "../../assets";
import { Nav } from "react-bootstrap";

const cx = className.bind(style);

type NavItem = {
  dataContent: string;
  href: string;
  image: string;
};

interface Props {
  handleShowProfileModal: () => void;
}

const NavigationBar = ({ handleShowProfileModal }: Props) => {
  const [activeLink, setActiveLink] = useState(1);

  const handleClick = (linkId: number) => {
    if (linkId == 0) {
      handleShowProfileModal();
      return;
    }
    setActiveLink(linkId);
  };

  const items: NavItem[] = [
    {
      dataContent: "info-modal",
      href: "#",
      image: images.userIcon,
    },
    {
      dataContent: "conversation-page",
      href: "#",
      image: images.chatIcon,
    },
    {
      dataContent: "contact-page",
      href: "#",
      image: images.contactIcon,
    },
    {
      dataContent: "log-out",
      href: "/Log/Logout",
      image: images.logOutIcon,
    },
  ];
  return (
    <>
      <div className={cx("application-nav-bar", "h-100")}>
        <Nav className={cx("nav-tabs", "h-100")}>
          {items.map((item, index) => (
            <li
              key={index}
              className={cx("nav-item", index == 2 ? "mb-auto" : "")}
            >
              <a
                className={cx(
                  "nav-link",
                  "d-flex",
                  "w-100",
                  "d-flex",
                  "justify-content-center",
                  activeLink == index ? "active" : ""
                )}
                href={item.href}
                data-content={item.dataContent}
                onClick={() => handleClick(index)}
              >
                <img
                  draggable="false"
                  src={item.image}
                  className={cx("avatar-img")}
                />
              </a>
            </li>
          ))}
        </Nav>
      </div>
    </>
  );
};

export default NavigationBar;
