package com.example.chatapplication.Models;

public class PostInteraction {
    private String postId;
    private String interactId;
    private String userId;

    public PostInteraction(String postId, String interactId, String userId) {
        this.postId = postId;
        this.interactId = interactId;
        this.userId = userId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getInteractId() {
        return interactId;
    }

    public void setInteractId(String interactId) {
        this.interactId = interactId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
