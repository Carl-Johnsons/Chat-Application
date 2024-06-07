"use client";
import React from "react";
import { useParams } from "next/navigation";
import { PostViewContainer } from "@/components/PostView";

const PostDetailPage = () => {
  const params = useParams();
  const postId = params["id"];
  return (
    <div>
      <PostViewContainer disableInput />
    </div>
  );
};

export default PostDetailPage;
