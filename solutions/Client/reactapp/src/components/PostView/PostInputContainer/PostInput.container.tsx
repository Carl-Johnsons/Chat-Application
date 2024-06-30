import React, { useCallback, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import style from "./PostInput.container.module.scss";
import classNames from "classnames/bind";
import { EditorEvent, Editor as TinyMCEEditor } from "tinymce";
import AppButton from "@/components/shared/AppButton";
import { ClearableFile } from "@/components/shared";
import { TagInputContainer } from "../TagInputContainer";
import { useCreatePost } from "@/hooks/queries/post";
import { Tag } from "@/models";
import { useModal } from "hooks/useModal";

const cx = classNames.bind(style);

const PostInputContainer = () => {
  const [blobs, setBlobs] = useState<File[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const { mutate: createPostMutate } = useCreatePost();
  const { handleHideModal } = useModal();
  const editorRef = useRef<TinyMCEEditor | null>(null);

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

  const handlePost = () => {
    const tagIds = tags.flatMap((t) => t.id);

    createPostMutate({
      content: editorRef.current?.getContent() ?? "",
      tagIds,
      blobs,
    });

    handleHideModal();
  };

  return (
    <>
      <div className={cx("text-editor-container")}>
        <Editor
          onInit={(_evt, editor) => (editorRef.current = editor)}
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
            height: "260px",
          }}
          initialValue="Write your thought!"
          onExecCommand={(e) => {
            console.log(`The ${e.command} command was fired.`);
          }}
        />
      </div>
      <div>
        <TagInputContainer tags={tags} setTags={setTags} />
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
            <AppButton variant="app-btn-secondary" onClick={handleCancelAll}>
              Clear all file
            </AppButton>
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
      <div className={cx("d-flex", "justify-content-center", "mt-2", "mb-2")}>
        <AppButton
          variant="app-btn-secondary"
          className={cx("shadow-lg")}
          onClick={handlePost}
        >
          Đăng bài
        </AppButton>
      </div>
    </>
  );
};

export { PostInputContainer };
