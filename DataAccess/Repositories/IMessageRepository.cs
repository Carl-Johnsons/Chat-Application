using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public interface IMessageRepository
    {
        IEnumerable<Message> GetMessageList();
        Message GetMessageByID(int messageId);
        int InsertMessage(Message message);
        int UpdateMessage(Message messageUpdate);
        int DeleteMessage(int messageId);
    }
}
