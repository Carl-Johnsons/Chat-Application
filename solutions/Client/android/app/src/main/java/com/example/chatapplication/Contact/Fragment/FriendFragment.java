package com.example.chatapplication.Contact.Fragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chatapplication.Contact.Adapter.FriendListAdapter;
import com.example.chatapplication.Contact.DTO.FriendDTO;
import com.example.chatapplication.R;

import java.util.ArrayList;
import java.util.List;

public class FriendFragment extends Fragment {
    private RecyclerView recyclerViewFriends;
    private FriendListAdapter friendAdapter;
    private List<FriendDTO> friendsList;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_friend_list, container, false);

        recyclerViewFriends = view.findViewById(R.id.recyclerViewFriends);
        recyclerViewFriends.setLayoutManager(new LinearLayoutManager(getContext()));


        friendsList = new ArrayList<>();
        friendsList.add(new FriendDTO("John Doe", "a"));
        friendsList.add(new FriendDTO("Jane Smith", "a"));

        friendAdapter = new FriendListAdapter(friendsList, friend -> {
            Toast.makeText(getContext(), "Clicked on: " + friend.getName(), Toast.LENGTH_SHORT).show();
        });

        recyclerViewFriends.setAdapter(friendAdapter);

        return view;
    }
}
