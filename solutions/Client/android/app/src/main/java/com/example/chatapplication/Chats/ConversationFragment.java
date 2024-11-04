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
import com.example.chatapplication.Chats.DTOs.ConversationResponseDTO;
import com.example.chatapplication.Constants.ConversationType;
import com.example.chatapplication.DTOs.UserDTO;
import com.example.chatapplication.Models.Conversation;
import com.example.chatapplication.Models.User;
import com.example.chatapplication.R;
import com.example.chatapplication.Services.ConversationService;
import com.example.chatapplication.Services.RetrofitClient;
import com.example.chatapplication.Services.UserService;
import com.example.chatapplication.utils.ApiUtil;

import java.text.SimpleDateFormat;
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

    // TODO: Rename and change types of parameters
    private String mParam1;
    private RecyclerView chatRecyclerView;
    private ConversationAdapter conversationAdapter;
    private List<Conversation> conversationList;

    public ConversationFragment() {
        // Required empty public constructor
    }


    public static ConversationFragment newInstance() {
        ConversationFragment fragment = new ConversationFragment();
        Bundle args = new Bundle();
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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

        loadConversations();
        return view;
    }
    @SuppressLint("NotifyDataSetChanged")
    private void loadConversations() {
        ConversationService conversationService = RetrofitClient.getRetrofitInstance(getContext()).create(ConversationService.class);
        UserService userService = RetrofitClient.getRetrofitInstance(getContext()).create(UserService.class);
        ApiUtil.callApi(conversationService.getCurrentUserConversations(), new ApiUtil.ApiCallback<ConversationResponseDTO>() {
            @Override
            public void onSuccess(ConversationResponseDTO response) {
                var conversations = response.getConversations();
                for (ConversationResponseDTO.ConversationDTO conversationDTO : conversations) {
                    final Conversation cvs = new Conversation();
                    if(conversationDTO.getType().equals(ConversationType.INDIVIDUAL.getValue())){
                        String userId = conversationDTO.getUsers().get(0).getUserId();
                        ApiUtil.callApi(userService.getUserById(userId), new ApiUtil.ApiCallback<UserDTO>() {
                            @Override
                            public void onSuccess(UserDTO user) {
                                cvs.setId(conversationDTO.getId());
                                cvs.setEntityName(user.getName());
                                cvs.setAvatarUrl(user.getAvatarUrl());
                                List<User> users = new ArrayList<>();
                                for(ConversationResponseDTO.ConversationDTO.UserDTO userDTO : conversationDTO.getUsers()){
                                    User u = new User();
                                    u.userId = userDTO.getUserId();
                                    u.avatarUrl = user.getAvatarUrl();
                                    u.name = user.getName();
                                    users.add(u);
                                }
                                cvs.setUsers(users);
                                if(conversationDTO.getLastMessage() != null){
                                    cvs.setContent(conversationDTO.getLastMessage().getContent());
                                    var formatter = new SimpleDateFormat("HH:mm");
                                    String formattedDate = formatter.format(conversationDTO.getLastMessage().getCreatedAt());
                                    cvs.setTime(formattedDate);
                                }else{
                                    cvs.setContent("");
                                    cvs.setTime("");
                                }
                                conversationList.add(cvs);
                                conversationAdapter.notifyDataSetChanged();

                            }
                            @Override
                            public void onError(Throwable t) {
                                System.out.println(t.getMessage());
                            }
                        });
                    }
                }
            }

            @Override
            public void onError(Throwable t) {

            }
        });


    }
}