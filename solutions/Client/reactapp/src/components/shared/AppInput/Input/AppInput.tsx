import { BaseTag } from "@/models";
import style from "./AppInput.module.scss";
import classNames from "classnames/bind";
import {
  Dispatch,
  InputHTMLAttributes,
  SetStateAction,
  useRef,
  KeyboardEvent,
} from "react";
import { KEYBOARD_KEY } from "data/constants";

const cx = classNames.bind(style);

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
  suggestions?: Array<BaseTag>;
  triggerKeys?: string[];
  inputValue: string;
  onTrigger?: (...args: any[]) => void;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const AppInput = ({
  wrapperClassName = "",
  suggestions = [],
  triggerKeys = [KEYBOARD_KEY.ENTER],
  inputValue,
  onTrigger = () => {},
  setInputValue,
  ...props
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // Custom binding key
    if (!triggerKeys.includes(e.key)) {
      return;
    }
    onTrigger();
    setInputValue("");
  };

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
      />
    </div>
  );
};

export { AppInput };
