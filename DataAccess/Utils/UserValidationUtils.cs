using BussinessObject.Constants;
using BussinessObject.Models;
using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;
using System.Diagnostics.CodeAnalysis;

namespace DataAccess.Utils
{
    public partial class ValidationUtils
    {
        // ========================= Check not null ===========================
        public void EnsureUserIdNotNull([NotNull] int? userId)
        {
            _ = userId ?? throw new ArgumentNullException(nameof(userId));
        }
        // ============================ Check not exist =======================

        // =========================== Check exist ==============================
        public User EnsureUserExisted(int? userId)
        {
            UserRepository _userRepo = new();
            User user = _userRepo.Get(userId) ?? throw new Exception("This user does not exist");
            return user;
        }
        // ============================== Check valid =================================

    }
}
