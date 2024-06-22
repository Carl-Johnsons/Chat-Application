﻿namespace PostService.Domain.Errors;

public class PostError
{
    public static Error NotFound =>
        new("PostError.NotFound", "Post not found!");
    public static Error UserNotFound =>
        new("PostError.UserNotFound", "User not found!");
    public static Error AlreadyInteractedPost =>
        new("PostError.AlreadyInteractedPost", "You have interacted with this post");
    public static Error NotInteractedPost =>
        new("PostError.NotInteractedPost", "You have not interacted with this post");
}
