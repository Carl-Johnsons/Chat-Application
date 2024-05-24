namespace ChatHub.DTOs;

public class FriendRequestDTO
{
    public FriendRequestDTO()
    {

    }
    public Guid Id { get; set; }

    public Guid SenderId { get; set; }

    public Guid ReceiverId { get; set; }

    public string Content { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
