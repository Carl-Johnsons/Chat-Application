import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import {
  faArrowLeft,
  faCalendarDay,
  faEnvelope,
  faLock,
  faMobilePhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from "./RegisterForm.module.scss";
import classNames from "classnames/bind";

import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import { register as registerUser } from "@/services/auth";
import { uploadImage } from "@/services/tool";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import ErrorMessage from "@/components/shared/ErrorMessage";

const cx = classNames.bind(style);
const userSchema = yup
  .object({
    phoneNumber: yup
      .string()
      .required("Please enter phone number!")
      .matches(/^\d+$/, "Phone number only contain number")
      .length(10, "Phone number must have 10 digits")
      .typeError("Please enter valid phone number!"),
    password: yup
      .string()
      .required("Please enter password")
      .min(6, "Password length must be equal or greater than 6!")
      .max(32, "Password length must be equal or lower than 32!"),
    name: yup.string().required("Please enter your name!").min(6).max(20),
    dob: yup.string().required("Please input your DoB"),
    gender: yup.string().required("Please input your gender"),
    avatarUrl: yup
      .string()
      .notRequired()
      .default(() => images.defaultAvatarImg.src),
    backgroundUrl: yup
      .string()
      .notRequired()
      .default(() => images.defaultBackgroundImg.src),
    introduction: yup
      .string()
      .notRequired()
      .default(() => "Hello :)"),
    email: yup
      .string()
      .required("Please enter your email!")
      .email("Please enter valid email! Ex: johndoe@gmail.com"),
  })
  .required();
type UserSchema = InferType<typeof userSchema>;

interface Props {
  onClickNavigationLink?: () => void;
}

const RegisterForm = ({ onClickNavigationLink }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const [avatarFile, setAvatarFile] = useState<File>();
  const [previewAvatar, setPreviewAvatar] = useState(
    images.defaultAvatarImg.src
  );

  const fileInputRef = useRef(null);
  const onClickEditAvatar = () => {
    if (!fileInputRef.current) {
      return;
    }
    (fileInputRef.current as HTMLElement).click();
  };
  useEffect(() => {
    if (!avatarFile) {
      return;
    }

    const url = URL.createObjectURL(avatarFile);
    setPreviewAvatar(url);
    return () => {
      URL.revokeObjectURL(previewAvatar);
    };
  }, [avatarFile]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    setAvatarFile(e.target.files[0]);
  };

  const onSubmit: SubmitHandler<UserSchema> = async (data) => {
    let updatedData: UserSchema | undefined = undefined;
    if (avatarFile) {
      const [imgurImage] = await uploadImage(avatarFile);
      updatedData = {
        ...data,
        avatarUrl: imgurImage?.data.link ?? images.defaultAvatarImg.src,
      };
    }
    if (!updatedData) {
      updatedData = data;
    }
    const [isRegistered, error] = await registerUser(updatedData);
    if (isRegistered) {
      console.log("register successfully");
    } else {
      console.log("register failed: " + error);
    }
  };

  return (
    <Form
      className={cx("mt-3", "mb-3", "ms-3", "me-3", "position-relative")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        className={cx("navigate-link", "h6", "position-absolute")}
        onClick={onClickNavigationLink}
      >
        <span>
          <FontAwesomeIcon icon={faArrowLeft} />
        </span>
        <span className={cx("ms-2")}>Log in</span>
      </div>
      <div className={cx("h2", "text-blue-active", "mb-3", "text-end")}>
        Register
      </div>
      <div className={cx("p", "text-blue-active", "mb-3", "text-end")}>
        Create your account! It free and it only takes a minute
      </div>
      <div
        className={cx(
          "d-flex",
          "justify-content-between",
          "align-items-center",
          "gap-3",
          "ps-1"
        )}
      >
        <div className={cx("ps-3")}>
          <Avatar
            variant="avatar-img-80px"
            src={previewAvatar}
            alt="preview avatar"
            avatarClassName={cx("rounded-circle")}
            editable
            onClickEdit={onClickEditAvatar}
          />
          <input
            ref={fileInputRef}
            id="file-input"
            type="file"
            name="name"
            onChange={(e) => handleFileChange(e)}
            className={cx("d-none")}
          />
        </div>
        <div>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faMobilePhone} />
            </InputGroup.Text>
            <Form.Control
              className={cx("shadow-none")}
              placeholder="Phone number"
              type="phone"
              {...register("phoneNumber")}
            />
          </InputGroup>
          <ErrorMessage visible={errors.phoneNumber?.message ? true : false}>
            {errors.phoneNumber?.message}
          </ErrorMessage>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faLock} />
            </InputGroup.Text>
            <Form.Control
              className={cx("shadow-none")}
              placeholder="Password"
              type="password"
              {...register("password")}
            />
          </InputGroup>
          <ErrorMessage visible={errors.password?.message ? true : false}>
            {errors.password?.message}
          </ErrorMessage>
        </div>
      </div>

      <InputGroup>
        <InputGroup.Text>Name</InputGroup.Text>
        <Form.Control
          className={cx("shadow-none")}
          placeholder="John Doe"
          {...register("name")}
        />
      </InputGroup>
      <ErrorMessage visible={errors.name?.message ? true : false}>
        {errors.name?.message}
      </ErrorMessage>
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faEnvelope} />
        </InputGroup.Text>
        <Form.Control
          className={cx("shadow-none")}
          placeholder="johndoe@gmail.com"
          {...register("email")}
        />
      </InputGroup>
      <ErrorMessage visible={errors.email?.message ? true : false}>
        {errors.email?.message}
      </ErrorMessage>
      <div
        className={cx(
          "d-flex",
          "align-items-center",
          "justify-content-between"
        )}
      >
        <div>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faCalendarDay} />
            </InputGroup.Text>
            <Form.Control
              className={cx("shadow-none")}
              type="date"
              {...register("dob")}
            />
          </InputGroup>
          <ErrorMessage visible={errors.dob?.message ? true : false}>
            {errors.dob?.message}
          </ErrorMessage>
        </div>
        <div className={cx("text-align-right")}>
          {["Nam", "Nữ"].map((label) => (
            <Form.Check
              key={label}
              inline
              label={label}
              value={label}
              type="radio"
              id={label}
              {...register("gender")}
            />
          ))}
          <ErrorMessage visible={errors.gender?.message ? true : false}>
            {errors.gender?.message}
          </ErrorMessage>
        </div>
      </div>

      <AppButton
        variant="app-btn-secondary"
        className={cx("w-100", "mb-3")}
        type="submit"
      >
        Register
      </AppButton>
    </Form>
  );
};

export default RegisterForm;
