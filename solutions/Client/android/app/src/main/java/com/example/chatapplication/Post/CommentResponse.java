package com.example.chatapplication.Post;

import com.example.chatapplication.Models.Comment;

import java.util.List;

public class CommentResponse {
    private List<Comment> paginatedData;

    public List<Comment> getPaginatedData() {
        return paginatedData;
    }

    public void setPaginatedData(List<Comment> paginatedData) {
        this.paginatedData = paginatedData;
    }
}
