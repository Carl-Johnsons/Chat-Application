import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AppButton from "@/components/shared/AppButton";
import { useGlobalState } from "hooks/globalState";
import { useGetGroupUserByGroupId } from "@/hooks/queries/group";
import { useGetUsers } from "@/hooks/queries/user";

import styles from "./ListingGroupMember.modalContent.module.scss";
import classNames from "classnames/bind";
import Avatar from "@/components/shared/Avatar";

interface Props {
  onClickMember?: (memberId: number) => void;
}

const cx = classNames.bind(styles);

const ListGroupMemberModalContent = ({ onClickMember = () => {} }: Props) => {
  const [modalEntityId] = useGlobalState("modalEntityId");
  const [modalType] = useGlobalState("modalType");
  const { data: groupUserData } = useGetGroupUserByGroupId(modalEntityId);

  const userIdList =
    modalType === "Group"
      ? groupUserData?.flatMap((gu) => gu.userId) ?? []
      : [];
  const userListQuery = useGetUsers(userIdList, {
    enabled: userIdList?.length > 0,
  });
  return (
    <div className={cx("list-group-member-content", "m-0", "ps-3", "pe-3")}>
      <div className={cx("mt-3", "mb-3")}>
        <AppButton
          variant="app-btn-tertiary"
          className={cx(
            "d-flex",
            "justify-content-center",
            "align-items-center",
            "w-100"
          )}
        >
          <FontAwesomeIcon icon={faUserPlus} className={cx("me-2")} />
          <div className={cx("fw-medium")}>Thêm thành viên</div>
        </AppButton>
      </div>
      <div className={cx("fw-medium", "mb-1")}>
        Danh sách thành viên: &#40;{userIdList?.length}&#41;
      </div>
      <div>
        {userListQuery.map((query) => {
          const user = query.data;

          return (
            <>
              {user && (
                <AppButton
                  variant="app-btn-primary-transparent"
                  className={cx(
                    "d-flex",
                    "align-items-center",
                    "pt-2",
                    "pb-2",
                    "w-100"
                  )}
                  onClick={() => onClickMember(user.userId)}
                >
                  <Avatar
                    src={user.avatarUrl}
                    alt="user avatar"
                    className={cx("me-2")}
                    avatarClassName={cx("rounded-circle")}
                  />
                  <div>{user.name}</div>
                </AppButton>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListGroupMemberModalContent;
