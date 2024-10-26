package com.example.chatapplication.Services;

import com.example.chatapplication.Models.Comment;
import com.example.chatapplication.Models.Interact;
import com.example.chatapplication.Models.Post;
import com.example.chatapplication.Post.CommentRequest;
import com.example.chatapplication.Post.CommentResponse;
import com.example.chatapplication.Post.InteractRequest;
import com.example.chatapplication.Post.InteractResponse;
import com.example.chatapplication.Post.PaginatedResponse;
import com.example.chatapplication.Post.ReportRequest;
import com.example.chatapplication.Post.UndoInteractRequest;

import java.util.List;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.HTTP;
import retrofit2.http.Multipart;
import retrofit2.http.POST;
import retrofit2.http.Part;
import retrofit2.http.Query;

public interface PostService {
    @GET("http://10.0.2.2:5005/api/post/all")
    Call<PaginatedResponse<String>> getPostIds(@Query("skip") int skip);

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

    @POST("http://10.0.2.2:5005/api/post/interact")
    Call<Void> interactPost(@Body InteractRequest interactRequest);

    @HTTP(method = "DELETE", path = "http://10.0.2.2:5005/api/post/interact", hasBody = true)
    Call<Void> unInteractPost(@Body UndoInteractRequest undoInteractRequest);

    @GET("http://10.0.2.2:5005/api/post/interact/user")
    Call<List<Interact>> getInteractPostByUserId(@Query("id") String postId);
}
