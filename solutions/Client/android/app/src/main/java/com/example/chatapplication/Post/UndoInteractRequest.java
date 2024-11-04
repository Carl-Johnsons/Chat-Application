package com.example.chatapplication.Post;

public class UndoInteractRequest {
    private String postId;

    public UndoInteractRequest(String postId) {
        this.postId = postId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }
}
