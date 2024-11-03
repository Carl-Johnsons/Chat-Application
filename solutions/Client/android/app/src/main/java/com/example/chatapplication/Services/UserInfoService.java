package com.example.chatapplication.Services;
import com.example.chatapplication.User_Profile.UserProfile;

import java.text.Normalizer;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.PUT;

public interface UserInfoService {
    @GET("http://10.0.2.2:5001/connect/userinfo")
    Call<UserProfile> getUserInfo();
    @FormUrlEncoded
    @PUT("http://10.0.2.2:5001/api/users")
    Call<UserProfile> updateUserInfo(@Field("preferred_username") String preferredUsername,
                                     @Field("name") String name,
                                     @Field("phone_number") String phoneNumber,
                                     @Field("email") String email,
                                     @Field("gender") String gender,
                                     @Field("avatar_url") String avatarUrl,
                                     @Field("background_url") String backgroundUrl,
                                     @Field("dob") String dob);
}
