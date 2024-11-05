package com.example.chatapplication.DTOs;

import java.io.File;

public class UpdateUserDTO {
    private String name;
    private String introduction;
    private String gender;
    private File avatarImage;

    public UpdateUserDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public File getAvatarImage() {
        return avatarImage;
    }

    public void setAvatarImage(File avatarImage) {
        this.avatarImage = avatarImage;
    }
}
