package com.example.chatapplication.Models;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Post {
    private String id;
    private String userId;
    private String content;
    private String createdAt;
    private List<Comment> comments;

    public Post(String userId, String content, String createdAt) {
        this.id = UUID.randomUUID().toString();;
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
        this.comments = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public void addComment(Comment comment) {
        if (comments == null) {
            comments = new ArrayList<>();
        }
        comments.add(comment);
    }
}
