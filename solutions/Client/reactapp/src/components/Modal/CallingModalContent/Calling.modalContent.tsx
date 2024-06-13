import { CallingContainer } from "@/components/CallView/CallingContainer";
import style from "./Calling.modalContent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const CallingModalContent = () => {
  return (
    <div className={cx("calling-modal", "p-3")}>
      <CallingContainer />
    </div>
  );
};

export { CallingModalContent };
