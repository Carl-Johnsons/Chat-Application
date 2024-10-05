package com.example.chatapplication.post;

public class Post {
    private String userName;
    private String content;
    private String timePosted;

    public Post(String userName, String content, String timePosted) {
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

    public String getTimePosted() {
        return timePosted;
    }

    public void setTimePosted(String timePosted) {
        this.timePosted = timePosted;
    }
}
