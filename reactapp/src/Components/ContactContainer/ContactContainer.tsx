import ContactHeader from "../ContactHeader";

import style from "./ContactContainer.module.scss";
import classNames from "classnames/bind";
import { memo } from "react";
import { useGlobalState } from "../../globalState";
import { MenuContactIndex, menuContacts } from "../../data/constants";
import ContactRow from "../ContactRow";

const cx = classNames.bind(style);

interface Props {
  className?: string;
}

const ContactContainer = ({ className }: Props) => {
  const [activeContactType] = useGlobalState("activeContactType");
  const [friendList] = useGlobalState("friendList");
  const [friendRequestList] = useGlobalState("friendRequestList");
  return (
    <>
      <div
        className={cx(
          "contact-page-header",
          "d-flex",
          "align-items-center",
          className
        )}
      >
        <ContactHeader
          image={menuContacts[activeContactType].image}
          name={menuContacts[activeContactType].name}
        />
      </div>
      <div className={cx("contact-list-container")}>
        {friendList &&
          activeContactType === MenuContactIndex.FRIEND_LIST &&
          friendList.map((friend) => {
            return (
              <ContactRow
                image={friend.friendNavigation.avatarUrl}
                name={friend.friendNavigation.name}
              />
            );
          })}
        {friendRequestList &&
          activeContactType === MenuContactIndex.FRIEND_REQUEST_LIST &&
          friendRequestList.map((friendRequest) => {
            return (
              <ContactRow
                image={friendRequest.sender.avatarUrl}
                name={friendRequest.sender.name}
              />
            );
          })}
      </div>
    </>
  );
};

export default memo(ContactContainer);
