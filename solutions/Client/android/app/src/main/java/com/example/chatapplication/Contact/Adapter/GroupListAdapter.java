package com.example.chatapplication.Contact.Adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chatapplication.Contact.DTO.GroupDTO;
import com.example.chatapplication.R;

import java.util.List;

public class GroupListAdapter  extends RecyclerView.Adapter<GroupListAdapter.GroupViewHolder> {
    private List<GroupDTO> groupList;
    private GroupListAdapter.OnGroupClickListener onGroupClickListener;

    public GroupListAdapter(List<GroupDTO> groupList, OnGroupClickListener onGroupClickListener) {
        this.groupList = groupList;
        this.onGroupClickListener = onGroupClickListener;
    }

    @NonNull
    @Override
    public GroupListAdapter.GroupViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.group_item, parent, false);
        return new GroupListAdapter.GroupViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull GroupListAdapter.GroupViewHolder holder, int position) {
        GroupDTO group = groupList.get(position);
        holder.txtGroupName.setText(group.getName());

        holder.itemView.setOnClickListener(v -> onGroupClickListener.onGroupClick(group));
    }

    @Override
    public int getItemCount() {
        return groupList.size();
    }

    public static class GroupViewHolder extends RecyclerView.ViewHolder {
        ImageView imgGroupAvatar;
        TextView txtGroupName;

        public GroupViewHolder(@NonNull View itemView) {
            super(itemView);
            imgGroupAvatar = itemView.findViewById(R.id.imgGroupAvatar);
            txtGroupName = itemView.findViewById(R.id.txtGroupName);
        }
    }

    public interface OnGroupClickListener {
        void onGroupClick(GroupDTO group);
    }
}
