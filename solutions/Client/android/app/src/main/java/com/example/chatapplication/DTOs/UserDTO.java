package com.example.chatapplication.DTOs;

import java.util.Date;

public class UserDTO {
    private String id;
    private String name;
    private String avatarUrl;
    private String backgroundUrl;
    private String introduction;
    private String phoneNumber;
    private String gender;
    private boolean active;

    public UserDTO(String id, String name, String avatarUrl, String backgroundUrl, String introduction, Date dob, String phoneNumber, String gender, boolean active) {
        this.id = id;
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.backgroundUrl = backgroundUrl;
        this.introduction = introduction;
        this.phoneNumber = phoneNumber;
        this.gender = gender;
        this.active = active;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getBackgroundUrl() {
        return backgroundUrl;
    }

    public void setBackgroundUrl(String backgroundUrl) {
        this.backgroundUrl = backgroundUrl;
    }

    public String getIntroduction() {
        return introduction;
    }

    public void setIntroduction(String introduction) {
        this.introduction = introduction;
    }

//    public Date getDob() {
//        return dob;
//    }
//
//    public void setDob(Date dob) {
//        this.dob = dob;
//    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
