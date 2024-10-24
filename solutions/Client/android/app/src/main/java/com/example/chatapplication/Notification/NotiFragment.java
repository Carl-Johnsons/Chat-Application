package com.example.chatapplication.Notification;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chatapplication.R;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class NotiFragment extends Fragment {
    RecyclerView recView;
    NotificationAdapter myAdapter;
    List<String> nameList;
    List<String> contentList;
    List<String> timeList;

    public static NotiFragment newInstance() {
        return new NotiFragment();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_noti, container, false);

        recView = view.findViewById(R.id.recycler_view);
        recView.setLayoutManager(new LinearLayoutManager(getContext()));

        nameList = new ArrayList<>();
        contentList = new ArrayList<>();
        timeList =new ArrayList<>();

        for (int i = 1; i <= 20; i++){
            nameList.add("Name Name Name Name Name Name Name Name Name Name Name" + i);
            contentList.add("Content Content Content Content Content Content Content Content Content Content" + i);
            SimpleDateFormat sdf = new SimpleDateFormat("hh:mm a", Locale.getDefault());
            String currentTime = sdf.format(new Date());
            timeList.add(currentTime);
        }

        myAdapter = new NotificationAdapter(nameList, contentList, timeList);
        recView.setAdapter(myAdapter);

        return view;
    }
}
