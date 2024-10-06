package com.example.chatapplication.post;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chatapplication.R;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

public class PostAdapter extends RecyclerView.Adapter<PostAdapter.PostViewHolder> {

    private Context context;
    private List<Post> postList;

    public PostAdapter(Context context, List<Post> postList) {
        this.context = context;
        this.postList = postList;
    }

    @NonNull
    @Override
    public PostAdapter.PostViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.post_item, parent, false);
        return new PostViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull PostAdapter.PostViewHolder holder, int position) {
        Post post = postList.get(position);
        holder.userName.setText(post.getUserName());
        holder.postContent.setText(post.getContent());

        SimpleDateFormat sdf = new SimpleDateFormat("hh:mm a, dd MMMM yyyy", Locale.getDefault());
        String formattedTime = sdf.format(post.getTimePosted());

        holder.postTime.setText(formattedTime);

    }

    @Override
    public int getItemCount() {
        return postList.size();
    }

    public static class PostViewHolder extends RecyclerView.ViewHolder {
        TextView userName, postContent, postTime;
        ImageButton likeButton, commentButton, shareButton;
        public PostViewHolder(@NonNull View itemView) {
            super(itemView);
            userName = itemView.findViewById(R.id.post_user_name);
            postContent = itemView.findViewById(R.id.post_content);
            postTime = itemView.findViewById(R.id.post_time);
            likeButton = itemView.findViewById(R.id.button_like);
            commentButton = itemView.findViewById(R.id.button_comment);
            shareButton = itemView.findViewById(R.id.button_share);
        }
    }
}

