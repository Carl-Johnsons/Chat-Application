package com.example.chatapplication.Contact;

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
 * create an instance of this fragment.
 */
public class ContactGroupFragment extends Fragment {

    private RecyclerView groupRecyclerView;
    private ConversationAdapter conversationAdapter;
    private List<Conversation> conversationList;

    public ContactGroupFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        var view = inflater.inflate(R.layout.fragment_contact_group, container, false);
        groupRecyclerView = view.findViewById(R.id.groupList);
        groupRecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        conversationList = new ArrayList<>();
        conversationAdapter = new ConversationAdapter(conversationList);
        groupRecyclerView.setAdapter(conversationAdapter);

        loadGroupConversations();
        return view;
    }

    private void loadGroupConversations() {
        ConversationService conversationService = RetrofitClient.getRetrofitInstance(getContext()).create(ConversationService.class);
        UserService userService = RetrofitClient.getRetrofitInstance(getContext()).create(UserService.class);
        ApiUtil.callApi(conversationService.getCurrentUserConversations(), new ApiUtil.ApiCallback<ConversationResponseDTO>() {
            @Override
            public void onSuccess(ConversationResponseDTO response) {

                conversationList.clear();
                var conversations = response.getConversations();
                for (ConversationResponseDTO.ConversationDTO conversationDTO : conversations) {
                    final Conversation cvs = new Conversation();

                    if (conversationDTO.getType().equals(ConversationType.GROUP.getValue())) {
                        cvs.setId(conversationDTO.getId());
                        cvs.setEntityName(conversationDTO.getName());
                        cvs.setAvatarUrl(conversationDTO.getImageURL());
                        cvs.setTime("");
                        cvs.setContent("");
                        conversationList.add(cvs);
                        conversationAdapter.notifyDataSetChanged();
                    }
                }
            }

            @Override
            public void onError(Throwable t) {

            }
        });
    }


}