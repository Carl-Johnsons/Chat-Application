import { Button } from "react-bootstrap";

import style from "./UpdateProfileModalContent.module.scss";
import className from "classnames/bind";
const cx = className.bind(style);

interface Props {
  handleClickCancel: () => void;
}

const UpdateProfileModalContent = ({ handleClickCancel }: Props) => {
  const currentYear = 2024;

  const dates: number[] = [];
  const dateLimit: number = 30;
  const months: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years: number[] = [];
  for (let i: number = 1; i <= dateLimit; i++) {
    dates.push(i);
  }
  for (let i: number = currentYear - 121; i <= currentYear - 14; i++) {
    years.push(i);
  }
  return (
    <>
      <div className={cx("user-name", "mt-2", "mb-4")}>
        <label className={cx("mb-1")}>Tên hiển thị</label>
        <input
          className={cx("form-control", "p-2", "w-100")}
          type="text"
          defaultValue="Đức"
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
            <select className={cx("form-select")} name="date">
              {dates.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <select className={cx("form-select")} name="month">
              {months.map((value) => {
                return (
                  <option key={value} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
            <select className={cx("form-select")} name="year">
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
        <Button
          variant="default"
          className={cx("modal-btn", "fw-medium", "me-2")}
          onClick={handleClickCancel}
        >
          Hủy
        </Button>
        <Button
          variant="default"
          className={cx("modal-btn-secondary", "fw-medium")}
        >
          Cập nhật
        </Button>
      </div>
    </>
  );
};

export default UpdateProfileModalContent;
