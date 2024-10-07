import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef } from "react";
import ReactImageGallery from "react-image-gallery";

import AppButton from "../AppButton";
import classNames from "classnames/bind";
import style from "./AppImageGallery.module.scss";

const cx = classNames.bind(style);

interface Props {
  images?: {
    original: string;
    thumbnail: string;
  }[];
  currentImageIndex?: number;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppImageGallery = ({
  images = [],
  currentImageIndex = 0,
  show = false,
  setShow,
}: Props) => {
  const imageGalleryRef = useRef<ReactImageGallery>(null);

  const handleClickCloseImageGalleryBtn = useCallback(() => {
    setShow(false);
  }, [setShow]);

  useEffect(() => {
    if (show && currentImageIndex !== null && imageGalleryRef.current) {
      imageGalleryRef.current.slideToIndex(currentImageIndex);
    }
  }, [show, currentImageIndex]);

  return (
    <>
      {show && (
        <div
          className={cx(
            "image-gallery-container",
            "position-absolute",
            "d-flex",
            "flex-column"
          )}
        >
          <AppButton
            className={cx(
              "align-self-end",
              "image-gallery-close-btn",
              "text-white",
              "bg-transparent"
            )}
            onClick={handleClickCloseImageGalleryBtn}
          >
            <FontAwesomeIcon icon={faClose} />
          </AppButton>
          <ReactImageGallery
            ref={imageGalleryRef}
            infinite={false}
            items={images}
            showFullscreenButton={false}
            showPlayButton={false}
            thumbnailPosition="right"
            slideDuration={250}
          />
        </div>
      )}
    </>
  );
};

export { AppImageGallery };
