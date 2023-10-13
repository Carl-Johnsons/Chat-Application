using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models;

public partial class Friend
{
    public int UserId { get; set; }

    public int FriendId { get; set; }

    public virtual User FriendNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
