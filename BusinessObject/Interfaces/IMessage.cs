using BussinessObject.Models;

namespace BussinessObject.Interfaces
{
    public interface IMessage
    {
        int MessageId { get; set; }
        Message Message { get; set; }
    }
}
