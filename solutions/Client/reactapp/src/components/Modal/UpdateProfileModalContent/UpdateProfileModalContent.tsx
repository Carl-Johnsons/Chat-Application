import { useState } from "react";

import AppButton from "@/components/shared/AppButton";

import style from "./UpdateProfileModalContent.module.scss";
import className from "classnames/bind";

import { getMaxDayinMonth, formatDateWithSeparator } from "@/utils";
import { useGetCurrentUser, useUpdateUser } from "@/hooks/queries/user";

const cx = className.bind(style);

interface Props {
  onClickCancel: () => void;
}

const UpdateProfileModalContent = ({ onClickCancel }: Props) => {
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: updateUserMutate } = useUpdateUser();

  const [name, setName] = useState(currentUser?.name ?? "");
  const [gender, setGender] = useState(() => {
    const g = currentUser?.gender;
    if (!g || g === "Male") {
      return "Male";
    }
    return "Nữ";
  });
  const date = new Date(currentUser?.dob ?? "1-1-2024");

  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth() + 1); // Get month (0-11, so +1)
  const [year, setYear] = useState(date.getFullYear());

  const currentYear = 2024;

  const dates: number[] = [];
  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years: number[] = [];
  const dateLimit: number = getMaxDayinMonth(month, year);

  const handleClickUpdate = async () => {
    if (!currentUser) {
      return;
    }
    const updatedUser = structuredClone(currentUser);
    //Call API below
    updatedUser.name = name;
    updatedUser.gender = gender;
    const formatedDob = formatDateWithSeparator(
      new Date(year, month - 1, day),
      "-"
    );
    updatedUser.dob = formatedDob;
    updateUserMutate({ user: updatedUser });
    onClickCancel();
  };

  for (let i: number = 1; i <= dateLimit; i++) {
    dates.push(i);
  }
  for (let i: number = currentYear - 121; i <= currentYear; i++) {
    years.push(i);
  }
  return (
    <div className={cx("update-profile-modal-content", "m-0")}>
      <div className={cx("user-name", "mt-2", "mb-4")}>
        <label className={cx("mb-1")}>Tên hiển thị</label>
        <input
          className={cx("form-control", "p-2", "w-100")}
          type="text"
          defaultValue={name}
          onBlur={(e) => setName(e.target.value)}
          name="txtUsername"
        />
      </div>
      <div
        className={cx(
          "personal-information-container",
          "d-flex",
          "flex-column"
        )}
      >
        <div className={cx("personal-information-row", "mb-3", "fw-medium")}>
          Thông tin cá nhân
        </div>

        <div className={cx("personal-information-row", "mb-3")}>
          <div className={cx("row-detail")}>
            <input
              className={cx("form-check-input", "me-3")}
              type="radio"
              value="Nam"
              name="rdoGender"
              id="radio-gender-male"
              defaultChecked={gender === "Nam"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label
              className={cx("form-check-label")}
              htmlFor="radio-gender-male"
            >
              Nam
            </label>
          </div>
          <div className={cx("row-detail")}>
            <input
              className={cx("form-check-input", "me-3")}
              type="radio"
              value="Nữ"
              name="rdoGender"
              id="radio-gender-female"
              defaultChecked={gender === "Nữ"}
              onChange={(e) => setGender(e.target.value)}
            />
            <label
              className={cx("form-check-label")}
              htmlFor="radio-gender-female"
            >
              Nữ
            </label>
          </div>
          <div className={cx("row-detail")}></div>
          <div className={cx("row-detail")}></div>
        </div>

        <div className={cx("personal-information-row")}>
          <div className={cx("row-name", "mb-1")}>Ngày sinh</div>
        </div>
        <div className={cx("personal-information-row")}>
          <div
            className={cx(
              "row-detail input-date",
              "w-100",
              "d-flex",
              "justify-content-between",
              "column-gap-2"
            )}
          >
            <select
              className={cx("form-select")}
              name="date"
              defaultValue={day}
              onChange={(e) => {
                setDay(parseInt(e.target.value));
              }}
            >
              {dates.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <select
              className={cx("form-select")}
              name="month"
              defaultValue={month}
              onChange={(e) => {
                setMonth(parseInt(e.target.value));
              }}
            >
              {months.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <select
              className={cx("form-select")}
              name="year"
              defaultValue={year}
              onChange={(e) => {
                setYear(parseInt(e.target.value));
              }}
            >
              {years.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className={cx("container-divider-2px", "ms-0", "me-0")}></div>
      <div className={cx("footer", "mb-3", "d-flex", "justify-content-end")}>
        <AppButton
          variant="app-btn-primary"
          className={cx("fw-medium", "me-2")}
          onClick={onClickCancel}
        >
          Hủy
        </AppButton>
        <AppButton
          variant="app-btn-secondary"
          className={cx("fw-medium")}
          onClick={handleClickUpdate}
        >
          Cập nhật
        </AppButton>
      </div>
    </div>
  );
};

export default UpdateProfileModalContent;
