package com.example.chatapplication.Post;

public class InteractResponse {
    private String postId;
    private String interactId;

    public InteractResponse(String postId, String interactId) {
        this.postId = postId;
        this.interactId = interactId;
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
}
