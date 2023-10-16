using System;
using System.Collections.Generic;

namespace BussinessObject.Models;

public partial class Group
{
    public int GroupId { get; set; }

    public string GroupName { get; set; } = null!;

    public int GroupLeaderId { get; set; }

    public int? GroupDeputyId { get; set; }

    public string GroupAvatarUrl { get; set; } = null!;

    public string GroupInviteUrl { get; set; } = null!;

    public virtual User? GroupDeputy { get; set; }

    public virtual User GroupLeader { get; set; } = null!;
}
