package com.example.chatapplication;

import android.app.AlertDialog;
import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Toast;

import com.example.chatapplication.DTOs.UserDTO;
import com.example.chatapplication.Models.Post;
import com.example.chatapplication.Post.PaginatedResponse;
import com.example.chatapplication.Post.Adapter.PostAdapter;
import com.example.chatapplication.Services.PostService;
import com.example.chatapplication.Services.RetrofitClient;
import com.example.chatapplication.Services.UserService;

import java.util.ArrayList;
import java.util.List;

import okhttp3.MediaType;
import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PostFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private RecyclerView recyclerView;
    private PostAdapter postAdapter;
    private List<Post> postList;
    private ImageButton buttonCreatePost;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_post, container, false);

        recyclerView = view.findViewById(R.id.recycler_view_posts);
        buttonCreatePost = view.findViewById(R.id.button_create_post);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        postList = new ArrayList<>();

        postAdapter = new PostAdapter(getContext(), postList);
        recyclerView.setAdapter(postAdapter);

        buttonCreatePost.setOnClickListener(v -> showCreatePostPopup());

        fetchPostIds();

        return view;
    }

    private void fetchPostIds() {
        PostService apiService = RetrofitClient.getRetrofitInstance(getContext()).create(PostService.class);
        Call<PaginatedResponse<String>> call = apiService.getPostIds();

        call.enqueue(new Callback<PaginatedResponse<String>>() {
            @Override
            public void onResponse(Call<PaginatedResponse<String>> call, Response<PaginatedResponse<String>> response) {
                if (response.isSuccessful() && response.body() != null) {
                    PaginatedResponse<String> paginatedResponse = response.body();
                    List<String> postIds = paginatedResponse.getPaginatedData();

                    if (postIds != null && !postIds.isEmpty()) {
                        for (String postId : postIds) {
                            fetchPostDetails(postId);
                        }
                    } else {
                        Toast.makeText(getContext(), "No post IDs found", Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(getContext(), "Failed to load post IDs", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<PaginatedResponse<String>> call, Throwable t) {
                Toast.makeText(getContext(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void fetchPostDetails(String postId) {
        PostService apiService = RetrofitClient.getRetrofitInstance(getContext()).create(PostService.class);
        Call<Post> call = apiService.getPostDetails(postId);

        call.enqueue(new Callback<Post>() {
            @Override
            public void onResponse(Call<Post> call, Response<Post> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Post post = response.body();
                    if (post != null) {
                        fetchUserDetails(post.getUserId(), post);
                        //postAdapter.notifyItemInserted(postList.size() - 1);
                    } else {
                        Toast.makeText(getContext(), "Post is null", Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(getContext(), "Failed to load post details", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Post> call, Throwable t) {
                Toast.makeText(getContext(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void fetchUserDetails(String userId, Post post) {
        UserService apiService = RetrofitClient.getRetrofitInstance(getContext()).create(UserService.class);
        Call<UserDTO> call = apiService.getUserById(userId);

        call.enqueue(new Callback<UserDTO>() {
            @Override
            public void onResponse(Call<UserDTO> call, Response<UserDTO> response) {
                if (response.isSuccessful() && response.body() != null) {
                    UserDTO user = response.body();
                    if (user != null) {
                        post.setUserId(user.getName());
                        postList.add(post);
                        postAdapter.notifyItemInserted(postList.size() - 1);
                    } else {
                        Toast.makeText(getContext(), "User is null", Toast.LENGTH_SHORT).show();
                    }
                } else {
                    Toast.makeText(getContext(), "Failed to load user details", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<UserDTO> call, Throwable t) {
                Toast.makeText(getContext(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void showCreatePostPopup() {
        AlertDialog.Builder builder = new AlertDialog.Builder(getContext());
        LayoutInflater inflater = getLayoutInflater();
        View dialogView = inflater.inflate(R.layout.dialog_create_post, null);
        builder.setView(dialogView);

        EditText editTextPostContent = dialogView.findViewById(R.id.edit_text_post_content);
        Button buttonSubmitPost = dialogView.findViewById(R.id.button_submit_post);
        Button buttonCancelPost = dialogView.findViewById(R.id.button_cancel_post);

        AlertDialog dialog = builder.create();

        buttonSubmitPost.setOnClickListener(v -> {
            String newPostContent = editTextPostContent.getText().toString().trim();
            if (!newPostContent.isEmpty()) {
                createPost(newPostContent);
                dialog.dismiss();
            } else {
                Toast.makeText(getContext(), "Please enter some content!", Toast.LENGTH_SHORT).show();

            }
        });

        buttonCancelPost.setOnClickListener(v -> {
            dialog.dismiss();
        });

        dialog.show();
    }

    private void createPost(String content) {
        PostService apiService = RetrofitClient.getRetrofitInstance(getContext()).create(PostService.class);

        RequestBody contentPart = RequestBody.create(MediaType.parse("multipart/form-data"), content);
        Call<Post> call = apiService.createPost(contentPart);

        call.enqueue(new Callback<Post>() {
            @Override
            public void onResponse(Call<Post> call, Response<Post> response) {
                if (response.isSuccessful() && response.body() != null) {
                    Post createdPost = response.body();
                    postList.add(0, createdPost);
                    postAdapter.notifyItemInserted(0);
                    recyclerView.scrollToPosition(0);
                    Toast.makeText(getContext(), "Post created successfully!", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(getContext(), "Failed to create post", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onFailure(Call<Post> call, Throwable t) {
                Toast.makeText(getContext(), "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
            }
        });
    }

}