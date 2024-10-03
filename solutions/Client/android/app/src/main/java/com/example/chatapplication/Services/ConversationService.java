package com.example.chatapplication.Services;
import com.example.chatapplication.Chats.DTOs.ConversationResponseDTO;

import retrofit2.Call;
import retrofit2.http.GET;


public interface ConversationService {

    @GET("api/conversation/user")
    Call<ConversationResponseDTO> getCurrentUserConversations();
}
