namespace PostService.Infrastructure.Persistence.Mockup.Data;

public class PostInteraction
{
    public string PostId { get; set; } = null!;
    public string InteractionId { get; set; } = null!;
    public string UserId { get; set; } = null!;
}
internal class PostInteractData
{
    public static IEnumerable<PostInteraction> Data => [
            new PostInteraction {
                PostId = "3b6a251f-de75-4637-8d73-d1b0d6390312",
                InteractionId = "84bf3baa-50b4-4ea9-870d-0100998c21ce",
                UserId = "078ecc42-7643-4cff-b851-eeac5ba1bb29"
            },
            new PostInteraction {
                PostId = "2a7c5790-26ef-4e5a-96ba-75fca384c7cc",
                InteractionId = "e2c3876b-3f40-456e-8f5f-a5cd248b19f8",
                UserId = "078ecc42-7643-4cff-b851-eeac5ba1bb29"
            }
        ];
}
