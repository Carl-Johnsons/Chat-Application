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
import com.example.chatapplication.Post.CommentRequest;
import com.example.chatapplication.Post.CommentResponse;
import com.example.chatapplication.Post.ReportRequest;
import com.example.chatapplication.R;
import com.example.chatapplication.Services.PostService;
import com.example.chatapplication.Services.RetrofitClient;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

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
        holder.postTime.setText(post.getCreatedAt());

        LinearLayoutManager layoutManager = new LinearLayoutManager(context);
        holder.recyclerViewComments.setLayoutManager(layoutManager);

        CommentAdapter commentAdapter = new CommentAdapter(context, post.getComments());
        holder.recyclerViewComments.setAdapter(commentAdapter);

        fetchComments(post.getId(), commentAdapter);

        holder.commentButton.setOnClickListener(v -> {
            showAddCommentDialog(context, post, commentAdapter);
        });

        holder.reportButton.setOnClickListener(v -> {
            showReportDialog(context, post.getId());
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
            if (!commentContent.isEmpty()) {
                CommentRequest commentRequest = new CommentRequest(post.getId(), commentContent);

                createComment(commentRequest, post, commentAdapter);
                dialog.dismiss();
            } else {
                Toast.makeText(context, "Please enter a comment", Toast.LENGTH_SHORT).show();
            }
        });

        dialog.show();
    }

    private void createComment(CommentRequest commentRequest, Post post, CommentAdapter commentAdapter) {
        PostService apiService = RetrofitClient.getRetrofitInstance(context).create(PostService.class);
        Call<Void> call = apiService.createComment(commentRequest);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {

                    Toast.makeText(context, "Comment added successfully!", Toast.LENGTH_SHORT).show();

                    fetchComments(post.getId(), commentAdapter);
                } else {
                    Toast.makeText(context, "Failed to add comment", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(context, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void fetchComments(String postId, CommentAdapter commentAdapter) {
        PostService apiService = RetrofitClient.getRetrofitInstance(context).create(PostService.class);
        Call<CommentResponse> call = apiService.getCommentsByPostId(postId);

        call.enqueue(new Callback<CommentResponse>() {
            @Override
            public void onResponse(Call<CommentResponse> call, Response<CommentResponse> response) {
                if (response.isSuccessful() && response.body() != null) {
                    List<Comment> commentList = response.body().getPaginatedData();
                    commentAdapter.updateComments(commentList);
                } else {
                    Toast.makeText(context, "Failed to load comments", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<CommentResponse> call, Throwable t) {
                Toast.makeText(context, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    @Override
    public int getItemCount() {
        return postList.size();
    }

    public static class PostViewHolder extends RecyclerView.ViewHolder {
        TextView userName, postContent, postTime;
        ImageButton likeButton, commentButton, reportButton;
        RecyclerView recyclerViewComments;
        public PostViewHolder(@NonNull View itemView) {
            super(itemView);
            userName = itemView.findViewById(R.id.post_user_name);
            postContent = itemView.findViewById(R.id.post_content);
            postTime = itemView.findViewById(R.id.post_time);
            likeButton = itemView.findViewById(R.id.button_like);
            commentButton = itemView.findViewById(R.id.button_comment);
            reportButton = itemView.findViewById(R.id.button_report);
            recyclerViewComments = itemView.findViewById(R.id.recycler_view_comments);
        }
    }

    private void showReportDialog(Context context, String postId) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle("Report Post");

        View dialogView = LayoutInflater.from(context).inflate(R.layout.dialog_report_post, null);
        builder.setView(dialogView);

        EditText editTextReason = dialogView.findViewById(R.id.edit_text_report_reason);
        Button buttonCancel = dialogView.findViewById(R.id.button_cancel_report);
        Button buttonSubmit = dialogView.findViewById(R.id.button_submit_report);

        AlertDialog dialog = builder.create();

        buttonCancel.setOnClickListener(v -> dialog.dismiss());

        buttonSubmit.setOnClickListener(v -> {
            String reason = editTextReason.getText().toString().trim();
            if (!reason.isEmpty()) {
                sendReport(postId, reason);
                dialog.dismiss();
            } else {
                Toast.makeText(context, "Please enter a reason for reporting", Toast.LENGTH_SHORT).show();
            }
        });

        dialog.show();
    }

    private void sendReport(String postId, String reason) {
        ReportRequest reportRequest = new ReportRequest(postId, reason);

        PostService apiService = RetrofitClient.getRetrofitInstance(context).create(PostService.class);
        Call<Void> call = apiService.reportPost(reportRequest);

        call.enqueue(new Callback<Void>() {
            @Override
            public void onResponse(Call<Void> call, Response<Void> response) {
                if (response.isSuccessful()) {
                    Toast.makeText(context, "Report submitted successfully!", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(context, "Failed to submit report", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Void> call, Throwable t) {
                Toast.makeText(context, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }
}

