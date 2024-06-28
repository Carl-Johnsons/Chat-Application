import { BaseTag } from "@/models";
import style from "./AppTagInput.module.scss";
import classNames from "classnames/bind";
import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useRef,
  useState,
  KeyboardEvent,
  useEffect,
} from "react";
import { KEYBOARD_KEY } from "data/constants";

const cx = classNames.bind(style);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  suggestions?: Array<BaseTag>;
  reverseSuggestion?: boolean;
  strictSuggestion?: boolean;
  disableSuggestion?: boolean;
  triggerKeys?: string[];
  suggestionLimit?: number;

  onAddition?: (tag: BaseTag) => void;

  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setSuggestionObject?: Dispatch<SetStateAction<BaseTag | undefined>>;
}

const AppTagInput = ({
  wrapperClassName = "",
  suggestions = [],
  reverseSuggestion = false,
  inputValue,
  triggerKeys = [KEYBOARD_KEY.ENTER],
  strictSuggestion,
  disableSuggestion,
  suggestionLimit = 5,
  onAddition = () => {},
  setInputValue,
  setSuggestionObject = () => {},
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSuggestionHover, setIsSuggestionHover] = useState(false);
  const [focusedSuggestionIndex, setFocusedSuggestionIndex] =
    useState<number>(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYBOARD_KEY.DOWN_ARROW) {
      setFocusedSuggestionIndex((prevIndex) =>
        Math.min(prevIndex + 1, suggestions.length - 1)
      );
      return;
    }
    if (e.key === KEYBOARD_KEY.UP_ARROW) {
      setFocusedSuggestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      return;
    }
    // Custom binding key
    if (!triggerKeys.includes(e.key)) {
      return;
    }

    if (!strictSuggestion) {
      onAddition({
        id: "",
        value: inputValue,
      });
      return;
    }
    if (focusedSuggestionIndex >= 0 && suggestions[focusedSuggestionIndex]) {
      const selectedSuggestion = suggestions[focusedSuggestionIndex];
      if (!strictSuggestion) {
        setInputValue(selectedSuggestion.value);
      }
      setSuggestionObject(selectedSuggestion);
      onAddition({
        id: selectedSuggestion.id,
        value: selectedSuggestion.value,
      });
      setIsFocused(true);
      inputRef.current?.focus();
      return;
    }
    const tagMatch = suggestions.filter((s) => s.value === inputValue)?.[0];
    tagMatch && onAddition(tagMatch);
  };

  useEffect(() => {
    if (
      focusedSuggestionIndex >= 0 &&
      focusedSuggestionIndex < suggestionRefs.current.length
    ) {
      suggestionRefs.current[focusedSuggestionIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [focusedSuggestionIndex]);

  return (
    <div
      className={cx(wrapperClassName, "position-relative")}
      onBlur={() => {
        if (!isSuggestionHover) {
          setIsFocused(false);
        }
      }}
    >
      <input
        {...props}
        ref={inputRef}
        value={inputValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          if (!isSuggestionHover) {
            setIsFocused(false);
          }
        }}
      />
      {!disableSuggestion && isFocused && (
        <div
          className={cx(
            "suggestion-container",
            "position-absolute",
            "bg-white",
            "w-100",
            "z-3",
            reverseSuggestion && "bottom-100"
          )}
          onMouseEnter={() => {
            setIsSuggestionHover(true);
          }}
          onMouseLeave={() => {
            setIsSuggestionHover(false);
          }}
        >
          {suggestions.map((suggestion, index) => {
            const { id, value } = suggestion;
            const isMatch =
              value.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;

            const isFocusedSuggestion = index === focusedSuggestionIndex;
            return (
              <div key={index}>
                {isMatch && (
                  <div
                    ref={(el) => (suggestionRefs.current[index] = el)}
                    className={cx(
                      "input-suggestion",
                      "p-1",
                      isFocusedSuggestion && "focus"
                    )}
                    onClick={() => {
                      setInputValue(value);
                      setSuggestionObject(suggestion);
                      onAddition({
                        id,
                        value,
                      });
                      setIsFocused(true);
                      inputRef.current?.focus();
                    }}
                  >
                    {value}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export { AppTagInput };
