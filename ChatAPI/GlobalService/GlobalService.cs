
using AutoMapper.Configuration.Conventions;
using BussinessObject.Constants;
using BussinessObject.Models;
using ChatAPI.Controllers;
using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;

namespace ChatAPI.GlobalService
{
    public class ConversationService
    {
        private readonly static IConversationRepository _conversationRepository = new ConversationRepository();
        private readonly static IConversationUsersRepository _conversationUsersRepository = new ConversationUsersRepository();

        public static Task<Conversation> CreateConversation(Conversation conversationWithMembersId)
        {
            _conversationRepository.Add(conversationWithMembersId);
            var leaderId = conversationWithMembersId.Type == ConversationType.GROUP
                        ? (conversationWithMembersId as GroupConversationWithMembersId)?.LeaderId
                        : (conversationWithMembersId as ConversationWithMembersId)?.LeaderId;
            var membersId = conversationWithMembersId.Type == ConversationType.GROUP
                        ? (conversationWithMembersId as GroupConversationWithMembersId)?.MembersId
                        : (conversationWithMembersId as ConversationWithMembersId)?.MembersId;
            if (leaderId != null)
            {
                _conversationUsersRepository.Add(new ConversationUser()
                {
                    ConversationId = conversationWithMembersId.Id, //this prop will be filled after created by ef-core
                    UserId = (int)leaderId,
                    Role = "Leader",
                });
            }
            if (membersId != null)
            {
                foreach (var memberId in membersId)
                {
                    if (memberId == leaderId)
                    {
                        continue;
                    }
                    _conversationUsersRepository.Add(new ConversationUser()
                    {
                        ConversationId = conversationWithMembersId.Id, //this prop will be filled after created by ef-core
                        UserId = memberId,
                        Role = "Member",
                    });
                }
            }
            return Task.FromResult((Conversation)conversationWithMembersId);
        }
        public static Task<bool> IsExistIndividualConversation(int senderId, int receiverId)
        {
            var senderConversations = _conversationUsersRepository.GetByUserId(senderId);
            var receiverConversations = _conversationUsersRepository.GetByUserId(receiverId);

            foreach (var receiverConversation in receiverConversations)
            {
                var conversation = senderConversations.SingleOrDefault(c => c.ConversationId == receiverConversation.ConversationId, null);
                if (conversation != null)
                {
                    return Task.FromResult(false);
                }
            }
            return Task.FromResult(true);
        }
    }
}
