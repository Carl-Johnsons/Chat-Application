package com.example.chatapplication.post;

import java.util.Date;

public class Post {
    private String userName;
    private String content;
    private Date timePosted;

    public Post(String userName, String content, Date timePosted) {
        this.userName = userName;
        this.content = content;
        this.timePosted = timePosted;
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
}
