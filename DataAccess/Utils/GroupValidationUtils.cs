using BussinessObject.Constants;
using BussinessObject.Models;
using DataAccess.Repositories;
using System.Diagnostics.CodeAnalysis;

namespace DataAccess.Utils
{
    public partial class ValidationUtils
    {
        // ========================= Check not null ===========================
        public void EnsureGroupNotNull([NotNull] Group? group)
        {
            _ = group ?? throw new ArgumentNullException(nameof(group));
        }
        public void EnsureGroupIdNotNull([NotNull] int? groupId)
        {
            _ = groupId ?? throw new ArgumentNullException(nameof(groupId));
        }
        // ============================ Check not exist =======================
        public void EnsureGroupUserNotExist(int? groupId, int? userId)
        {
            var _groupUserRepository = new GroupUserRepository();
            if (_groupUserRepository.GetByGroupIdAndUserId(groupId, userId) != null)
            {
                throw new Exception("This user is already in the group!");
            }
        }
        // =========================== Check exist ==============================
        public Group EnsureGroupExisted(int? groupId)
        {
            var _groupRepository = new GroupRepository();
            Group group = _groupRepository.Get(groupId) ?? throw new Exception("This group does not exist");
            return group;
        }


        public GroupUser EnsureGroupUserExisted(int? groupId, int? userId)
        {
            var _groupUserRepository = new GroupUserRepository();
            return _groupUserRepository.GetByGroupIdAndUserId(groupId, userId)
                            ?? throw new Exception("This user is already not in the group!");
        }
        // ============================== Check valid =================================
        public void EnsureRoleValid(string? role)
        {
            if (role == null)
            {
                throw new Exception("This role \"" + role + "\" is not valid");
            }
            if (role.Equals(GroupUserRole.LEADER))
            {
                return;
            }
            if (role.Equals(GroupUserRole.DEPUTY))
            {
                return;
            }
            if (role.Equals(GroupUserRole.MEMBER))
            {
                return;
            }
            throw new Exception("This role \"" + role + "\" is not valid");
        }
    }
}
