package com.example.chatapplication;

import android.os.Bundle;

import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.chatapplication.post.Post;
import com.example.chatapplication.post.PostAdapter;

import java.util.ArrayList;
import java.util.List;

public class PostFragment extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private RecyclerView recyclerView;
    private PostAdapter postAdapter;
    private List<Post> postList;
    private EditText editTextPost;
    private Button buttonPost;

    public PostFragment() {
    }

    public PostFragment(RecyclerView recyclerView, PostAdapter postAdapter, List<Post> postList, EditText editTextPost, Button buttonPost) {
        this.recyclerView = recyclerView;
        this.postAdapter = postAdapter;
        this.postList = postList;
        this.editTextPost = editTextPost;
        this.buttonPost = buttonPost;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_post, container, false);

        recyclerView = view.findViewById(R.id.recycler_view_posts);
        editTextPost = view.findViewById(R.id.edit_text_post);
        buttonPost = view.findViewById(R.id.button_post);

        recyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        postList = new ArrayList<>();
        postList.add(new Post("John Doe", "Hello, this is my first post!", "2 hours ago"));
        postList.add(new Post("Jane Smith", "Just trying out the new app. Looking good!", "1 hour ago"));

        postAdapter = new PostAdapter(getContext(), postList);
        recyclerView.setAdapter(postAdapter);

        buttonPost.setOnClickListener(v -> {
            String newPostContent = editTextPost.getText().toString().trim();
            if (!newPostContent.isEmpty()) {
                postList.add(0, new Post("Current User", newPostContent, "Just now"));

                postAdapter.notifyItemInserted(0);

                recyclerView.scrollToPosition(0);

                editTextPost.setText("");
            } else {
                Toast.makeText(getContext(), "Please enter some content before posting!", Toast.LENGTH_SHORT).show();
            }
        });

        return view;
    }
}