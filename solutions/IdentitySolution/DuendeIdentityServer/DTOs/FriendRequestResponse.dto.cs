namespace DuendeIdentityServer.DTOs;

public class FriendRequestResponseDTO
{
    public Guid Id { get; set; }

    public string SenderId { get; set; } = null!;

    public string Content { get; set; } = null!;

    public string Status { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
