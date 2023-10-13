using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models;

public partial class FriendRequest
{
    public int SenderId { get; set; }

    public int ReceiverId { get; set; }

    public string? Content { get; set; }

    public DateTime Date { get; set; }

    public string? Status { get; set; }

    public virtual User Receiver { get; set; } = null!;

    public virtual User Sender { get; set; } = null!;
}
