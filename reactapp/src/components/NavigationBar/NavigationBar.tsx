import { useGlobalState } from "../../globalState";
import { useEffect } from "react";

import { Nav } from "react-bootstrap";
import NavItem from "../NavItem";
import Avatar from "../Avatar";

import style from "./NavigationBar.module.scss";
import className from "classnames/bind";
import images from "../../assets";
import { useModal, useScreenSectionNavigator } from "../../hooks";
import { getUser } from "../../services/user";

const cx = className.bind(style);

type NavItem = {
  dataContent: string;
  href: string;
  image: string;
  imageAlt: string;
  className?: string;
  navLinkClassName?: string;
};

const NavigationBar = () => {
  const { handleShowModal } = useModal();
  const [activeNav, setActiveNav] = useGlobalState("activeNav");
  const { handleClickScreenSection } = useScreenSectionNavigator();
  const [userId] = useGlobalState("userId");
  const [userMap, setUserMap] = useGlobalState("userMap");
  const [connection] = useGlobalState("connection");
  const user = userMap.get(userId);

  useEffect(() => {
    if (!userId || userMap.has(userId)) {
      return;
    }
    const fetchUserData = async () => {
      const [userData] = await getUser(userId);
      if (userData) {
        //  Create a shallow copy to mutate the map object,
        // Using set method is not going to mutate the map so the component will not re-render
        const newUserMap = new Map([...userMap]);
        newUserMap.set(userId, userData);
        setUserMap(newUserMap);
      }
    };
    fetchUserData();
  }, [setUserMap, userId, userMap, connection]);

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
      href: "/logout",
      image: images.logOutIcon,
      imageAlt: "Log out icon",
    },
  ];
  const handleClick = (linkId: number) => {
    handleClickScreenSection(true);
    if (linkId === 0) {
      handleShowModal(userId, "Personal");
      return;
    }
    if (linkId === items.length - 1) {
      return;
    }
    setActiveNav(linkId);
  };
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
          isActive={activeNav == index}
          className={item.className}
          navLinkClassName={item.navLinkClassName}
          onClick={handleClick}
        >
          <Avatar
            variant="avatar-img-40px"
            className={cx(index !== 0 ? "p-2" : "rounded-circle")}
            src={item.image}
            alt={item.imageAlt}
          />
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavigationBar;
