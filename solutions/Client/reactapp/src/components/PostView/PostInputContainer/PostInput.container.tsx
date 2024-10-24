import { Editor } from "@tinymce/tinymce-react";
import { EditorEvent, Editor as TinyMCEEditor } from "tinymce";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  useCreatePost,
  useGetPostByd,
  useUpdatePost,
} from "@/hooks/queries/post";
import { ClearableFile } from "@/components/shared";
import { Tag } from "@/models";
import { TagInputContainer } from "../TagInputContainer";
import { useGlobalState } from "@/hooks";
import { useModal } from "hooks/useModal";
import AppButton from "@/components/shared/AppButton";
import classNames from "classnames/bind";
import style from "./PostInput.container.module.scss";

const cx = classNames.bind(style);

const PostInputContainer = () => {
  const [blobs, setBlobs] = useState<File[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [modalEntityId] = useGlobalState("modalEntityId");

  const isUpdatePost = !!modalEntityId;
  const { mutate: createPostMutate } = useCreatePost();
  const { mutate: updatePostMutate } = useUpdatePost();

  const { data: postData } = useGetPostByd(
    { postId: modalEntityId! },
    { enabled: !!modalEntityId }
  );

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

  const handleUpdatePost = useCallback(() => {
    if (modalEntityId) {
      updatePostMutate({
        postId: modalEntityId,
        tagIds: tags.flatMap((t) => t.id),
        content: editorRef.current?.getContent() ?? "",
        active: true,
      });
    }
    handleHideModal();
  }, [handleHideModal, modalEntityId, tags, updatePostMutate]);

  useEffect(() => {
    if (!postData) {
      return;
    }
    setTags(postData.tags);
  }, [postData]);

  const initialValue = postData?.content ?? "Write your thought!";
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
          initialValue={initialValue}
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
        {isUpdatePost ? (
          <AppButton
            variant="app-btn-secondary"
            className={cx("shadow-lg")}
            onClick={handleUpdatePost}
          >
            Cập nhập
          </AppButton>
        ) : (
          <AppButton
            variant="app-btn-secondary"
            className={cx("shadow-lg")}
            onClick={handlePost}
          >
            Đăng bài
          </AppButton>
        )}
      </div>
    </>
  );
};

export { PostInputContainer };
