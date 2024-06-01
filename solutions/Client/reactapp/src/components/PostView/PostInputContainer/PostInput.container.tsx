import React, { useCallback, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import style from "./PostInput.container.module.scss";
import classNames from "classnames/bind";
import { EditorEvent } from "tinymce";
import AppButton from "@/components/shared/AppButton";
import { ClearableFile } from "@/components/shared";

const cx = classNames.bind(style);

const PostInputContainer = () => {
  const [blobs, setBlobs] = useState<File[]>([]);

  const plugins = ["lists", "code", "table", "codesample", "link"];
  const toolbar =
    "blocks | bold italic underline strikethrough bullist link codesample";
  const handleDragDrop = useCallback(() => {
    alert("drag and drop");
  }, []);

  const handleCancel = (blob: File) => {
    setBlobs((prev) => {
      prev = prev.filter((b) => b !== blob);
      return prev;
    });
  };

  const handleCancelAll = () => {
    setBlobs([]);
  };

  const handlePaste = (e: EditorEvent<ClipboardEvent>) => {
    const clipboardData = e.clipboardData;
    const items = clipboardData?.items;
    if (!items) {
      return;
    }
    const newBlob: File[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemType = item.type;
      if (itemType.startsWith("image/")) {
        const blob = item.getAsFile();
        blob && newBlob.push(blob);
      }

      if (
        itemType.startsWith("video/") ||
        itemType.startsWith("application/")
      ) {
        const blob = item.getAsFile();
        if (blob) {
          console.log("hello world");
          console.log({ blob });
        }
      }
      console.log(`Item ${i}:`, item);
      console.log(`Type: ${itemType}`);
    }
    setBlobs((prev) => [...prev, ...newBlob]);
    return () => {
      setBlobs([]);
    };
  };

  return (
    <>
      <div className={cx("text-editor-container")}>
        <Editor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          onDragDrop={handleDragDrop}
          init={{
            plugins: plugins,
            skin: "jam",
            icons: "jam",
            toolbar_location: "bottom",
            menubar: false,
            toolbar: toolbar,
            smart_paste: false,
            paste_data_images: false,
            setup: (editor) => {
              editor.on("paste", handlePaste);
            },
          }}
          initialValue="Write your thought!"
          onExecCommand={(e) => {
            console.log(`The ${e.command} command was fired.`);
          }}
        />
      </div>
      <div>
        <div
          className={cx(
            "preview-file-btn-container",
            "d-flex",
            "justify-content-end",
            "mb-2",
            "mt-2"
          )}
        >
          {blobs.length > 0 && (
            <AppButton variant="app-btn-secondary" onClick={handleCancelAll}>Clear all file</AppButton>
          )}
        </div>
        <div
          className={cx(
            "preview-file-container",
            "d-flex",
            "flex-column",
            "align-items-center"
          )}
        >
          {blobs.map((blob, index) => {
            return (
              <ClearableFile
                className={cx("mb-3", "pt-1")}
                key={index}
                blob={blob}
                onClickCancel={() => handleCancel(blob)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export { PostInputContainer };
