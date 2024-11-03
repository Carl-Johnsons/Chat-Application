package com.example.chatapplication.DTOs;

public class SignalRMessageDTO {
    public String senderId; // Có thể null
    public String conversationId; // Không thể null
    public String content; // Không thể null
    public String source; // Không thể null
    public String attachedFilesURL; // Có thể null
    public Boolean active; // Có thể null

    // Constructor
    public SignalRMessageDTO() {
    }

    // Getters and Setters
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

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getAttachedFilesURL() {
        return attachedFilesURL;
    }

    public void setAttachedFilesURL(String attachedFilesURL) {
        this.attachedFilesURL = attachedFilesURL;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}
