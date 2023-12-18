using System;
using System.Collections.Generic;

namespace BussinessObject.Models;

public partial class IndividualMessage
{
    public int MessageId { get; set; }

    public int UserReceiverId { get; set; }

    public string? Status { get; set; }
    public bool Read { get; set; }

    public virtual Message Message { get; set; } = null!;

    public virtual User UserReceiver { get; set; } = null!;
}
