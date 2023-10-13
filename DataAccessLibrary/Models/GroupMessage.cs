using System;
using System.Collections.Generic;

namespace DataAccessLibrary.Models;

public partial class GroupMessage
{
    public int MessageId { get; set; }

    public int GroupReceiverId { get; set; }

    public virtual User GroupReceiver { get; set; } = null!;

    public virtual Message Message { get; set; } = null!;
}
