package com.example.chatapplication.Chats.DTOs;

import java.util.Date;
import java.util.List;

public class MessageResponseDTO {

    public List<MessageDTO> paginatedData;

    public MessageResponseDTO() {
    }

    public List<MessageDTO> getPaginatedData() {
        return paginatedData;
    }

    public void setPaginatedData(List<MessageDTO> paginatedData) {
        this.paginatedData = paginatedData;
    }

    public class MessageDTO{
        public String id;
        public String senderId;
        public  String conversationId;
        public  String content;
        public  String attachedFilesURL;
        public  boolean active;
        public Date createdAt;
        public Date updatedAt;

        public MessageDTO() {
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

        public Date getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(Date createdAt) {
            this.createdAt = createdAt;
        }

        public Date getUpdatedAt() {
            return updatedAt;
        }

        public void setUpdatedAt(Date updatedAt) {
            this.updatedAt = updatedAt;
        }
    }
}
