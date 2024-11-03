package com.example.chatapplication.DTOs;

import com.google.gson.annotations.SerializedName;

import java.util.Date;

public class CurrentUserResponseDTO {
    public String sub;

    @SerializedName("preferred_username")
    public String preferredUsername;

    @SerializedName("given_name")
    public String givenName;

    public String name;

    @SerializedName("phone_number")
    public String phoneNumber;

    public String email;

    public String gender;

    @SerializedName("avatar_url")
    public String avartarUrl;

    @SerializedName("background_url")
    public String backgroundUrl;

    //public Date dob;

    public CurrentUserResponseDTO(){

    }

    public String getSub() {
        return sub;
    }

    public void setSub(String sub) {
        this.sub = sub;
    }

    public String getPreferredUsername() {
        return preferredUsername;
    }

    public void setPreferredUsername(String preferredUsername) {
        this.preferredUsername = preferredUsername;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAvartarUrl() {
        return avartarUrl;
    }

    public void setAvartarUrl(String avartarUrl) {
        this.avartarUrl = avartarUrl;
    }

    public String getBackgroundUrl() {
        return backgroundUrl;
    }

    public void setBackgroundUrl(String backgroundUrl) {
        this.backgroundUrl = backgroundUrl;
    }
//
//    public Date getDob() {
//        return dob;
//    }
//
//    public void setDob(Date dob) {
//        this.dob = dob;
//    }
}
