using BussinessObject.Models;
using DataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class UserBlockRepository : IUserBlockRepository
    {
        public IEnumerable<UserBlock> GetBlockedUserList() => UserBlockDAO.Instance.GetBlockedUserList();
        public UserBlock GetBlockedUserByID(int blockUserId) => UserBlockDAO.Instance.GetBlockedUserByID(blockUserId);
        public int AddUserBlock(UserBlock userBlock) => UserBlockDAO.Instance.AddUserBlock(userBlock);
        public int UpdateUserBlock(UserBlock updateUserBlock) => UserBlockDAO.Instance.UpdateUserBlock(updateUserBlock);
        public int RemoveUserBlocked(int blockedUserID) => UserBlockDAO.Instance.RemoveUserBlocked(blockedUserID);
    }
}
