import { useEffect } from "react";
import { Nav } from "react-bootstrap";

import Avatar from "@/components/shared/Avatar";
import NavItem from "../NavItem";
//hook
import {
  useGlobalState,
  useLogout,
  useModal,
  useScreenSectionNavigator,
} from "@/hooks";

//service
import { getUserProfile, getUser } from "@/services/user";

import styles from "./NavigationBar.module.scss";
import classNames from "classnames/bind";
import images from "@/assets";
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
  const { handleShowModal } = useModal();
  const [activeNav, setActiveNav] = useGlobalState("activeNav");
  const { handleClickScreenSection } = useScreenSectionNavigator();
  const [, setUserId] = useGlobalState("userId");
  const [userId] = useGlobalState("userId");
  const [userMap, setUserMap] = useGlobalState("userMap");
  const user = userMap.get(userId);

  const logout = useLogout();
  useEffect(() => {
    if (userId) {
      return;
    }
    const fetchUserData = async () => {
      const [user] = await getUserProfile();
      if (!user) {
        return;
      }
      setUserId(user.userId);

      const [userData] = await getUser(user.userId);

      if (!userData) {
        return;
      }
      //  Create a shallow copy to mutate the map object,
      // Using set method is not going to mutate the map so the component will not re-render
      const newUserMap = new Map(userMap);
      newUserMap.set(user.userId, userData);
      setUserMap(newUserMap);
    };
    fetchUserData();
  }, [setUserId, setUserMap, userId, userMap]);

  const items: NavItem[] = [
    {
      dataContent: "info-modal",
      href: "#",
      image: user?.avatarUrl || images.userIcon.src,
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
      imageAlt: "Chat Icon",
      className: "mb-auto",
    },
    {
      dataContent: "log-out",
      href: "#",
      image: images.logOutIcon.src,
      imageAlt: "Log out icon",
    },
  ];

  const handleClick = (linkId: number) => {
    handleClickScreenSection(true);
    if (linkId === 0) {
      handleShowModal({ entityId: userId, modalType: "Personal" });
      return;
    }
    if (linkId === items.length - 1) {
      logout();
      return;
    }
    setActiveNav(linkId);
  };
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
            className={index !== 0 ? "p-2" : "rounded-circle"}
            src={item.image}
            alt={item.imageAlt}
          />
        </NavItem>
      ))}
    </Nav>
  );
};

export default NavigationBar;
