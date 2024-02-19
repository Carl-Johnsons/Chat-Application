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

        [TestMethod]
        public void GetLastestLastMessageList_InvalidUserId()
        {
            int userId = -1;
            var lastMessageList = _messageRepository.GetLastestLastMessageList(userId);
            Assert.IsTrue(lastMessageList.Count == 0, "Message list should empty");
        }

        [TestMethod]
        public void GetLastestLastMessageList_ValidUserId_SortedDescending()
        {
            int userId = 4;
            var lastMessageList = _messageRepository.GetLastestLastMessageList(userId);
            foreach (var message in lastMessageList)
            {
                Console.WriteLine($"{message.Message.SenderId}: {message.Message.Content}: {message.Message.Time}");
            }
            Assert.IsNotNull(lastMessageList, "Message list should not be null");
            var dateTimeList = lastMessageList.Select(ml => ml.Message.Time).ToList();
            // Check if the list is sorted by message time in descending order
            bool isSortedDescending = IsDateTimeSortedDescending(dateTimeList);
            Assert.IsTrue(isSortedDescending, "Message list should be sorted by message time in descending order");
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