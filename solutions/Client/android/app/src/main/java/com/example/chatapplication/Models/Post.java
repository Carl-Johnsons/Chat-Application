package com.example.chatapplication.Models;

import java.util.ArrayList;
import java.util.List;

public class Post {
    private String id;
    private String userId;
    private String content;
    private String createdAt;
    private List<Comment> comments;
    private boolean isLiked;
    private String userAvatarUrl;

    public Post(String userId, String content, String createdAt, String userAvatarUrl) {
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
        this.comments = new ArrayList<>();
        this.userAvatarUrl = userAvatarUrl;
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

    public boolean isLiked() {
        return isLiked;
    }

    public void setLiked(boolean liked) {
        isLiked = liked;
    }

    public String getUserAvatarUrl() {
        return userAvatarUrl;
    }

    public void setUserAvatarUrl(String userAvatarUrl) {
        this.userAvatarUrl = userAvatarUrl;
    }

    public void addComment(Comment comment) {
        if (comments == null) {
            comments = new ArrayList<>();
        }
        comments.add(comment);
    }
}
