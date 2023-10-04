namespace SmallChatApplication.Models
{
    public class Users
    {
        //Normal properties
        public int UserID { get; set; }
        public string? Name { get; set; }
        public string? Room { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }

        //Navigation properties
        public List<Messages>? Messages { get; set; }
    }
}
    