package com.example.chatapplication.Chats.Adapters;

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
import com.example.chatapplication.Models.Conversation;
import com.example.chatapplication.R;
import com.google.gson.Gson;

import java.util.List;

public class ConversationAdapter extends RecyclerView.Adapter<ConversationAdapter.MyViewHolder> {
    private List<Conversation> dataList;

    public ConversationAdapter(List<Conversation> dataList) {
        this.dataList = dataList;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.component_conversation, parent, false);
        return new MyViewHolder(view);
    }


    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        Conversation data = dataList.get(position);
        holder.entityName.setText(data.getEntityName());
        holder.content.setText(data.getContent());
        holder.time.setText(data.getTime());
        Glide.with(holder.avatar.getContext()).load(data.getAvatarUrl()).circleCrop().into(holder.avatar);

        holder.itemView.setOnClickListener(view -> {
            Gson gson = new Gson();
            String conversationJson = gson.toJson(data);
            Intent intent = new Intent(view.getContext(), ChatActivity.class);
            intent.putExtra("CONVERSATION_DATA", conversationJson);
            view.getContext().startActivity(intent);
        });
    }

    @Override
    public int getItemCount() {
        return dataList.size();
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
