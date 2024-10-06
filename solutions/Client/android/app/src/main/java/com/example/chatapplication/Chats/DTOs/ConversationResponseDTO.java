package com.example.chatapplication.Chats.DTOs;

import java.util.Date;
import java.util.List;


public class ConversationResponseDTO {
    private List<ConversationDTO> conversations;

    public ConversationResponseDTO(List<ConversationDTO> conversations) {
        this.conversations = conversations;
    }

    public List<ConversationDTO> getConversations() {
        return conversations;
    }

    public void setConversations(List<ConversationDTO> conversations) {
        this.conversations = conversations;
    }

    public class ConversationDTO {

        private String name;
        private String imageURL;
        private String id;
        private String type;
        private Date createdAt;
        private Date updatedAt;
        private LastMessageDTO lastMessage;
        private List<UserDTO> users;

        public ConversationDTO(String name, String imageURL, String id, String type, Date createdAt, Date updatedAt, LastMessageDTO lastMessage, List<UserDTO> users) {
            this.name = name;
            this.imageURL = imageURL;
            this.id = id;
            this.type = type;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
            this.lastMessage = lastMessage;
            this.users = users;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getImageURL() {
            return imageURL;
        }

        public void setImageURL(String imageURL) {
            this.imageURL = imageURL;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
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

        public LastMessageDTO getLastMessage() {
            return lastMessage;
        }

        public void setLastMessage(LastMessageDTO lastMessage) {
            this.lastMessage = lastMessage;
        }

        public List<UserDTO> getUsers() {
            return users;
        }

        public void setUsers(List<UserDTO> users) {
            this.users = users;
        }

        public class LastMessageDTO {
            private String id;
            private String senderId;
            private String conversationId;
            private String content;
            private String source;
            private String attachedFilesURL;
            private boolean active;
            private Date createdAt;
            private Date updatedAt;

            public LastMessageDTO() {

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

            public boolean isActive() {
                return active;
            }

            public void setActive(boolean active) {
                this.active = active;
            }

            public String getId() {
                return id;
            }

            public void setId(String id) {
                this.id = id;
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

        public class UserDTO {
            private String userId;
            private String role;
            private Date readTime;

            public UserDTO() {
            }

            public String getUserId() {
                return userId;
            }

            public void setUserId(String userId) {
                this.userId = userId;
            }

            public String getRole() {
                return role;
            }

            public void setRole(String role) {
                this.role = role;
            }

            public Date getReadTime() {
                return readTime;
            }

            public void setReadTime(Date readTime) {
                this.readTime = readTime;
            }
        }
    }

}

