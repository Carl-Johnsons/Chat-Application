using System;
using System.Collections.Generic;

namespace BussinessObject.Models;

public partial class UserBlock
{
    public int UserId { get; set; }

    public int BlockedUserId { get; set; }

    public virtual User BlockedUser { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
