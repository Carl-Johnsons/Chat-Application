using BussinessObject.Models;
using System.Diagnostics.CodeAnalysis;

namespace DataAccess.Utils
{
    public partial class ValidationUtils
    {
        // ====================== Check not null ===================
        public void EnsureMessageIdNotNull([NotNull] int? messageId)
        {
            _ = messageId ?? throw new ArgumentNullException(nameof(messageId));
        }
        public void EnsureGroupMessageNotNull([NotNull] GroupMessage? groupMessage)
        {
            _ = groupMessage ?? throw new ArgumentNullException(nameof(groupMessage));
        }
        // ====================== Check not exist ==================
        // ====================== Check exist  =====================
        // ====================== Check valid ======================
    }
}
