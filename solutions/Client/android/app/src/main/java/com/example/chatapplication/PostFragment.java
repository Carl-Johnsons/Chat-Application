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

import com.example.chatapplication.Models.Post;
import com.example.chatapplication.Adapter.PostAdapter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class PostFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private RecyclerView recyclerView;
    private PostAdapter postAdapter;
    private List<Post> postList;
    private ImageButton buttonCreatePost;
    private Button buttonCancelPost;



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

        return view;
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
            Date currentTime = new Date();
            if (!newPostContent.isEmpty()) {
                postList.add(0, new Post("Current User", newPostContent, currentTime));
                postAdapter.notifyItemInserted(0);
                recyclerView.scrollToPosition(0);
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
}