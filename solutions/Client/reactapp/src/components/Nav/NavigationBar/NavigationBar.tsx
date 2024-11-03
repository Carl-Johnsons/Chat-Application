import { Nav } from "react-bootstrap";

import Avatar from "@/components/shared/Avatar";
import NavItem from "../NavItem";
//hook
import { useGlobalState, useModal, useScreenSectionNavigator } from "@/hooks";

//service
import styles from "./NavigationBar.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
import { useGetCurrentUser } from "@/hooks/queries/user";
import { useCallback } from "react";
import { ROLE } from "data/constants";
const cx = classNames.bind(styles);

type NavItem = {
  dataContent: string;
  href: string;
  image: string;
  imageAlt: string;
  className?: string;
  navLinkClassName?: string;
};

type NavBarItem = {
  admin: NavItem[];
  user: NavItem[];
};

const NavigationBar = () => {
  const [activeNav, setActiveNav] = useGlobalState("activeNav");
  const { handleShowModal } = useModal();
  const { handleClickScreenSection } = useScreenSectionNavigator();
  const { data: currentUser } = useGetCurrentUser();

  const navBarItems: NavBarItem = {
    admin: [
      {
        dataContent: "info-modal",
        href: "#",
        image: currentUser?.avatarUrl || images.defaultAvatarImg.src,
        imageAlt: "User Icon",
        navLinkClassName: cx("nav-avatar"),
      },
      {
        dataContent: "dashboard",
        href: "#",
        image: images.statistic.src,
        imageAlt: "Statistic icon",
      },
      {
        dataContent: "log-out",
        href: "/logout",
        image: images.logOutIcon.src,
        imageAlt: "Log out icon",
        className: "mt-auto",
      },
    ],
    user: [
      {
        dataContent: "info-modal",
        href: "#",
        image: currentUser?.avatarUrl || images.defaultAvatarImg.src,
        imageAlt: "User Icon",
        navLinkClassName: cx("nav-avatar"),
      },
      {
        dataContent: "conversation-page",
        href: "#",
        image: images.chatIcon.src,
        imageAlt: "Chat Icon",
      },
      {
        dataContent: "contact-page",
        href: "#",
        image: images.contactIcon.src,
        imageAlt: "Contact Icon",
      },
      {
        dataContent: "post-page",
        href: "#",
        image: images.post.src,
        imageAlt: "Post Icon",
      },
      {
        dataContent: "log-out",
        href: "/logout",
        image: images.logOutIcon.src,
        imageAlt: "Log out icon",
        className: "mt-auto",
      },
    ],
  };

  let items: NavItem[];

  switch (currentUser?.role) {
    case ROLE.ADMIN:
      items = navBarItems.admin;
      break;
    default:
      items = navBarItems.user;
      break;
  }

  const handleClick = useCallback(
    (dataContent: string, index: number) => {
      handleClickScreenSection(true);
      if (dataContent === "info-modal") {
        handleShowModal({
          entityId: currentUser?.id,
          modalType: "Personal",
        });
        return;
      }
      setActiveNav(index);
    },
    [currentUser, handleClickScreenSection, handleShowModal, setActiveNav]
  );

  return (
    <Nav
      className={cx(
        "application-nav-bar",
        " border-0 nav-tabs d-flex flex-column h-100"
      )}
    >
      {currentUser &&
        items.map((item, index) => (
          <NavItem
            key={index}
            index={index}
            dataContent={item.dataContent}
            href={item.href}
            isActive={activeNav == index}
            className={item.className}
            navLinkClassName={item.navLinkClassName}
            onClick={() => handleClick(item.dataContent, index)}
          >
            <Avatar
              variant="avatar-img-40px"
              avatarClassName={cx(
                item.dataContent === "info-modal" ? "rounded-circle" : "p-2"
              )}
              src={item.image}
              alt={item.imageAlt}
            />
          </NavItem>
        ))}
    </Nav>
  );
};

export default NavigationBar;
