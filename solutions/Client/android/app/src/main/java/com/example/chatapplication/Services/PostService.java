package com.example.chatapplication.Services;

import com.example.chatapplication.Models.Post;
import com.example.chatapplication.Post.PaginatedResponse;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface PostService {
    @GET("http://10.0.2.2:5005/api/post/all")
    Call<PaginatedResponse<String>> getPostIds();

    @GET("http://10.0.2.2:5005/api/post")
    Call<Post> getPostDetails(@Query("id") String postId);
}
