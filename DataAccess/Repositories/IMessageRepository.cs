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
        IEnumerable<IndividualMessage> GetIndividualMessageList();
        IEnumerable<IndividualMessage> GetIndividualMessageList(int senderId,int receiverId);

        Message GetMessage(int messageId);
        int AddIndividualMessage(IndividualMessage individualMessage);
        int AddMessage(Message message);
        int UpdateMessage(Message messageUpdate);
        int DeleteMessage(int messageId);
    }
}
