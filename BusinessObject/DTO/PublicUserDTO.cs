
namespace BussinessObject.DTO
{
    public class PublicUserDTO
    {
        public int UserId { get; set; }
        public string PhoneNumber { get; set; } = null!;
        public string Name { get; set; } = null!;
        public DateTime Dob { get; set; }
        public string Gender { get; set; } = null!;
        public string AvatarUrl { get; set; } = null!;
        public string BackgroundUrl { get; set; } = null!;
        public string? Introduction { get; set; }
        public bool? Active { get; set; }
    }
}
