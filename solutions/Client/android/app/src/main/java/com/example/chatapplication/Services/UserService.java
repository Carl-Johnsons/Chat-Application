package com.example.chatapplication.Services;
import com.example.chatapplication.BuildConfig;
import com.example.chatapplication.Chats.DTOs.ConversationResponseDTO;
import com.example.chatapplication.DTOs.CurrentUserResponseDTO;
import com.example.chatapplication.DTOs.UpdateUserDTO;
import com.example.chatapplication.DTOs.UserDTO;

import java.util.Map;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.PUT;
import retrofit2.http.PartMap;
import retrofit2.http.Query;


public interface UserService {

    String host = BuildConfig.HOST;
    @GET("http://"+host+":5001/api/users")
    Call<UserDTO> getUserById(@Query("id") String userId);
    @GET("http://"+host+":5001/connect/userinfo")
    Call<CurrentUserResponseDTO> getCurrentUser();
    @Multipart
    @PUT("http://"+host+":5001/api/users")
    Call<Void> updateCurrentUser(@PartMap Map<String, RequestBody> fields);

}
