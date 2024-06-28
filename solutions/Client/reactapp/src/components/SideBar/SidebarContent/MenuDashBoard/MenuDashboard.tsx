import images from "@/assets";
import { MenuItem } from "@/components/shared";
import { useGlobalState } from "@/hooks";
import React from "react";

interface MenuItemProps {
  icon: string;
  title: string;
}

const MenuDashboard = () => {
  const [activeDashboardType, setActiveDashboardType] = useGlobalState(
    "activeDashboardType"
  );

  const handleClick = (index: number) => {
    setActiveDashboardType(index);
  };

  const menuItems: MenuItemProps[] = [
    { icon: images.userSolid.src, title: "Quản lý người dùng" },
    { icon: images.postSolid.src, title: "Quản lý post" },
  ];

  return (
    <>
      {menuItems.map((item, index) => {
        const { icon, title } = item;
        return (
          <MenuItem
            key={index}
            image={icon}
            name={title}
            isActive={activeDashboardType === index}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </>
  );
};

export { MenuDashboard };
