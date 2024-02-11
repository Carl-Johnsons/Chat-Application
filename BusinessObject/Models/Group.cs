﻿
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;

[Table("Group")]
[PrimaryKey(nameof(GroupId))]
public partial class Group
{
    [Column("Group_ID")]
    public int GroupId { get; set; }
    [Column("Group_Name")]
    [MaxLength(50)]
    public string GroupName { get; set; } = null!;

    [Column("Group_Avatar_URL")]
    public string GroupAvatarUrl { get; set; } = null!;
    [Column("Group_Invite_URL")]
    public string GroupInviteUrl { get; set; } = null!;
}
