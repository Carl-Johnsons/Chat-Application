package com.example.chatapplication.Models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Post {
    private String userName;
    private String content;
    private Date timePosted;
    private List<Comment> comments;

    public Post(String userName, String content, Date timePosted) {
        this.userName = userName;
        this.content = content;
        this.timePosted = timePosted;
        this.comments = new ArrayList<>();
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getTimePosted() {
        return timePosted;
    }

    public void setTimePosted(Date timePosted) {
        this.timePosted = timePosted;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void addComment(Comment comment) {
        if (comments == null) {
            comments = new ArrayList<>();
        }
        comments.add(comment);
    }
}
