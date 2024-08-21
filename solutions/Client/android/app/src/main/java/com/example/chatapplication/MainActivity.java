package com.example.chatapplication;

import android.os.Bundle;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;


import com.example.chatapplication.databinding.ActivityMainBinding;


public class MainActivity extends AppCompatActivity {

    ActivityMainBinding binding;

    private final ChatFragment CHAT_FRAGMENT = new ChatFragment();
    private final ContactFragment CONTACT_FRAGMENT = new ContactFragment();
    private final PostFragment POST_FRAGMENT = new PostFragment();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        EdgeToEdge.enable(this);
        setContentView(binding.getRoot());

        replaceFragment(CHAT_FRAGMENT);

        binding.bottomNavBar.setOnItemSelectedListener(item -> {
            if(item.getItemId() == R.id.nav_chat){
                replaceFragment(CHAT_FRAGMENT);
            }else if(item.getItemId() == R.id.nav_contact){
                replaceFragment(CONTACT_FRAGMENT);
            }else if(item.getItemId() == R.id.nav_post){
                replaceFragment(POST_FRAGMENT);
            }
            return true;
        });

//        BottomNavigationView navigation = (BottomNavigationView) findViewById(R.id.bottom_nav_bar);
//        navigation.setOnItemSelectedListener(new NavigationBarView.OnItemSelectedListener() {
//            @Override
//            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
//                if(item.getItemId() == R.id.nav_chat){
//                    System.out.println("chat neeeee");
//                } else if (item.getItemId() == R.id.nav_contact) {
//                    System.out.println("contact neeeee");
//                } else if (item.getItemId() == R.id.nav_post) {
//                    System.out.println("post neeeee");
//                }
//                return true;
//            }
//        });

    }
    private void replaceFragment(Fragment fragment){
        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        fragmentTransaction.replace(R.id.frameLayout, fragment);
        fragmentTransaction.commit();
    }
}