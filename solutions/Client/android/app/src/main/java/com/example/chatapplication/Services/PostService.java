package com.example.chatapplication.Services;

import com.example.chatapplication.Models.Comment;
import com.example.chatapplication.Models.Post;
import com.example.chatapplication.Post.CommentRequest;
import com.example.chatapplication.Post.CommentResponse;
import com.example.chatapplication.Post.PaginatedResponse;
import com.example.chatapplication.Post.ReportRequest;

import java.util.List;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Query;

public interface PostService {
    @GET("http://10.0.2.2:5005/api/post/all")
    Call<PaginatedResponse<String>> getPostIds();

    @GET("http://10.0.2.2:5005/api/post")
    Call<Post> getPostDetails(@Query("id") String postId);

    @Multipart
    @POST("http://10.0.2.2:5005/api/post")
    Call<Post> createPost(@Part("content") RequestBody content);

    @GET("http://10.0.2.2:5005/api/post/comment")
    Call<CommentResponse> getCommentsByPostId(@Query("postId") String postId);

    @POST("http://10.0.2.2:5005/api/post/comment")
    Call<Void> createComment(@Body CommentRequest commentRequest);

    @POST("http://10.0.2.2:5005/api/post/report")
    Call<Void> reportPost(@Body ReportRequest reportRequest);
}
