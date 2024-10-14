package com.example.chatapplication.Services;
import com.example.chatapplication.Chats.DTOs.ConversationResponseDTO;
import com.example.chatapplication.DTOs.CurrentUserResponseDTO;
import com.example.chatapplication.DTOs.UserDTO;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;


public interface UserService {

    @GET("http://10.0.2.2:5001/api/users")
    Call<UserDTO> getUserById(@Query("id") String userId);
    @GET("http://10.0.2.2:5001/connect/userinfo")
    Call<CurrentUserResponseDTO> getCurrentUser();
}
