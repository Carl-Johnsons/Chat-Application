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
    
    handleShowModal({ entityId: searchResult.userId });
  };

  return (
    <>
      {searchResult && (
        <SideBarItem
          type="searchItem"
          userId={searchResult.userId}
          searchName={searchResult.name}
          image={searchResult.avatarUrl}
          phoneNumber={searchResult.phoneNumber}
          onClick={() => handleClickSearchResult(searchResult)}
        />
      )}
    </>
  );
};

export default SearchResultContent;
