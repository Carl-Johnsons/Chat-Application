using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmallChatApplication.Models
{
    [Table("Messages")]
    public class Messages
    {
        //Normal properties
        [Key]
        public int MessageID { get; set; }
        public Users? SenderUser { get; set; }
        public string? Content { get; set; }
        public DateTime Timestamp { get; set; }
        public MessageTypes MessageType { get; set; }

        //Navigation properties
    }
    public enum MessageTypes
    {
        Individual,
        Group
    }
}
