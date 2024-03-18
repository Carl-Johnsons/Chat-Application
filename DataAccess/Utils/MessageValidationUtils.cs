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
        // ====================== Check not exist ==================
        // ====================== Check exist  =====================
        // ====================== Check valid ======================
    }
}
