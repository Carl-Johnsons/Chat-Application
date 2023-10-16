using System;
using System.Collections.Generic;

namespace BussinessObject.Models;

public partial class Message
{
    public int MessageId { get; set; }

    public int SenderId { get; set; }

    public string? Content { get; set; }

    public DateTime Time { get; set; }

    public string MessageType { get; set; } = null!;

    public string MessageFormat { get; set; } = null!;

    public bool? Active { get; set; }

    public virtual User Sender { get; set; } = null!;
}
