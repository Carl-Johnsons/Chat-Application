package com.example.chatapplication.Contexts;
import android.app.Activity;
import android.content.Context;

import androidx.recyclerview.widget.RecyclerView;

import com.example.chatapplication.Chats.Adapters.MessageAdapter;
import com.example.chatapplication.DTOs.SignalRMessageDTO;
import com.example.chatapplication.Models.Message;
import com.example.chatapplication.auth.AuthStateManager;
import com.google.gson.Gson;
import com.microsoft.signalr.HubConnection;
import com.microsoft.signalr.HubConnectionBuilder;

import java.util.Date;
import java.util.List;

import io.reactivex.rxjava3.core.Single;


public class ChatHubContext {
    //private final AuthStateManager authStateManager;
    private static ChatHubContext instance;
    private HubConnection hubConnection;

    // Private constructor to prevent instantiation
    private ChatHubContext(String url, Context context) {
        //authStateManager = AuthStateManager.getInstance(context);
        //String token = authStateManager.getAccessToken();
        //.withAccessTokenProvider(Single.defer(() -> Single.just(authStateManager.getAccessToken())))
         hubConnection = HubConnectionBuilder
                .create(url)
                .build();
        subriceEvents();
    }

    // Public method to provide access to the singleton instance
    public static ChatHubContext getInstance(String url, Context context) {
        if (instance == null) {
            instance = new ChatHubContext(url, context);
        }
        return instance;
    }

    public void startConnection() {
        hubConnection.start().subscribe(
                () -> System.out.println("Connection started"),
                throwable -> System.out.println("Error starting connection: " + throwable.getMessage())
        );
    }

    public void subriceEvents(){
        hubConnection.on("Connected", (jsonObject)->{

        }, String[].class);

        hubConnection.on("Disconnected", (jsonObject)->{

        }, String.class);

        hubConnection.on("ReceiveFriendRequest", (jsonObject)->{

        }, String.class);

        hubConnection.on("ReceiveAcceptFriendRequest", (jsonObject)->{

        }, String.class);

        hubConnection.on("ReceiveJoinConversation", (jsonObject)->{

        }, String.class);

        hubConnection.on("ReceiveDisbandConversation", (jsonObject)->{

        }, String.class);

        hubConnection.on("ReceiveNotifyUserTyping", (jsonObject)->{

        }, Object.class);

        hubConnection.on("ReceiveDisableNotifyUserTyping", ()->{


        });

        hubConnection.on("ForcedLogout", ()->{

        });

        hubConnection.on("ReceiveCall", (jsonObject)->{

        }, String.class);

        hubConnection.on("ReceiveSignal", (data ,jsonObject)->{

        }, String.class,String.class);

        hubConnection.on("ReceiveAcceptCall", (jsonObject)->{

        }, String.class);

        hubConnection.on("DeletePost", ()->{

        });

        hubConnection.on("ReportPost", ()->{

        });

        hubConnection.on("ReceiveMessage", (messageJson)->{

        },SignalRMessageDTO.class);
    }

    public void stopConnection() {
        hubConnection.stop();
    }

//    public void sendMessage(String message) {
//        hubConnection.send("SendMessage", message); // Tùy chỉnh tên phương thức
//    }
    //List<Message> messageList, MessageAdapter messageAdapter
    public void onReceiveMessage(List<Message> messageList, MessageAdapter messageAdapter, RecyclerView messageListView, Context context) {
        System.out.println("dang ky reveice message event");
        hubConnection.on("ReceiveMessage", (messageJson) -> {
            Message message = new Message();
            message.setSenderId(messageJson.getSenderId());
            message.setContent(messageJson.getContent());
            message.setShowUsername(false);
            message.setCreatedAt(new Date());
            message.setAttachedFilesURL(messageJson.getAttachedFilesURL());
            message.setSender(false);
            ((Activity) context).runOnUiThread(() -> {
                messageList.add(message);
                messageAdapter.notifyDataSetChanged();
                messageListView.scrollToPosition(messageList.size() - 1);
            });
            System.out.println("Received message: " + messageJson);
        }, SignalRMessageDTO.class);
    }
}
