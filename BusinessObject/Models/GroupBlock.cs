using System;
using System.Collections.Generic;

namespace BussinessObject.Models;

public partial class GroupBlock
{
    public int GroupId { get; set; }

    public int BlockedUserId { get; set; }

    public virtual User BlockedUser { get; set; } = null!;

    public virtual Group Group { get; set; } = null!;
}
