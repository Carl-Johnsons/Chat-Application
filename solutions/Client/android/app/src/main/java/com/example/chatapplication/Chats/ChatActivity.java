package com.example.chatapplication.Chats;

import android.content.Context;
import android.os.Bundle;
import android.view.GestureDetector;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.MotionEvent;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chatapplication.Chats.Adapters.MessageAdapter;
import com.example.chatapplication.Models.Conversation;
import com.example.chatapplication.Models.Message;
import com.example.chatapplication.R;
import com.google.gson.Gson;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class ChatActivity extends AppCompatActivity {
    private Toolbar toolbar;
    private Conversation conversation;
    private RecyclerView recyclerView;
    private MessageAdapter messageAdapter;
    private List<Message> messageList;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_chat);
        // Initialize RecyclerView
        recyclerView = findViewById(R.id.chatRecyclerView);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        // Initialize the message list
        messageList = new ArrayList<>();
        messageAdapter = new MessageAdapter(this, messageList);
        recyclerView.setAdapter(messageAdapter);
        loadMessages();
        //Set up conversation variable
        String conversationJson = getIntent().getStringExtra("CONVERSATION_DATA");
        Gson gson = new Gson();
        conversation = gson.fromJson(conversationJson, Conversation.class);
        // Set up Toolbar
        toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayShowTitleEnabled(false);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);

        findViewById(R.id.chatRecyclerView).setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_DOWN) {
                    hideKeyboard();
                }
                return false;
            }
        });
        //send message

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

    public  void loadMessages(){
        Random random = new Random();
        String[] sampleContents = {
                "Hello!",
                "How are you?",
                "What are you doing?",
                "Let's meet up!",
                "Happy Birthday!",
                "Good morning!",
                "Good night!",
                "See you later!",
                "Nice to see you!",
                "How's your day?",
                "Can you send me the file?",
                "What's your plan for today?",
                "I'm at the cafe.",
                "Are you coming?",
                "Don't forget our meeting.",
                "I love this song!",
                "This is a great place.",
                "Did you watch the game?",
                "I'm feeling great!",
                "Let's catch up soon."
        };
        for (int i = 0; i < 40; i++) {
            Date createdAt = new Date(); // Current date and time
            String content = sampleContents[random.nextInt(sampleContents.length)]; // Random message content
            String senderId = "user" + (random.nextInt(2) + 1); // Random sender ID (user1 or user2)
            boolean isSender = random.nextBoolean(); // Randomly determine if this message is sent by the current user
            boolean isShowUsername = random.nextBoolean(); // Randomly determine if username should be shown
            String attachedFile = "";
            if(i == 1){
                attachedFile = "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Chika_Fujiwara_Anime.jpg/220px-Chika_Fujiwara_Anime.jpg";
            }
            if(i == 39){
                attachedFile = "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/02/hayasaka-flustered-in-kaguya-sama.jpg";
            }
            messageList.add(new Message(createdAt, isSender, content, senderId, isShowUsername, attachedFile));
        }
        messageAdapter.notifyDataSetChanged();
    }

    private void hideKeyboard() {
        View view = this.getCurrentFocus();
        if (view != null) {
            InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
            view.clearFocus();
        }
    }
}