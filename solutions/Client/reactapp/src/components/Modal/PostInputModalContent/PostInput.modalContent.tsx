import { PostInputContainer } from "@/components/PostView";

import style from "./PostInput.modalContent.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
const PostInputModalContent = () => {
  return (
    <div className={cx("post-input-modal")}>
      <PostInputContainer />
    </div>
  );
};

export { PostInputModalContent };
