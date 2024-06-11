namespace PostService.Domain.Errors;

public class PostError
{
    public static Error NotFound =>
        new("PostError.NotFound", "Post not found!");
    public static Error UserNotFound =>
        new("PostError.UserNotFound", "User not found!");
}
