namespace PostService.Infrastructure.Persistence.Mockup.Data;

public class Comments
{
    public string Id { get; set; } = null!;
    public string Content { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public string PostId { get; set; } = null!;
}
internal class CommentData
{
    public static IEnumerable<Comments> Data => [
            new Comments{
                Id = "b179a3ce-dabc-4ae8-a198-58bfc8420ed8",
                Content = "Hài quá haha",
                UserId = "078ecc42-7643-4cff-b851-eeac5ba1bb29",
                PostId = "3b6a251f-de75-4637-8d73-d1b0d6390312",
            },
            new Comments{
                Id = "37da06b0-78c4-4e81-bc4d-f262fd56db60",
                Content = "Không sợ không sợ",
                UserId = "078ecc42-7643-4cff-b851-eeac5ba1bb29",
                PostId = "2a7c5790-26ef-4e5a-96ba-75fca384c7cc",
            },
        ];
}
