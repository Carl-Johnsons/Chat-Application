package com.example.chatapplication.Models;

public class File {
    public String name;
    public String extensionTypeCode;
    public String fileType;
    public int size;
    public String url;
    public String id;

    public File(){}
    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getExtensionTypeCode() {
        return extensionTypeCode;
    }

    public void setExtensionTypeCode(String extensionTypeCode) {
        this.extensionTypeCode = extensionTypeCode;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}

