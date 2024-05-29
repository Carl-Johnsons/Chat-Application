import { Nav } from "react-bootstrap";

import Avatar from "@/components/shared/Avatar";
import NavItem from "../NavItem";
//hook
import { useGlobalState, useModal, useScreenSectionNavigator } from "@/hooks";

//service
import styles from "./NavigationBar.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
import { useLogout } from "@/hooks/queries/auth";
import { useGetCurrentUser } from "@/hooks/queries/user";
import { useCallback } from "react";
const cx = classNames.bind(styles);
type NavItem = {
  dataContent: string;
  href: string;
  image: string;
  imageAlt: string;
  className?: string;
  navLinkClassName?: string;
};

const NavigationBar = () => {
  const [activeNav, setActiveNav] = useGlobalState("activeNav");

  const { handleShowModal } = useModal();
  const { handleClickScreenSection } = useScreenSectionNavigator();
  const { data: currentUser } = useGetCurrentUser();

  const { mutate: logoutMutate } = useLogout();
  const userProfileQuery = useGetCurrentUser();

  const items: NavItem[] = [
    {
      dataContent: "info-modal",
      href: "#",
      image: userProfileQuery.data?.avatarUrl || images.userIcon.src,
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
      className: "mb-auto",
    },
    {
      dataContent: "log-out",
      href: "/logout",
      image: images.logOutIcon.src,
      imageAlt: "Log out icon",
    },
  ];

  const handleClick = useCallback(
    (linkId: number) => {
      handleClickScreenSection(true);
      if (linkId === 0) {
        handleShowModal({
          entityId: currentUser?.id,
          modalType: "Personal",
        });
        return;
      }
      if (linkId === items.length - 1) {
        logoutMutate();
        return;
      }
      setActiveNav(linkId);
    },
    [
      currentUser,
      handleClickScreenSection,
      handleShowModal,
      items.length,
      logoutMutate,
      setActiveNav,
    ]
  );

  return (
    <Nav
      className={cx(
        "application-nav-bar",
        " border-0 nav-tabs d-flex flex-column h-100"
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
            avatarClassName={cx(index === 0 ? "rounded-circle" : "p-2")}
            src={item.image}
            alt={item.imageAlt}
          />
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavigationBar;
