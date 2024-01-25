import LoginForm from "../../Components/LoginForm";
import ModalContainer from "../../Components/ModalContainer";
import images from "../../assets";
import style from "./Login.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const Login = () => {
  return (
    <div
      style={{ backgroundImage: `url(${images.backgroundAuthForm})` }}
      className={cx(
        "container-fluid",
        "p-0",
        "d-flex",
        "justify-content-center",
        "align-items-center",
        "w-100",
        "h-100"
      )}
    >
      <div
        className={cx(
          "d-flex",
          "w-75",
          "h-75",
          "rounded-5",
          "overflow-hidden",
          "shadow-lg"
        )}
      >
        <div
          className={cx(
            "left",
            "flex-grow-1",
            "d-flex",
            "justify-content-center",
            "align-items-center",
            "bg-light",
            "bg-opacity-75"
          )}
        >
          <LoginForm />
        </div>
        <div
          className={cx(
            "right",
            "flex-grow-1",
            "d-none",
            "d-md-flex",
            "justify-content-center",
            "align-items-end",
            "bg-primary",
            "bg-opacity-25"
          )}
        >
          <img
            src={images.peopleMessaging}
            alt="zalo logo"
            className={cx("w-100", "h-75", "object-fit-cover")}
          />
        </div>
      </div>
      <ModalContainer />
    </div>
  );
};

export default Login;
