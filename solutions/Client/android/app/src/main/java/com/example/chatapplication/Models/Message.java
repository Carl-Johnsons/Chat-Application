package com.example.chatapplication.Models;

import java.util.Date;

public class Message {
    public String id;
    public String senderId;
    public String conversationId;
    public String content;
    public Date createdAt;
    public Date updateAt;
    public String attachedFilesURL;
    public boolean active;

    public Message(Date createdAt, boolean isSender, String content, String senderId, boolean isShowUsername, String attachedFilesURL) {
        this.createdAt = createdAt;
        this.isSender = isSender;
        this.content = content;
        this.senderId = senderId;
        this.isShowUsername = isShowUsername;
        this.attachedFilesURL = attachedFilesURL;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Date updateAt) {
        this.updateAt = updateAt;
    }

    public String getAttachedFilesURL() {
        return attachedFilesURL;
    }

    public void setAttachedFilesURL(String attachedFilesURL) {
        this.attachedFilesURL = attachedFilesURL;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isSender() {
        return isSender;
    }

    public void setSender(boolean sender) {
        isSender = sender;
    }

    public boolean isShowUsername() {
        return isShowUsername;
    }

    public void setShowUsername(boolean showUsername) {
        isShowUsername = showUsername;
    }

    public boolean isSender;
    public boolean isShowUsername;
}
