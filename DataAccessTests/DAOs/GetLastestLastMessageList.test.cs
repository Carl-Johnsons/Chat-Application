using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace DataAccess.DAOs.Tests
{
    [TestClass()]
    public class GetLastestLastMessageList
    {
        private readonly IMessageRepository _messageRepository;
        public GetLastestLastMessageList()
        {
            _messageRepository = new MessageRepository();
        }


        private bool IsDateTimeSortedDescending(List<DateTime> collection)
        {
            for (var i = 0; i < collection.Count - 1; i++)
            {
                if (Comparer<DateTime>.Default.Compare(collection[i], collection[i + 1]) < 0)
                {
                    return false;
                }
            }
            return true;
        }
    }
}