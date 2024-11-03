package com.example.chatapplication.Models;



import java.util.List;

public class Conversation {
    public String id;
    public String entityName;
    public  String avatarUrl;
    public  String content;
    public  String time;
    public List<User> Users;
    public Conversation(){
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public List<User> getUsers() {
        return Users;
    }

    public void setUsers(List<User> users){this.Users = users;}

}
