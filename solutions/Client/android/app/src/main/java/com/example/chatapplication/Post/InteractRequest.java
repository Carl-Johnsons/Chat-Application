package com.example.chatapplication.Post;

public class InteractRequest {
    private String postId;
    private String interactionId;

    public InteractRequest(String postId, String interactionId) {
        this.postId = postId;
        this.interactionId = interactionId;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getInteractionId() {
        return interactionId;
    }

    public void setInteractionId(String interactionId) {
        this.interactionId = interactionId;
    }
}
