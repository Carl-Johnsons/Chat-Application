import ContactRow from "@/components/ContactView/ContactRow";
import { useModal } from "hooks/useModal";
import style from "./UserManagement.container.module.scss";
import classNames from "classnames/bind";
import { AppInput } from "@/components/shared/AppInput";
import { useEffect, useState } from "react";
import { useDebounceValue } from "@/hooks";
import AppButton from "@/components/shared/AppButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import {
  useSearchInfiniteUser,
  useToggleUserStatus,
} from "@/hooks/queries/user";
import { User } from "@/models";

const cx = classNames.bind(style);

const UserManagementContainer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>([]);

  //hook
  const { mutate: toggleUserStatusMutate } = useToggleUserStatus();
  const { handleShowModal } = useModal();
  const [debouncedSearchValue, setDebouncedSearchValue] = useDebounceValue(
    "",
    300
  );

  const {
    data: infiniteUL,
    fetchNextPage: fetchNextUL,
    refetch: refetchUL,
    isFetchingNextPage: isFetchingNextUL,
  } = useSearchInfiniteUser({
    searchValue: debouncedSearchValue as string,
    limit: 8,
  });

  const totalPage = infiniteUL?.pages[0]?.data?.metadata?.totalPage || 1;

  useEffect(() => {
    setDebouncedSearchValue(searchValue);
  }, [searchValue, setDebouncedSearchValue]);

  useEffect(() => {
    if (!isFetchingNextUL) {
      setUsers(infiniteUL?.pages[currentPage - 1]?.data?.paginatedData ?? []);
    }
  }, [infiniteUL, isFetchingNextUL, currentPage]);

  const suggestions = users?.flatMap((u) => {
    return {
      id: u.id,
      value: u.name,
    };
  });

  useEffect(() => {
    refetchUL();
    setCurrentPage(1);
  }, [debouncedSearchValue]);

  const handleClickPreviousPage = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };

  const handleClickNextPage = () => {
    fetchNextUL();
    setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <div
      className={cx(
        "ps-5",
        "pe-5",
        "mb-5",
        "mt-3",
        "d-flex",
        "flex-column",
        "align-items-center"
      )}
    >
      <div className={cx("w-75")}>
        <AppInput
          inputValue={searchValue}
          setInputValue={setSearchValue}
          suggestions={suggestions}
          className={cx("form-control")}
          suggestionLimit={10}
        />
      </div>
      <div
        className={cx(
          "user-container",
          "w-100",
          "ps-5",
          "pe-5",
          "overflow-auto"
        )}
      >
        {users?.map((u, index) => (
          <ContactRow
            key={index}
            type="UserManagement"
            entityId={u.id}
            onClickBtnDetail={() => {
              handleShowModal({ entityId: u.id, modalType: "Stranger" });
            }}
            onClickDisableUser={() => {
              toggleUserStatusMutate({
                userId: u.id,
                active: false,
              });
            }}
            onClickEnableUser={() => {
              toggleUserStatusMutate({
                userId: u.id,
                active: true,
              });
            }}
          ></ContactRow>
        ))}
      </div>
      <div className={cx("paginated-btn-container", "mt-3", "d-flex", "gap-4")}>
        <AppButton
          variant="app-btn-tertiary-transparent"
          onClick={handleClickPreviousPage}
          className={cx("rounded-circle")}
          disabled={currentPage === 1}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </AppButton>
        <div>
          {currentPage}/{totalPage}
        </div>
        <AppButton
          variant="app-btn-tertiary-transparent"
          onClick={handleClickNextPage}
          className={cx("rounded-circle")}
          disabled={currentPage === totalPage}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </AppButton>
      </div>
    </div>
  );
};

export { UserManagementContainer };
