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
import com.example.chatapplication.Contact.Adapter.GroupListAdapter;
import com.example.chatapplication.Contact.DTO.FriendDTO;
import com.example.chatapplication.Contact.DTO.GroupDTO;
import com.example.chatapplication.R;

import java.util.ArrayList;
import java.util.List;

public class GroupListFragment extends Fragment {

    private RecyclerView recyclerViewGroups;
    private GroupListAdapter groupAdapter;
    private List<GroupDTO> groupList;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_group_list, container, false);

        recyclerViewGroups = view.findViewById(R.id.recyclerViewGroup);
        recyclerViewGroups.setLayoutManager(new LinearLayoutManager(getContext()));

        groupList = new ArrayList<>();
        groupList.add(new GroupDTO("John Doe", "a"));
        groupList.add(new GroupDTO("Jane Smith", "a"));

        groupAdapter = new GroupListAdapter(groupList, gr -> {
            Toast.makeText(getContext(), "Clicked on: " + gr.getName(), Toast.LENGTH_SHORT).show();
        });

        recyclerViewGroups.setAdapter(groupAdapter);

        return view;
    }
}
