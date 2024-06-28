import { Dispatch, SetStateAction, useEffect, useState } from "react";
import style from "./TagInput.container.module.scss";
import classNames from "classnames/bind";
import { useGetTags } from "@/hooks/queries/post";
import { BaseTag, Tag } from "@/models";
import { AppTag, AppTagInput } from "@/components/shared";
import AppButton from "@/components/shared/AppButton";

interface Props {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
}

const cx = classNames.bind(style);

const TagInputContainer = ({ tags, setTags }: Props) => {
  const { data: tagsData } = useGetTags();
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<BaseTag[]>([]);

  const handleAddition = (tag: BaseTag) => {
    const isDuplicate = tags.some(
      (existingTag) =>
        existingTag.id === tag.id || existingTag.value === tag.value
    );
    if (isDuplicate) {
      return;
    }

    setTags([
      ...tags,
      {
        id: tag.id,
        value: tag.value,
        code: "",
      },
    ]);
  };

  const handleDelete = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onClearAll = () => {
    setInputValue("");
    setTags([]);
  };

  useEffect(() => {
    if (tagsData) {
      setFilteredSuggestions(
        tagsData.filter(
          (suggestion) =>
            !tags.some(
              (tag) =>
                tag.id === suggestion.id || tag.value === suggestion.value
            )
        ) ?? []
      );
    }
  }, [tagsData, tags]);

  return (
    <div>
      <div className={cx("d-flex", "justify-content-between", "mt-2", "mb-2")}>
        Tags
        {tags.length !== 0 && (
          <AppButton variant="app-btn-secondary" onClick={onClearAll}>
            Clear all tags
          </AppButton>
        )}
      </div>
      <div>
        <AppTagInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAddition={handleAddition}
          suggestions={filteredSuggestions ?? []}
          className={cx("form-control")}
          reverseSuggestion
          strictSuggestion
        />
      </div>
      <div className={cx("tags-container", "d-flex", "flex-wrap")}>
        {tags.map((tag, index) => {
          return (
            <AppTag
              key={index}
              onClickCancel={() => handleDelete(index)}
              className={cx("me-1", "mt-2")}
              value={tag.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export { TagInputContainer };
