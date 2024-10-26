package com.example.chatapplication.Models;

public class Comment
{
    private String id;
    private String userId;
    private String userAvatarUrl;
    private String content;
    private String createdAt;

    public Comment(String userId, String content, String createdAt, String userAvatarUrl) {
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
        this.userAvatarUrl = userAvatarUrl;
    }

    public String getUserId() {
        return userId;
    }

    public String getContent() {
        return content;
    }

    public String getTimePosted() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserAvatarUrl() {
        return userAvatarUrl;
    }

    public void setUserAvatarUrl(String userAvatarUrl) {
        this.userAvatarUrl = userAvatarUrl;
    }
}
