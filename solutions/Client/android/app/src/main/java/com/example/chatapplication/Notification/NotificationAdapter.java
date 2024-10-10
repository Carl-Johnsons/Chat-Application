package com.example.chatapplication.Notification;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;


import com.example.chatapplication.R;

import java.util.List;

public class NotificationAdapter extends RecyclerView.Adapter<NotificationAdapter.NotificationViewHolder> {
    private final List<String> nameList;
    private final List<String> contentList;
    private final List<String> timeList;

    public NotificationAdapter(List<String> nameList, List<String> contentList, List<String> timeList){
        this.nameList = nameList;
        this.contentList = contentList;
        this.timeList = timeList;
    }

    @NonNull
    @Override
    public NotificationAdapter.NotificationViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.notification_layout, parent,false);
        return new NotificationViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NotificationViewHolder holder, int position) {
        holder.nameTextView.setText(nameList.get(position));
        holder.contentTextView.setText(contentList.get(position));
        holder.timeTextView.setText(timeList.get(position));

        Glide.with(holder.itemView.getContext())
                .load("https://i1-sohoa.vnecdn.net/2024/08/24/FCY9PcBrhN3pfoNV7FfFTQ-1200-80-4674-6454-1724475698.png?w=1020&h=0&q=100&dpr=1&fit=crop&s=2htNEpOOh7iZVUR88Y-eBA")
                .circleCrop()
                .into(holder.imageView);
    }

    @Override
    public int getItemCount() {
        return nameList.size();
    }

    public static class NotificationViewHolder extends RecyclerView.ViewHolder{
        TextView nameTextView;
        TextView contentTextView;
        TextView timeTextView;
        ImageView imageView;
        public NotificationViewHolder(@NonNull View itemView) {
            super(itemView);
            nameTextView = itemView.findViewById(R.id.noti_item_name);
            contentTextView = itemView.findViewById(R.id.noti_item_content);
            timeTextView = itemView.findViewById(R.id.noti_item_time);
            imageView = itemView.findViewById(R.id.noti_item_image);
        }
    }
}