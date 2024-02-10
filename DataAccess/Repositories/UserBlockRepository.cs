using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class UserBlockRepository : IUserBlockRepository
    {
        private readonly UserBlockDAO Instance = UserBlockDAO.Instance;
        public List<UserBlock> Get() => Instance.Get();
        public List<UserBlock> GetByBlockedUserId(int blockUserId) => Instance.GetByBlockedUserId(blockUserId);
        public UserBlock? GetByUserIdAndBlockedUserId(int? userId, int? blockedUserId) 
                => Instance.GetByUserIdAndBlockedUserId(userId, blockedUserId);
        public int Add(UserBlock userBlock) => Instance.Add(userBlock);
        public int Delete(int userId, int blockedUserID) => Instance.Delete(userId, blockedUserID);
    }
}
