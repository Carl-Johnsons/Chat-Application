import React, { useCallback, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import style from "./PostInput.container.module.scss";
import classNames from "classnames/bind";
import { EditorEvent } from "tinymce";
import AppButton from "@/components/shared/AppButton";

const cx = classNames.bind(style);

const PostInputContainer = () => {
  const [previewSrc, setPreviewSrc] = useState<string[]>([]);

  const plugins = ["lists", "code", "table", "codesample", "link"];
  const toolbar =
    "blocks | bold italic underline strikethrough bullist link codesample";
  const handleDragDrop = useCallback(() => {
    alert("drag and drop");
  }, []);

  const handlePaste = (e: EditorEvent<ClipboardEvent>) => {
    const clipboardData = e.clipboardData;
    const items = clipboardData?.items;
    if (!items) {
      return;
    }
    const newPreviews: string[] = previewSrc;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemType = item.type;
      if (itemType.startsWith("image/")) {
        const blob = item.getAsFile();
        if (blob) {
          const url = URL.createObjectURL(blob);
          newPreviews.push(url);
        }
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
    // Update the previewSrc state with new URLs
    setPreviewSrc((prev) => [...prev, ...newPreviews]);
    // Revoke the object URLs after the component unmounts or when a new image is pasted
    console.log({ previewSrc });
    return () => {
      newPreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
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
        <div className={cx("preview-file-btn-container")}>
          {previewSrc.length > 0 && <AppButton>Clear all file</AppButton>}
        </div>
        <div className={cx("preview-file-container")}>
          {previewSrc.map((src, index) => {
            return (
              <img className={cx("preview-file")} key={index} src={src} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export { PostInputContainer };
