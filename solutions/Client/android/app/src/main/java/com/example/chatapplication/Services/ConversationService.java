package com.example.chatapplication.Services;
import com.example.chatapplication.Chats.DTOs.ConversationResponseDTO;
import com.example.chatapplication.Chats.DTOs.MessageResponseDTO;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;


public interface ConversationService {

    @GET("api/conversation/user")
    Call<ConversationResponseDTO> getCurrentUserConversations();

    @GET("api/conversation/message")
    Call<MessageResponseDTO> getMessagesByConversationId(@Query("conversationId")String conversationId, @Query("skip")int skipBatch);
}
