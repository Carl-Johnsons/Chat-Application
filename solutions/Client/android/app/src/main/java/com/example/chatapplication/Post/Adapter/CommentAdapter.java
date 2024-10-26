package com.example.chatapplication.Post.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.chatapplication.DTOs.UserDTO;
import com.example.chatapplication.Models.Comment;
import com.example.chatapplication.R;
import com.example.chatapplication.Services.RetrofitClient;
import com.example.chatapplication.Services.UserService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommentAdapter extends RecyclerView.Adapter<CommentAdapter.CommentViewHolder> {

    private Context context;
    private List<Comment> commentList;
    private Map<String, String> userCache = new HashMap<>();

    public CommentAdapter(Context context, List<Comment> commentList) {
        this.context = context;
        this.commentList = commentList;
    }

    @NonNull
    @Override
    public CommentViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.comment_item, parent, false);
        return new CommentViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull CommentViewHolder holder, int position) {
        Comment comment = commentList.get(position);
        holder.commentContent.setText(comment.getContent());


            UserService userService = RetrofitClient.getRetrofitInstance(context).create(UserService.class);
            Call<UserDTO> call = userService.getUserById(comment.getUserId());
            call.enqueue(new Callback<UserDTO>() {
                @Override
                public void onResponse(Call<UserDTO> call, Response<UserDTO> response) {
                    if (response.isSuccessful() && response.body() != null) {
                        String userName = response.body().getName();
                        String avtUrl = response.body().getAvatarUrl();
                        userCache.put(comment.getUserId(), userName);
                        holder.userName.setText(userName);

                        Glide.with(context)
                                .load(avtUrl)
                                .circleCrop()
                                .into(holder.userAvatar);

                    } else {
                        holder.userName.setText("Unknown User");
                    }
                }

                @Override
                public void onFailure(Call<UserDTO> call, Throwable t) {
                    holder.userName.setText("Error");
                }
            });




        holder.commentTime.setText(comment.getTimePosted());
    }

    @Override
    public int getItemCount() {
        if (commentList != null) {
            return commentList.size();
        } else {
            return 0;
        }
    }

    public void updateComments(List<Comment> newCommentList) {
        this.commentList = newCommentList;
        notifyDataSetChanged();
    }

    public static class CommentViewHolder extends RecyclerView.ViewHolder {
            TextView userName, commentContent, commentTime;
            ImageView userAvatar;
            public CommentViewHolder(@NonNull View itemView) {
            super(itemView);
            userName = itemView.findViewById(R.id.comment_user_name);
            commentContent = itemView.findViewById(R.id.comment_content);
            commentTime = itemView.findViewById(R.id.comment_time);
            userAvatar = itemView.findViewById(R.id.profile_image);
        }
    }
}
