import { useGlobalState } from "../../GlobalState";
import { useEffect } from "react";

import { Nav } from "react-bootstrap";
import NavItem from "../NavItem";
import Avatar from "../Avatar";

import style from "./NavigationBar.module.scss";
import className from "classnames/bind";
import images from "../../assets";
import APIUtils from "../../Utils/Api/APIUtils";
import useSignalREvents, { mapUserData } from "../../hooks/useSignalREvents";

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
  const [userId] = useGlobalState("userId");
  const [userMap, setUserMap] = useGlobalState("userMap");
  const [connection] = useGlobalState("connection");
  const user = userMap.get(userId);
  const handleShowModal = () => setShowModal(true);
  const invokeAction = useSignalREvents({ connection: connection });

  useEffect(() => {
    if (!userId || userMap.has(userId)) {
      return;
    }
    const fetchUserData = async () => {
      const [userData] = await APIUtils.getUser(userId);
      if (userData) {
        //  Create a shallow copy to mutate the map object,
        // Using set method is not going to mutate the map so the component will not re-render
        const newUserMap = new Map([...userMap]);
        newUserMap.set(userId, userData);
        setUserMap(newUserMap);
        invokeAction(mapUserData(userData));
      }
    };
    fetchUserData();
  }, [invokeAction, setUserMap, userId, userMap, connection]);
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
