import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import classNames from "classnames/bind";

import { useGetCurrentUser, useUpdateUser } from "@/hooks/queries/user";
import { useModal } from "hooks/useModal";
import AppButton from "@/components/shared/AppButton";
import Avatar from "@/components/shared/Avatar";
import images from "@/assets";
import style from "./UpdateAvatarModalContent.module.scss";

const cx = classNames.bind(style);

const UpdateAvatarModalContent = () => {
  const { data: userData } = useGetCurrentUser();
  const { mutate: updateUserMutate } = useUpdateUser();
  const [avatarBlob, setAvatarBlob] = useState<Blob>();
  const [previewImg, setPreviewImg] = useState<string>();
  const { handleHideModal } = useModal();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarBlob(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      // Read image as base 64 as preview img
      reader.readAsDataURL(file);
    }
  };

  const currentAvatar = userData?.avatarUrl || images.defaultAvatarImg.src;
  const previewAvatar = previewImg || images.defaultAvatarImg.src;

  const handleUpdateBtnClick = useCallback(() => {
    updateUserMutate({
      user: {
        avatarFile: avatarBlob,
      },
    });
    handleHideModal();
  }, [avatarBlob, handleHideModal, updateUserMutate]);

  return (
    <div className={cx("update-avatar-modal-content", "m-0", "p-2", "pb-3")}>
      <div className={cx("mt-4", "mb-4")}>
        <label
          className={cx(
            "custom-file-upload",
            "w-100",
            "fw-medium",
            "d-flex",
            "justify-content-center"
          )}
        >
          <input
            className={cx("file-input")}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          Tải lên từ máy tính
        </label>
      </div>
      <div className={cx("fw-medium", "mb-3")}>Ảnh đại diện của tôi</div>
      <div
        className={cx(
          "d-flex",
          "justify-content-around",
          "align-items-center",
          "mb-3"
        )}
      >
        <div>
          <Avatar
            variant="avatar-img-80px"
            avatarClassName={cx("rounded-circle")}
            src={currentAvatar}
            alt="avatar image"
          />
        </div>
        {avatarBlob && (
          <>
            <div>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
            <div>
              <Avatar
                variant="avatar-img-80px"
                avatarClassName={cx("rounded-circle")}
                src={previewAvatar}
                alt="avatar image"
              />
            </div>
          </>
        )}
      </div>
      {avatarBlob && (
        <div>
          <AppButton
            variant="app-btn-tertiary"
            className={cx("w-100", "fw-medium")}
            onClick={() => handleUpdateBtnClick()}
          >
            Cập nhật
          </AppButton>
        </div>
      )}
    </div>
  );
};

export { UpdateAvatarModalContent };
