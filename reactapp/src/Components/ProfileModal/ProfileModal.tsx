import { Button, Modal } from "react-bootstrap";

import images from "../../assets";
import style from "./ProfileModal.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  show: boolean;
  handleClose: () => void;
}
const ProfileModal = ({ show, handleClose }: Props) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className={cx("info-modal")}
        centered
        role="dialog"
      >
        <Modal.Header className={cx("modal-header")}>
          <Modal.Title>Thông tin cá nhân</Modal.Title>
          <Button
            className={cx("btn-close close")}
            data-dismiss="modal"
            onClick={handleClose}
          ></Button>
        </Modal.Header>
        <Modal.Body className={cx("modal-body")}>
          <div className={cx("background-img-container")}>
            <img draggable="false" src={images.defaultBackgroundImg} />
          </div>
          <div className={cx("avatar-img-container")}>
            <img
              className={cx("avatar-icon")}
              draggable="false"
              src={images.defaultAvatarImg}
            />
          </div>
          <div className={cx("user-name")}>
            <p>Javamismknownmformitsmportabilitymandmstrongmcomms</p>
          </div>

          <div className={cx("personal-information-container")}>
            <div className={cx("personal-information-row")}>
              Thông tin cá nhân
            </div>
            <div className={cx("personal-information-row")}>
              <div className={cx("personal-information-row-name")}>
                Điện thoại
              </div>
              <div className={cx("personal-information-row-detail")}>
                +84123456789
              </div>
            </div>

            <div className={cx("personal-information-row")}>
              <div className={cx("personal-information-row-name")}>
                Giới tính
              </div>
              <div className={cx("personal-information-row-detail")}>Nam</div>
            </div>

            <div className={cx("personal-information-row")}>
              <div className={cx("personal-information-row-name")}>
                Ngày sinh
              </div>
              <div className={cx("personal-information-row-detail")}>
                Ngày 01 tháng 01, 2000
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className={cx("modal-footer")}>
          <Button variant="default" className={cx("btn-update-information")}>
            Cập nhật thông tin
          </Button>
          <Button variant="default" className={cx("btn-add-friend")}>
            Kết bạn
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileModal;
