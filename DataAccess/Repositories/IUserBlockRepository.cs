using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public interface IUserBlockRepository
    {
        IEnumerable<UserBlock> GetBlockedUserList();
        UserBlock GetBlockedUserByID(int blockedUserId);
        int AddUserBlock(UserBlock userBlock);
        int UpdateUserBlock(UserBlock updateUserBlock);
        int RemoveUserBlocked(int blockedUserID);
    }
}
