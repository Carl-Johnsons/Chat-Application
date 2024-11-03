package com.example.chatapplication.Post;

public class ReportRequest {
    private String postId;
    private String reason;

    public ReportRequest(String postId, String reason) {
        this.postId = postId;
        this.reason = reason;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }
}
