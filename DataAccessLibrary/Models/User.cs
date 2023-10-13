using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models;

public partial class User
{
    public int UserId { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime Dob { get; set; }

    public string Gender { get; set; } = null!;

    public string AvatarUrl { get; set; } = null!;

    public string BackgroundUrl { get; set; } = null!;

    public string? Introduction { get; set; }

    public string? Email { get; set; }

    public bool? Active { get; set; }

    public virtual ICollection<Group> GroupGroupDeputies { get; set; } = new List<Group>();

    public virtual ICollection<Group> GroupGroupLeaders { get; set; } = new List<Group>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}
