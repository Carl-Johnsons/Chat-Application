namespace BussinessObject.DTO
{
    public class PublicFriendRequestDTO
    {
        public int SenderId { get; set; }
        public int ReceiverId { get; set; }
        public string? Content { get; set; }
        public DateTime Date { get; set; }
        public string? Status { get; set; }
        //Navigation prop
        public virtual PublicUserDTO Receiver { get; set; } = null!;
        public virtual PublicUserDTO Sender { get; set; } = null!;
    }
}
