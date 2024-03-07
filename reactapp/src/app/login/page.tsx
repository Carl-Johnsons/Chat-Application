"use client";

import images from "@/assets";
import LoginForm from "@/components/Auth/LoginForm";
import RegisterForm from "@/components/Auth/RegisterForm";

const Login = () => {
  return (
    <div
      style={{ backgroundImage: `url(${images.backgroundAuthForm.src})` }}
      className={
        "container-fluid p-0 d-flex justify-content-center align-items-center w-100 h-100"
      }
    >
      <div className={"d-flex ms-xxs me-xxs rounded-5 overflow-hidden shadow-lg"}>
        {/* <div
          className={
            "flex-1 d-flex justify-content-center align-items-center bg-light bg-opacity-75"
          }
        >
          <LoginForm />
        </div> */}
        <div
          className={
            "flex-1 d-none d-md-flex justify-content-center align-items-end bg-primary bg-opacity-25"
          }
        >
          <img
            src={images.peopleMessaging.src}
            alt="zalo logo"
            className={"w-100 h-75 object-fit-cover"}
          />
        </div>
        <div
          className={
            "flex-1 d-flex justify-content-center align-items-center bg-light bg-opacity-75"
          }
        >
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
