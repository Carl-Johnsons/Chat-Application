namespace PostService.Domain.Errors;

public class ContentRestrictionsError
{
    public static Error TypeNotFound =>
        new Error("ContentRestrictions.TypeNotFound", "Type Not Found!");

    public static Error UserAlreadyInList =>
        new Error("ContentRestrictions.UserAlreadyInList", "User Already In List");
}
