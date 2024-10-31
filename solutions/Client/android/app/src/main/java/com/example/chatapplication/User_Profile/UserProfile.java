package com.example.chatapplication.User_Profile;

public class UserProfile {
    private String sub;
    private String preferred_username;
    private String given_name;
    private String name;
    private String phone_number;
    private String email;
    private String gender;
    private String avatar_url;
    private String background_url;
    private String dob;

    public String getSub() { return sub; }
    public String getPreferred_username() { return preferred_username; }
    public String getGiven_name() { return given_name; }
    public String getName() { return name; }
    public String getPhone_number() { return phone_number; }
    public String getEmail() { return email; }
    public String getGender() { return gender; }
    public String getAvatar_url() { return avatar_url; }
    public String getBackground_url() { return background_url; }
    public String getDob() {
        String s = dob.split(" ")[0];
        return s;
    }
}

