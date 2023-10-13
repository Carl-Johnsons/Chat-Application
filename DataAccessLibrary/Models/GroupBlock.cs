using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models;

public partial class GroupBlock
{
    public int GroupId { get; set; }

    public int BlockedUserId { get; set; }

    public virtual User BlockedUser { get; set; } = null!;

    public virtual User Group { get; set; } = null!;
}
