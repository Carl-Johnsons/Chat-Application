import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

import style from "./RegisterForm.module.scss";
import classNames from "classnames/bind";
import {
  faCalendarDay,
  faEnvelope,
  faLock,
  faMobilePhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import { register } from "@/services/auth";
import { UserInputForm } from "@/models";
import { uploadImage } from "@/services/tool";

const cx = classNames.bind(style);

const RegisterForm = () => {
  const [form, setForm] = useState<UserInputForm>({
    phoneNumber: "",
    password: "",
    name: "",
    dob: "",
    gender: "",
    avatarUrl: images.defaultAvatarImg.src,
    backgroundUrl: images.defaultBackgroundImg.src,
    introduction: "Hello :)",
    email: "",
  });
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

  const handleSubmit = async () => {
    let updatedForm: UserInputForm | undefined = undefined;
    if (avatarFile) {
      const [imgurImage] = await uploadImage(avatarFile);
      updatedForm = { ...form, avatarUrl: imgurImage?.data.link };
      setForm(updatedForm);
    }
    if (!updatedForm) {
      updatedForm = form;
    }
    console.log({ updatedForm });

    const [isRegistered, error] = await register(form);
    if (isRegistered) {
      console.log("register successfully");
    } else {
      console.log("register failed: " + error);
    }
  };

  return (
    <Form className={cx("p-3", "ps-md-5", "pe-md-5")}>
      <div className={cx("h1", "text-blue-active", "mb-3")}>Register</div>
      <div className={cx("p", "text-blue-active", "mb-3")}>
        Create your account! It free and it only takes a minute
      </div>
      <div className={cx("d-flex", "justify-content-between", "gap-3")}>
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
          <InputGroup className={cx("mb-3")}>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faMobilePhone} />
            </InputGroup.Text>
            <Form.Control
              className={cx("shadow-none")}
              placeholder="Phone number"
              type="phone"
              value={form.phoneNumber}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))
              }
            />
          </InputGroup>
          <InputGroup className={cx("mb-3")}>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faLock} />
            </InputGroup.Text>
            <Form.Control
              className={cx("shadow-none")}
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </InputGroup>
        </div>
      </div>

      <InputGroup className={cx("mb-3")}>
        <InputGroup.Text>Name</InputGroup.Text>
        <Form.Control
          className={cx("shadow-none")}
          placeholder="John Doe"
          value={form.name}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </InputGroup>
      <InputGroup className={cx("mb-3")}>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faEnvelope} />
        </InputGroup.Text>
        <Form.Control
          className={cx("shadow-none")}
          placeholder="johndoe@gmail.com"
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
        />
      </InputGroup>
      <InputGroup className={cx("mb-3")}>
        <InputGroup.Text>
          <FontAwesomeIcon icon={faCalendarDay} />
        </InputGroup.Text>
        <Form.Control
          className={cx("shadow-none")}
          type="date"
          value={form.dob}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, dob: e.target.value }))
          }
        />
      </InputGroup>
      <div className={cx("mb-3")}>
        {["Nam", "Nữ"].map((label) => (
          <Form.Check
            key={label}
            inline
            label={label}
            name="gender"
            type="radio"
            id={label}
            checked={form.gender === label}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, gender: e.target.id }))
            }
          />
        ))}
      </div>

      <AppButton
        variant="app-btn-secondary"
        className={cx("w-100", "mb-3")}
        onClick={handleSubmit}
      >
        Register
      </AppButton>
    </Form>
  );
};

export default RegisterForm;
