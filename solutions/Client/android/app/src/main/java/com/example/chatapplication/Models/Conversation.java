package com.example.chatapplication.Models;

public class Conversation {
    public String entityName;
    public  String avatarUrl;
    public  String content;
    public  String time;

    public Conversation(String entityName, String avatarUrl, String content, String time) {
        this.entityName = entityName;
        this.avatarUrl = avatarUrl;
        this.content = content;
        this.time = time;
    }

    public  Conversation(){

    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
