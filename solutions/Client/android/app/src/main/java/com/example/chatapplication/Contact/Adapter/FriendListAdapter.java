package com.example.chatapplication.Contact.Adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chatapplication.Contact.DTO.FriendDTO;
import com.example.chatapplication.R;

import java.util.List;

public class FriendListAdapter extends RecyclerView.Adapter<FriendListAdapter.FriendViewHolder> {
    private List<FriendDTO> friendList;
    private OnFriendClickListener onFriendClickListener;

    public FriendListAdapter(List<FriendDTO> friendList, OnFriendClickListener listener) {
        this.friendList = friendList;
        this.onFriendClickListener = listener;
    }

    @NonNull
    @Override
    public FriendViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.friend_item, parent, false);
        return new FriendViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull FriendViewHolder holder, int position) {
        FriendDTO friend = friendList.get(position);
        holder.txtFriendName.setText(friend.getName());

        holder.itemView.setOnClickListener(v -> onFriendClickListener.onFriendClick(friend));
    }

    @Override
    public int getItemCount() {
        return friendList.size();
    }

    public static class FriendViewHolder extends RecyclerView.ViewHolder {
        ImageView imgAvatar;
        TextView txtFriendName;

        public FriendViewHolder(@NonNull View itemView) {
            super(itemView);
            imgAvatar = itemView.findViewById(R.id.imgAvatar);
            txtFriendName = itemView.findViewById(R.id.txtFriendName);
        }
    }

    public interface OnFriendClickListener {
        void onFriendClick(FriendDTO friend);
    }
}
