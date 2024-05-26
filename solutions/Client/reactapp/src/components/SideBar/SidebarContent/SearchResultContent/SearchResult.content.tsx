import { useGlobalState, useModal } from "@/hooks";
import { User } from "@/models";
import SideBarItem from "../../SideBarItem";

const SearchResultContent = () => {
  const [searchResult] = useGlobalState("searchResult");
  // Hook
  const { handleShowModal } = useModal();
  const handleClickSearchResult = (searchResult: User | null) => {
    if (!searchResult) {
      return;
    }

    handleShowModal({ entityId: searchResult.id });
  };

  return (
    <>
      {searchResult &&
        searchResult.map((user) => {
          const { id, name, avatarUrl, phoneNumber } = user;
          return (
            <SideBarItem
              key={id}
              type="searchItem"
              userId={id}
              searchName={name}
              image={avatarUrl}
              phoneNumber={phoneNumber}
              onClick={() => handleClickSearchResult(user)}
            />
          );
        })}
    </>
  );
};

export default SearchResultContent;
