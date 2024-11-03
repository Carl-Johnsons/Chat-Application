package com.example.chatapplication.Chats;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.GestureDetector;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chatapplication.BuildConfig;
import com.example.chatapplication.Chats.Adapters.MessageAdapter;
import com.example.chatapplication.Chats.DTOs.ConversationResponseDTO;
import com.example.chatapplication.Chats.DTOs.MessageResponseDTO;
import com.example.chatapplication.Contexts.ChatHubContext;
import com.example.chatapplication.DTOs.CurrentUserResponseDTO;
import com.example.chatapplication.Models.Conversation;
import com.example.chatapplication.Models.Message;
import com.example.chatapplication.R;
import com.example.chatapplication.Services.ConversationService;
import com.example.chatapplication.Services.RetrofitClient;
import com.example.chatapplication.utils.ApiUtil;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class ChatActivity extends AppCompatActivity {
    private int SkipBatch = 0;
    private Toolbar toolbar;
    private Conversation conversation;
    private RecyclerView recyclerView;
    private MessageAdapter messageAdapter;
    private List<Message> messageList;
    private ConversationService conversationService;
    private CurrentUserResponseDTO currentUser;
    private ChatHubContext chatHubContext;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_chat);
        //Innitialize current user
        SharedPreferences sharedPreferences = getSharedPreferences("CurrentUser", Context.MODE_PRIVATE);
        String userJson = sharedPreferences.getString("CurrentUser", null);
        if (userJson != null) {
            Gson gson = new Gson();
            currentUser = gson.fromJson(userJson, CurrentUserResponseDTO.class);
        }

        //Initialize conversation service
        conversationService = RetrofitClient.getRetrofitInstance(this).create(ConversationService.class);

        // Initialize RecyclerView
        recyclerView = findViewById(R.id.chatRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));

        // Initialize the message list
        messageList = new ArrayList<>();
        messageAdapter = new MessageAdapter(this, messageList);
        recyclerView.setAdapter(messageAdapter);

        //Set up conversation variable
        String conversationJson = getIntent().getStringExtra("CONVERSATION_DATA");
        Gson gson = new Gson();
        conversation = gson.fromJson(conversationJson, Conversation.class);
        //set up avatar in conversation
        MessageAdapter.userIdAvtUrlMap.put(conversation.getUsers().get(0).userId, conversation.getUsers().get(0).avatarUrl);
        MessageAdapter.userIdUserName.put(conversation.getUsers().get(0).userId, conversation.getUsers().get(0).name);


        // Set up Toolbar
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        //set up signalR
        chatHubContext = ChatHubContext.getInstance(BuildConfig.NEXT_PUBLIC_SIGNALR_URL+"?userId="+currentUser.getSub(), this);
        chatHubContext.onReceiveMessage(messageList, messageAdapter, recyclerView,this);
        loadMessages(SkipBatch);

        findViewById(R.id.chatRecyclerView).setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_DOWN) {
                    hideKeyboard();
                }
                return false;
            }
        });
        //Ad scroll event to recycler view
        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrolled(@NonNull RecyclerView recyclerView, int dx, int dy) {
                super.onScrolled(recyclerView, dx, dy);
                if (!recyclerView.canScrollVertically(-1)) {
                    int msgNum = messageList.size();
                    if((msgNum/10)-SkipBatch == 1){
                        SkipBatch++;
                        loadMessages(SkipBatch);
                    }
                }
            }
        });
        //send message
        ImageButton btnSend = findViewById(R.id.buttonSend);
        EditText edtMessage = findViewById(R.id.editTextMessage);
        btnSend.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(edtMessage.getText().equals("")) return;
                sendMessage(edtMessage.getText().toString());
                edtMessage.setText("");
            }
        });

        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
    }
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.chat_navigation_menu, menu);
        TextView toolBarTitle = findViewById(R.id.toolbar_title);
        toolBarTitle.setText(conversation.entityName);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if(item.getItemId() == android.R.id.home){
            finish();
            return true;
        }
        else if(item.getItemId() == R.id.call_voice){
            return true;
        }
        else if(item.getItemId() == R.id.call_video){
            return true;
        }
        else if(item.getItemId() == R.id.menu){
            return true;
        }
        else {
            return super.onOptionsItemSelected(item);
        }

    };

    public  void sendMessage(String message){
        ApiUtil.callApi(conversationService.sendMessage(conversation.getId(), message), new ApiUtil.ApiCallback<MessageResponseDTO.MessageDTO>() {
            @Override
            public void onSuccess(MessageResponseDTO.MessageDTO message) {
                Message msg = new Message();
                msg.setId(message.getId());
                msg.setSenderId(message.getSenderId());
                msg.setContent(message.getContent());
                msg.setShowUsername(false);
                msg.setCreatedAt(message.getCreatedAt());
                msg.setAttachedFilesURL(message.getAttachedFilesURL());
                msg.setSender(true);
                messageList.add(msg);
                messageAdapter.notifyDataSetChanged();
                recyclerView.scrollToPosition(messageList.size()-1);
            }

            @Override
            public void onError(Throwable t) {

            }
        });
    }

    public void loadMessages(int SkipBatch){
        ApiUtil.callApi(conversationService.getMessagesByConversationId(conversation.getId(), SkipBatch), new ApiUtil.ApiCallback<MessageResponseDTO>() {
            @Override
            public void onSuccess(MessageResponseDTO response) {
                int count = 0;
                var messages = response.getPaginatedData();
                List<Message> temp = new ArrayList<>();
                for (MessageResponseDTO.MessageDTO message : messages) {
                    count++;
                    Message msg = new Message();
                    msg.setId(message.getId());
                    msg.setSenderId(message.getSenderId());
                    msg.setContent(message.getContent());
                    msg.setShowUsername(false);
                    msg.setCreatedAt(message.getCreatedAt());
                    msg.setAttachedFilesURL(message.getAttachedFilesURL());
                    msg.setSender(currentUser.getSub().equals(message.senderId));
                    temp.add(msg);
                    System.out.println("add message ok:"+msg.getContent());
                }
                temp.addAll(messageList);
                messageList.clear();
                messageList.addAll(temp);
                messageAdapter.notifyDataSetChanged();
                recyclerView.scrollToPosition(count-1);

            }
            @Override
            public void onError(Throwable t) {

            }
        });
    }
    private void hideKeyboard() {
        View view = this.getCurrentFocus();
        if (view != null) {
            InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
            view.clearFocus();
        }
    }

    @Override
    protected void onStop() {
        super.onStop();
        chatHubContext.unsubscribeReceiveMessage();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        chatHubContext.unsubscribeReceiveMessage();
    }
}