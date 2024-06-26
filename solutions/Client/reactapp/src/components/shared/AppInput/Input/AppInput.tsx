import style from "./AppInput.module.scss";
import classNames from "classnames/bind";
import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useRef,
  KeyboardEvent,
  useState,
  useEffect,
} from "react";
import { KEYBOARD_KEY } from "data/constants";

const cx = classNames.bind(style);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  // Required
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  // Optional
  wrapperClassName?: string;
  suggestions?: Array<{ id: string; value: string }>;
  triggerKeys?: string[];
  suggestionLimit?: number;
  disableSuggestion?: boolean;
  strictSuggestion?: boolean;
  reverseSuggestion?: boolean;
  onTrigger?: (...args: any[]) => void;
}

const AppInput = ({
  wrapperClassName = "",
  suggestions = [],
  triggerKeys = [KEYBOARD_KEY.ENTER],
  inputValue,
  suggestionLimit = 5,
  disableSuggestion = false,
  strictSuggestion = false,
  reverseSuggestion = false,
  onTrigger = () => {},
  setInputValue,
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

    if (focusedSuggestionIndex >= 0 && suggestions[focusedSuggestionIndex]) {
      const selectedSuggestion = suggestions[focusedSuggestionIndex];
      if (!strictSuggestion) {
        setInputValue(selectedSuggestion.value);
      }
      onTrigger({
        ...selectedSuggestion,
      });

      setIsFocused(false);
      inputRef.current?.blur();
      return;
    }

    if (!strictSuggestion) {
      onTrigger({
        id: "",
        value: inputValue,
      });
      setInputValue(inputValue);
      return;
    }
    console.log("here1");

    const objectMatch = suggestions.filter((s) => s.value === inputValue)?.[0];
    onTrigger({
      ...objectMatch,
    });
    setInputValue(objectMatch.value);
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
    <div className={cx(wrapperClassName, "position-relative")}>
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
            console.log("Input blur");
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
            "shadow-lg",
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
            if (index > suggestionLimit) {
              return;
            }
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
                      "p-2",
                      "ps-3",
                      "pe-3",
                      isFocusedSuggestion && "focus"
                    )}
                    onClick={() => {
                      setInputValue(value);
                      onTrigger({
                        id,
                        value,
                      });
                      setIsFocused(false);
                      inputRef.current?.blur();
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

export { AppInput };
