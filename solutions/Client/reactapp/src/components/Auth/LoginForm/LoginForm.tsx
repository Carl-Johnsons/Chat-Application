import { Form, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import * as yup from "yup";
import { InferType } from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  faArrowRight,
  faLock,
  faMobilePhone,
} from "@fortawesome/free-solid-svg-icons";
import AppButton from "@/components/shared/AppButton";

import style from "./LoginForm.module.scss";
import classNames from "classnames/bind";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { useLogin } from "@/hooks/queries/auth";

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
  })
  .required();
type UserSchema = InferType<typeof userSchema>;
interface Props {
  onClickNavigationLink?: () => void;
}

const LoginForm = ({ onClickNavigationLink }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  // const { mutate: loginMutate } = useLogin();

  const onSubmit: SubmitHandler<UserSchema> = async ({
    phoneNumber,
    password,
  }) => {
    // loginMutate({ phoneNumber, password });
  };

  return (
    <Form
      className={cx("me-3", "pt-3", "ps-5", "pe-5", "position-relative")}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div
        onClick={onClickNavigationLink}
        className={cx("navigate-link", "h6", "position-absolute")}
      >
        <span className={cx("me-2")}> Register</span>
        <span>
          <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </div>
      <div className={cx("h2", "mt-3")}>Sign In to Zalo</div>
      <div className={cx("text-muted", "mb-4")}>
        We&apos;ll never share your email with anyone else.
      </div>
      <InputGroup>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faMobilePhone} />
        </InputGroup.Text>
        <Form.Control
          className={cx("shadow-none")}
          placeholder="Phone number"
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
          {...register("password")}
        />
      </InputGroup>
      <ErrorMessage visible={errors.password?.message ? true : false}>
        {errors.password?.message}
      </ErrorMessage>
      <div
        className={cx(
          "d-flex",
          "justify-content-between",
          "align-items-between",
          "flex-column",
          "flex-xl-row",
          "mb-5"
        )}
      >
        <Form.Group controlId="cbRemmber">
          <Form.Check type="checkbox" label="Remmember me" />
        </Form.Group>
        <Form.Group>
          <Link href="./forgotPassword" className={cx("link-secondary")}>
            Forgot password?
          </Link>
        </Form.Group>
      </div>
      <AppButton
        variant="app-btn-secondary"
        className={cx("w-100", "mb-3")}
        type="submit"
      >
        Login
      </AppButton>
    </Form>
  );
};

export default LoginForm;
