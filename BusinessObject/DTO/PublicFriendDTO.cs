namespace BussinessObject.DTO
{
    public class PublicFriendDTO
    {
        public int UserId { get; set; }
        public int FriendId { get; set; }
        //Navigation props
        public virtual PublicUserDTO FriendNavigation { get; set; } = null!;
    }
}
