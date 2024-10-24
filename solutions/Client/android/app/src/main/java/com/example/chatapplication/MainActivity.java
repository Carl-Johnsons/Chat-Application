package com.example.chatapplication;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import com.example.chatapplication.Chats.ConversationFragment;
import com.example.chatapplication.Contexts.ChatHubContext;
import com.example.chatapplication.DTOs.CurrentUserResponseDTO;
import com.example.chatapplication.Notification.NotiFragment;
import com.example.chatapplication.auth.AuthStateManager;
import com.example.chatapplication.databinding.ActivityMainBinding;
import com.google.gson.Gson;

public class MainActivity extends AppCompatActivity {
    private final String TAG = "Main";
    ActivityMainBinding binding;
    private CurrentUserResponseDTO currentUser;
    private final ConversationFragment CHAT_FRAGMENT = new ConversationFragment();
    private final ContactFragment CONTACT_FRAGMENT = new ContactFragment();
    private final PostFragment POST_FRAGMENT = new PostFragment();
    private final NotiFragment NOTI_FRAGMENT = new NotiFragment();
    private AuthStateManager authStateManager;

    private ChatHubContext chatHubContext;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        authStateManager = AuthStateManager.getInstance(this);
        var authState = authStateManager.getCurrent();
        Log.i(TAG, authState.jsonSerializeString());

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        EdgeToEdge.enable(this);
        setContentView(binding.getRoot());

        replaceFragment(CHAT_FRAGMENT);

        binding.bottomNavBar.setOnItemSelectedListener(item -> {
            if (item.getItemId() == R.id.nav_chat) {
                replaceFragment(CHAT_FRAGMENT);
            } else if (item.getItemId() == R.id.nav_contact) {
                replaceFragment(CONTACT_FRAGMENT);
            } else if (item.getItemId() == R.id.nav_post) {
                replaceFragment(POST_FRAGMENT);
            } else if (item.getItemId() == R.id.nav_noti) {
                replaceFragment(NOTI_FRAGMENT);
            }
            return true;
        });

        //Innitialize current user
        SharedPreferences sharedPreferences = getSharedPreferences("CurrentUser", Context.MODE_PRIVATE);
        String userJson = sharedPreferences.getString("CurrentUser", null);
        if (userJson != null) {
            Gson gson = new Gson();
            currentUser = gson.fromJson(userJson, CurrentUserResponseDTO.class);
        }

        chatHubContext = chatHubContext.getInstance(BuildConfig.NEXT_PUBLIC_SIGNALR_URL+"?userId="+currentUser.getSub(), this);

        // Sử dụng signalRClient
        chatHubContext.startConnection();



        // BottomNavigationView navigation = (BottomNavigationView)
        // findViewById(R.id.bottom_nav_bar);
        // navigation.setOnItemSelectedListener(new
        // NavigationBarView.OnItemSelectedListener() {
        // @Override
        // public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        // if(item.getItemId() == R.id.nav_chat){
        // System.out.println("chat neeeee");
        // } else if (item.getItemId() == R.id.nav_contact) {
        // System.out.println("contact neeeee");
        // } else if (item.getItemId() == R.id.nav_post) {
        // System.out.println("post neeeee");
        // }
        // return true;
        // }
        // });
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

    }

    private void replaceFragment(Fragment fragment) {
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.frameLayout, fragment);
        fragmentTransaction.commit();
    }
}