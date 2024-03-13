"use client";
import { useState } from "react";

import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";

import images from "@/assets";
import style from "./auth.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);

const Login = () => {
  const [formActive, setFormActive] = useState(0);

  return (
    <div
      style={{
        backgroundImage: `url(${images.backgroundAuthForm.src})`,
      }}
      className={
        "container-fluid p-0 d-flex justify-content-center align-items-center w-100 h-100"
      }
    >
      <div
        className={cx(
          "form-container",
          "d-flex",
          "ms-xxs",
          "me-xxs",
          "rounded-5",
          "overflow-hidden",
          "shadow-lg",
          "position-relative"
        )}
      >
        <div
          className={cx(
            "d-flex",
            "justify-content-center",
            "align-items-center",
            "bg-light",
            "bg-opacity-75",
            "position-absolute",
            formActive === 0 ? "active" : ""
          )}
          id={cx("login-form")}
        >
          <LoginForm onClickNavigationLink={() => setFormActive(1)} />
        </div>
        <div
          className={cx(
            "d-none",
            "d-md-flex",
            "justify-content-center",
            "align-items-end",
            "bg-primary",
            "bg-opacity-25",
            "position-absolute"
          )}
          id={cx("banner-img")}
        >
          <img
            src={images.peopleMessaging.src}
            alt="zalo logo"
            className={"w-100 h-75 object-fit-cover"}
          />
        </div>
        <div
          className={cx(
            "d-flex",
            "justify-content-center",
            "align-items-center",
            "bg-light",
            "bg-opacity-75",
            "position-absolute",
            formActive === 1 ? "active" : ""
          )}
          id={cx("register-form")}
        >
          <RegisterForm onClickNavigationLink={() => setFormActive(0)} />
        </div>
      </div>
    </div>
  );
};

export default Login;
