

namespace BussinessObject.DTO
{
    public class GroupPublicUserDTO
    {
        public int GroupId { get; set; }
        public int UserId { get; set; }
        public string? Role { get; set; }
        public virtual PublicUserDTO User { get; set; } = null!;
    }
}
