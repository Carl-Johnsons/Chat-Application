package com.example.chatapplication.Models;

import java.util.Date;

public class Comment
{
    private  String id;
    private String userId;
    private String content;
    private String createdAt;

    public Comment(String userId, String content, String createdAt) {
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
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
}
