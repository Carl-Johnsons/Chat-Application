import { Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faMobilePhone } from "@fortawesome/free-solid-svg-icons";
import AppButton from "../AppButton";

import style from "./LoginForm.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const LoginForm = () => {
  return (
    <Form className={cx("p-3", "p-lg-5")}>
      <div className={cx("h2", "mt-3")}>Sign In to Zalo</div>
      <div className={cx("text-muted", "mb-4")}>
        We'll never share your email with anyone else.
      </div>
      <InputGroup className={cx("mb-3")}>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faMobilePhone} />
        </InputGroup.Text>
        <Form.Control
          className={cx("shadow-none")}
          placeholder="Phone number"
        />
      </InputGroup>
      <InputGroup className={cx("mb-4")}>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faLock} />
        </InputGroup.Text>
        <Form.Control
          className={cx("shadow-none")}
          placeholder="Password"
        />
      </InputGroup>

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
          <Link to="./forgotPassword" className={cx("link-secondary")}>
            Forgot password?
          </Link>
        </Form.Group>
      </div>
      <AppButton variant="app-btn-secondary" className={cx("w-100", "mb-3")}>
        Login
      </AppButton>
    </Form>
  );
};

export default LoginForm;
