package com.example.chatapplication.Post.Adapter;

import android.app.AlertDialog;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.example.chatapplication.Models.Comment;
import com.example.chatapplication.Models.Post;
import com.example.chatapplication.R;

import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
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
        holder.userName.setText(post.getUserId());
        holder.postContent.setText(post.getContent());

        SimpleDateFormat sdf = new SimpleDateFormat("hh:mm a, dd MMMM yyyy", Locale.getDefault());
        //String formattedTime = sdf.format(post.getCreatedAt());

        holder.postTime.setText(post.getCreatedAt());

        LinearLayoutManager layoutManager = new LinearLayoutManager(holder.recyclerViewComments.getContext());
        holder.recyclerViewComments.setLayoutManager(layoutManager);

        CommentAdapter commentAdapter = new CommentAdapter(context, post.getComments());
        holder.recyclerViewComments.setAdapter(commentAdapter);

        holder.commentButton.setOnClickListener(v -> {
            showAddCommentDialog(holder.itemView.getContext(), post, commentAdapter);
        });

    }

    private void showAddCommentDialog(Context context, Post post, CommentAdapter commentAdapter) {
        LayoutInflater inflater = LayoutInflater.from(context);
        View dialogView = inflater.inflate(R.layout.dialog_create_comment, null);

        AlertDialog.Builder dialogBuilder = new AlertDialog.Builder(context);
        dialogBuilder.setView(dialogView);

        EditText editTextComment = dialogView.findViewById(R.id.edit_text_comment_content);
        Button buttonCancel = dialogView.findViewById(R.id.button_cancel_comment);
        Button buttonSubmit = dialogView.findViewById(R.id.button_submit_comment);

        AlertDialog dialog = dialogBuilder.create();

        buttonCancel.setOnClickListener(v -> dialog.dismiss());

        buttonSubmit.setOnClickListener(v -> {
            String commentContent = editTextComment.getText().toString().trim();
            Date currentTime = new Date();
            if (!commentContent.isEmpty()) {
                Comment newComment = new Comment("Current User", commentContent, currentTime);
                post.addComment(newComment);
                sortComments(post.getComments());

                commentAdapter.updateComments(post.getComments());

                dialog.dismiss();
            } else {
                Toast.makeText(context, "Please enter a comment", Toast.LENGTH_SHORT).show();
            }
        });

        dialog.show();
    }

    private void sortComments(List<Comment> commentList) {
        Collections.sort(commentList, (comment1, comment2) -> comment2.getTimePosted().compareTo(comment1.getTimePosted()));
    }

    @Override
    public int getItemCount() {
        return postList.size();
    }

    public static class PostViewHolder extends RecyclerView.ViewHolder {
        TextView userName, postContent, postTime;
        ImageButton likeButton, commentButton, shareButton;
        RecyclerView recyclerViewComments;
        public PostViewHolder(@NonNull View itemView) {
            super(itemView);
            userName = itemView.findViewById(R.id.post_user_name);
            postContent = itemView.findViewById(R.id.post_content);
            postTime = itemView.findViewById(R.id.post_time);
            likeButton = itemView.findViewById(R.id.button_like);
            commentButton = itemView.findViewById(R.id.button_comment);
            shareButton = itemView.findViewById(R.id.button_share);
            recyclerViewComments = itemView.findViewById(R.id.recycler_view_comments);
        }
    }
}

