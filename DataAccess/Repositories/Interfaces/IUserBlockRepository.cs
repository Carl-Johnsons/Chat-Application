using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.Interfaces
{
    public interface IUserBlockRepository
    {
        public List<UserBlock> Get();
        public List<UserBlock> GetByBlockedUserId(int blockUserId);
        public UserBlock? GetByUserIdAndBlockedUserId(int? userId, int? blockedUserId);
        public int Add(UserBlock userBlock);
        public int Delete(int userId, int blockedUserID);
    }
}
