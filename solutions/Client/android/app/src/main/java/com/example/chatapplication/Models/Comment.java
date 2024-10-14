package com.example.chatapplication.Models;

import java.util.Date;

public class Comment
{
    private String userName;
    private String content;
    private Date timePosted;

    public Comment(String userName, String content, Date timePosted) {
        this.userName = userName;
        this.content = content;
        this.timePosted = timePosted;
    }

    public String getUserName() {
        return userName;
    }

    public String getContent() {
        return content;
    }

    public Date getTimePosted() {
        return timePosted;
    }
}
