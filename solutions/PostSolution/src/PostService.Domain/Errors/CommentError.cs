namespace PostService.Domain.Errors;

public class CommentError
{
    public static Error NotFound =>
        new Error("Comment.NotFound", "Comment Not Found!");
}
