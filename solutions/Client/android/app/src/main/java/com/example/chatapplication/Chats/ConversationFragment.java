package com.example.chatapplication.Chats;

import android.annotation.SuppressLint;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.chatapplication.Chats.Adapters.ConversationAdapter;
import com.example.chatapplication.Models.Conversation;
import com.example.chatapplication.R;

import java.util.ArrayList;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link ConversationFragment#newInstance} factory method to
 * create an instance of this fragment.
 */
public class ConversationFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;


    private RecyclerView chatRecyclerView;
    private ConversationAdapter conversationAdapter;
    private List<Conversation> conversationList;

    public ConversationFragment() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment ChatFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static ConversationFragment newInstance(String param1, String param2) {
        ConversationFragment fragment = new ConversationFragment();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_conversation, container, false);
        // Initialize RecyclerView
        chatRecyclerView = view.findViewById(R.id.chatRecyclerView);
        chatRecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        conversationList = new ArrayList<>();
        conversationAdapter = new ConversationAdapter(conversationList);
        chatRecyclerView.setAdapter(conversationAdapter);

        loadChatMessages();
        return view;
    }
    @SuppressLint("NotifyDataSetChanged")
    private void loadChatMessages() {
        // Add some sample messages
        conversationList.add(new Conversation("John Nathannnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Hey, how are youuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuyouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuyouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuyouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuyouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuyouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuyouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuyouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuyouuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu?", "10:20"));
        conversationList.add(new Conversation("Alice Brian", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Meeting at 3pm today?", "10:21"));
        conversationList.add(new Conversation("Emma Watson", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Don't forget the presentation!", "10:22"));
        conversationList.add(new Conversation("Michael Ford", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Can we talk later?", "10:23"));
        conversationList.add(new Conversation("Sarah Connor", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "I'll send you the report.", "10:24"));
        conversationList.add(new Conversation("David Beckham", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "The match was amazing!", "10:25"));
        conversationList.add(new Conversation("Sophia Loren", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Let me know your decision.", "10:26"));
        conversationList.add(new Conversation("Lucas Black", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Where is the next meeting?", "10:27"));
        conversationList.add(new Conversation("Isabella Swan", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Looking forward to the event!", "10:28"));
        conversationList.add(new Conversation("Liam Neon", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "The files are ready.", "10:29"));
        conversationList.add(new Conversation("Olivia Wilde", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Can you join the call?", "10:30"));
        conversationList.add(new Conversation("Ethan Hunt", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Mission accomplished!", "10:31"));
        conversationList.add(new Conversation("Chloe Grace", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Let's grab lunch tomorrow.", "10:32"));
        conversationList.add(new Conversation("Daniel Craig", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "The project is on track.", "10:33"));
        conversationList.add(new Conversation("Mia Khalifa", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "I'll be there in 5 minutes.", "10:34"));
        conversationList.add(new Conversation("Chris Evans", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Thanks for your help today!", "10:35"));
        conversationList.add(new Conversation("Emily Blunt", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "Check your email for details.", "10:36"));
        conversationList.add(new Conversation("Jason Momo", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "I have updated the document.", "10:37"));
        conversationList.add(new Conversation("Robert Downey", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "What's the plan for tonight?", "10:38"));
        conversationList.add(new Conversation("Scarlett Johansson", "https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-6.jpg", "I'll see you at the office.", "10:39"));

        conversationAdapter.notifyDataSetChanged();
    }
}