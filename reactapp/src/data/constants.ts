import images from "../assets";

interface MenuContact {
  image: string;
  name: string;
  isActive?: boolean;
}

enum MenuContactIndex {
  FRIEND_LIST = 0,
  GROUP_LIST = 1,
  FRIEND_REQUEST_LIST = 2,
}

const menuContacts: MenuContact[] = [
  { image: images.userSolid, name: "Danh sách bạn bè" },
  { image: images.userGroupSolid, name: "Danh sách nhóm" },
  { image: images.envelopeOpenRegular, name: "Lời mời kết bạn" },
];

export { menuContacts, MenuContactIndex };
