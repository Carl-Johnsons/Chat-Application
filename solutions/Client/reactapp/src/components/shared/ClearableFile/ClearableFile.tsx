import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import AppButton from "../AppButton";
import Skeleton from "react-loading-skeleton";
import Box from "../Box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import images from "@/assets";

import style from "./ClearableFile.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

interface Props {
  className?: string;
  blob: File;
  onClickCancel?: () => void;
}

const ClearableFile = ({
  className,
  blob,
  onClickCancel = () => {},
}: Props) => {
  //aspect ratio 16:9
  const minDimension = {
    width: 560,
    height: 315,
  };

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [blob]);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) {
      return;
    }
    img.onload = () => {
      setDimensions({
        width:
          img.naturalWidth < minDimension.width
            ? minDimension.width
            : img.naturalWidth,
        height:
          img.naturalHeight < minDimension.height
            ? minDimension.height
            : img.naturalHeight,
      });
    };
  }, [minDimension.height, minDimension.width]);

  return (
    <div
      className={cx(
        "file-container",
        "position-relative",
        "d-flex",
        "flex-column",
        "rounded-3",
        className
      )}
    >
      <div
        className={cx("cancel-btn-container", "d-flex", "justify-content-end")}
      >
        <AppButton
          className={cx(
            "cancel-btn",
            "rounded-circle",
            "p-0",
            "d-flex",
            "justify-content-center",
            "align-items-center"
          )}
          onClick={onClickCancel}
        >
          <FontAwesomeIcon className={cx("w-75", "h-75")} icon={faXmark} />
        </AppButton>
      </div>

      <div className={cx("file-display-container", "overflow-hidden")}>
        <Image
          alt={"file"}
          src={previewUrl ?? images.defaultAvatarImg}
          className={cx(
            "file",
            !isImageLoaded ? " opacity-0" : " opacity-100"
          )}
          ref={imgRef}
          width={dimensions.width}
          height={dimensions.height}
          loading="lazy"
          draggable="false"
          onLoad={() => setIsImageLoaded(true)}
        />
        {!isImageLoaded && (
          <Box style={{ position: "absolute" }}>
            <Skeleton
              circle
              width={dimensions.width}
              height={dimensions.height}
              count={1}
              className="d-block lh-1"
            />
          </Box>
        )}
      </div>
    </div>
  );
};

export { ClearableFile };
