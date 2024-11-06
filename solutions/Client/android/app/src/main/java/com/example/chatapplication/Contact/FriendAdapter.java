package com.example.chatapplication.Contact;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.chatapplication.Chats.ChatActivity;
import com.example.chatapplication.Models.User;
import com.example.chatapplication.R;
import com.google.gson.Gson;

import java.util.List;

public class FriendAdapter extends RecyclerView.Adapter<FriendAdapter.MyViewHolder> {
    private List<User> friendList;

    public FriendAdapter(List<User> dataList) {
        this.friendList = dataList;
    }

    public void setFriendList(List<User> users){
        friendList = users;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.component_conversation, parent, false);
        return new MyViewHolder(view);
    }


    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        try {
            var data = friendList.get(position);
            holder.entityName.setText(data.name);
            holder.content.setText("");
            holder.time.setText("");
            Glide.with(holder.avatar.getContext()).load(data.avatarUrl).circleCrop().into(holder.avatar);

            holder.itemView.setOnClickListener(view -> {
                Gson gson = new Gson();
                String conversationJson = gson.toJson(data);
                Intent intent = new Intent(view.getContext(), ChatActivity.class);
                intent.putExtra("CONVERSATION_DATA", conversationJson);
                view.getContext().startActivity(intent);
            });
        }catch (Exception e){

        }

    }

    @Override
    public int getItemCount() {
        return friendList.size();
    }

    public static class MyViewHolder extends RecyclerView.ViewHolder {
        ImageView avatar;
        TextView entityName, content, time;

        public MyViewHolder(@NonNull View itemView) {
            super(itemView);
            avatar = itemView.findViewById(R.id.avatar);
            entityName = itemView.findViewById(R.id.entityName);
            content = itemView.findViewById(R.id.content);
            time = itemView.findViewById(R.id.time);
        }
    }
}
