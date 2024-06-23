import images from "@/assets";
import { MenuItem } from "@/components/shared";
import React from "react";

interface MenuItemProps {
  icon: string;
  title: string;
}

const MenuDashboard = () => {
  const menuItems: MenuItemProps[] = [
    { icon: images.userSolid.src, title: "Quản lý post" },
    { icon: images.userGroupSolid.src, title: "Danh sách nhóm" },
  ];

  return (
    <>
      {menuItems.map((item, index) => {
        const { icon, title } = item;
        return <MenuItem key={index} image={icon} name={title} />;
      })}
    </>
  );
};

export { MenuDashboard };
